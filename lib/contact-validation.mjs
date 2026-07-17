export const MAX_BODY_BYTES = 10_000;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FIELD_LIMITS = {
  nom: 100,
  email: 254,
  telephone: 30,
  motif: 150,
  description: 3_000,
};

function readField(body, field) {
  return typeof body[field] === "string" ? body[field].trim() : "";
}

export function validateContactPayload(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, error: "Corps de requête invalide." };
  }

  if (readField(body, "website")) {
    return { ok: true, isBot: true };
  }

  const fields = {
    nom: readField(body, "nom"),
    email: readField(body, "email").toLowerCase(),
    telephone: readField(body, "telephone"),
    motif: readField(body, "motif"),
    description: readField(body, "description"),
  };

  if (!fields.nom || !fields.email || !fields.motif || !fields.description) {
    return {
      ok: false,
      error: "Les champs nom, email, motif et description sont obligatoires.",
    };
  }

  const hasValidLengths = Object.entries(FIELD_LIMITS).every(
    ([field, max]) => fields[field].length <= max
  );
  if (!hasValidLengths) {
    return {
      ok: false,
      error: "Un ou plusieurs champs dépassent la longueur autorisée.",
    };
  }

  if (!EMAIL_REGEX.test(fields.email)) {
    return { ok: false, error: "Adresse email invalide." };
  }

  return { ok: true, isBot: false, fields };
}

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
