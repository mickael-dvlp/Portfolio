import test from "node:test";
import assert from "node:assert/strict";
import { POST } from "../app/api/contact/route.js";

function request(body, headers = {}) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers,
    body,
  });
}

test("refuse les contenus autres que JSON", async () => {
  const response = await POST(request("nom=Mickael", { "Content-Type": "text/plain" }));
  assert.equal(response.status, 415);
  assert.equal(response.headers.get("cache-control"), "no-store");
});

test("refuse un JSON mal formé", async () => {
  const response = await POST(request("{", { "Content-Type": "application/json" }));
  assert.equal(response.status, 400);
});

test("refuse un corps dépassant 10 Ko", async () => {
  const response = await POST(
    request("x".repeat(10_001), { "Content-Type": "application/json" })
  );
  assert.equal(response.status, 413);
});

test("répond avec succès au honeypot sans envoyer d’email", async () => {
  const response = await POST(
    request(JSON.stringify({ website: "https://spam.example" }), {
      "Content-Type": "application/json",
    })
  );
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true });
});
