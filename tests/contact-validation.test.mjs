import test from "node:test";
import assert from "node:assert/strict";
import {
  escapeHtml,
  validateContactPayload,
} from "../lib/contact-validation.mjs";

const validPayload = {
  nom: "Mickael",
  email: "Mickael@Example.com",
  telephone: "+33 6 00 00 00 00",
  motif: "Création de site",
  description: "Bonjour, voici mon projet.",
  website: "",
};

test("normalise et accepte un message valide", () => {
  const result = validateContactPayload({
    ...validPayload,
    nom: "  Mickael  ",
    email: "  Mickael@Example.com  ",
  });

  assert.equal(result.ok, true);
  assert.equal(result.isBot, false);
  assert.equal(result.fields.nom, "Mickael");
  assert.equal(result.fields.email, "mickael@example.com");
});

test("rejette les champs obligatoires absents", () => {
  const result = validateContactPayload({ ...validPayload, description: "" });
  assert.equal(result.ok, false);
  assert.match(result.error, /obligatoires/);
});

test("rejette une adresse email invalide", () => {
  const result = validateContactPayload({ ...validPayload, email: "invalide" });
  assert.equal(result.ok, false);
  assert.match(result.error, /email invalide/);
});

test("rejette les champs trop longs", () => {
  const result = validateContactPayload({ ...validPayload, nom: "a".repeat(101) });
  assert.equal(result.ok, false);
  assert.match(result.error, /longueur autorisée/);
});

test("identifie silencieusement un bot via le honeypot", () => {
  const result = validateContactPayload({ website: "https://spam.example" });
  assert.deepEqual(result, { ok: true, isBot: true });
});

test("échappe les caractères HTML injectables", () => {
  assert.equal(
    escapeHtml(`<script>alert("x")</script> & 'test'`),
    "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; &#39;test&#39;"
  );
});
