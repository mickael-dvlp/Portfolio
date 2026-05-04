import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const { nom, telephone, motif, description } = await request.json();

  await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: "mickael.dvlp@gmail.com",
    subject: `Nouveau message de ${nom} — ${motif}`,
    html: `
      <h2>Nouveau message depuis le portfolio</h2>
      <p><strong>Nom / Entreprise :</strong> ${nom}</p>
      <p><strong>Téléphone :</strong> ${telephone || "Non renseigné"}</p>
      <p><strong>Motif :</strong> ${motif}</p>
      <p><strong>Description :</strong></p>
      <p>${description}</p>
    `,
  });

  return Response.json({ success: true });
}
