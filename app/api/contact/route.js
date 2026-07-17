import { Resend } from "resend";
import {
  MAX_BODY_BYTES,
  escapeHtml,
  validateContactPayload,
} from "../../../lib/contact-validation.mjs";

/* ============================================================
   Anti-spam — limitation en mémoire (par instance serverless)
   - Par IP    : évite qu'un même visiteur/bot martèle le formulaire
   - Globale   : plafond quotidien d'envois pour borner le coût Resend
   ============================================================ */
const IP_WINDOW_MS = 60 * 60 * 1000; // 1 heure
const IP_MAX_REQUESTS = 3; // 3 envois max par IP par heure
const DAILY_MAX_EMAILS = 50; // plafond global d'envois par jour

const ipHits = new Map(); // ip -> timestamps des requêtes récentes
let lastIpCleanupAt = 0;
let dailyCount = 0;
let dailyResetAt = getNextMidnight();

function getNextMidnight() {
  const next = new Date();
  next.setHours(24, 0, 0, 0);
  return next.getTime();
}

/** @returns {boolean} true si l'IP est encore sous la limite */
function consumeIpLimit(ip) {
  const now = Date.now();

  if (now - lastIpCleanupAt >= IP_WINDOW_MS) {
    for (const [storedIp, timestamps] of ipHits) {
      const recentTimestamps = timestamps.filter((t) => now - t < IP_WINDOW_MS);
      if (recentTimestamps.length) ipHits.set(storedIp, recentTimestamps);
      else ipHits.delete(storedIp);
    }
    lastIpCleanupAt = now;
  }

  const recent = (ipHits.get(ip) || []).filter((t) => now - t < IP_WINDOW_MS);

  if (recent.length >= IP_MAX_REQUESTS) {
    ipHits.set(ip, recent);
    return false;
  }

  recent.push(now);
  ipHits.set(ip, recent);
  return true;
}

/** @returns {boolean} true si le plafond quotidien global n'est pas atteint */
function consumeDailyLimit() {
  if (Date.now() >= dailyResetAt) {
    dailyCount = 0;
    dailyResetAt = getNextMidnight();
  }

  if (dailyCount >= DAILY_MAX_EMAILS) return false;

  dailyCount++;
  return true;
}

function releaseDailyLimit() {
  dailyCount = Math.max(0, dailyCount - 1);
}

function json(data, init = {}) {
  const headers = new Headers(init.headers);
  headers.set("Cache-Control", "no-store");
  return Response.json(data, { ...init, headers });
}

export async function POST(request) {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return json({ error: "Type de contenu non pris en charge." }, { status: 415 });
  }

  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return json({ error: "Requête trop volumineuse." }, { status: 413 });
  }

  let body;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).length > MAX_BODY_BYTES) {
      return json({ error: "Requête trop volumineuse." }, { status: 413 });
    }
    body = JSON.parse(rawBody);
  } catch {
    return json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const validation = validateContactPayload(body);
  if (!validation.ok) {
    return json({ error: validation.error }, { status: 400 });
  }

  // Un visiteur normal ne remplit jamais ce champ masqué.
  if (validation.isBot) {
    return json({ success: true });
  }

  const { nom, email, telephone, motif, description } = validation.fields;

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";

  if (!consumeIpLimit(ip)) {
    return json(
      { error: "Trop de tentatives. Veuillez réessayer dans un moment." },
      { status: 429, headers: { "Retry-After": "3600" } }
    );
  }

  if (!consumeDailyLimit()) {
    return json(
      { error: "Limite quotidienne d'envoi atteinte. Veuillez réessayer demain." },
      { status: 429 }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    releaseDailyLimit();
    console.error("Contact API error: RESEND_API_KEY is missing");
    return json({ error: "Service de contact indisponible." }, { status: 503 });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "mickael.dvlp@gmail.com",
      replyTo: email,
      subject: `Nouveau message de ${nom} — ${motif}`,
      html: `
        <h2>Nouveau message depuis le portfolio</h2>
        <p><strong>Nom / Entreprise :</strong> ${escapeHtml(nom)}</p>
        <p><strong>Email :</strong> ${escapeHtml(email)}</p>
        <p><strong>Téléphone :</strong> ${escapeHtml(telephone || "Non renseigné")}</p>
        <p><strong>Motif :</strong> ${escapeHtml(motif)}</p>
        <p><strong>Description :</strong></p>
        <p>${escapeHtml(description)}</p>
      `,
    });

    if (error) {
      releaseDailyLimit();
      console.error("Resend error:", error);
      return json(
        { error: "Échec de l'envoi de l'email. Veuillez réessayer plus tard." },
        { status: 502 }
      );
    }

    return json({ success: true });
  } catch (err) {
    releaseDailyLimit();
    console.error("Contact API error:", err);
    return json(
      { error: "Une erreur inattendue est survenue. Veuillez réessayer plus tard." },
      { status: 500 }
    );
  }
}
