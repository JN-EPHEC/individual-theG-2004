import { validateUserRegistration } from "../utils/userValidator.js";

describe("validateUserRegistration - Catalog Based + Pairwise + 100% Coverage", () => {

  // ── RÔLE invalide ──────────────────────────────────────────────────────
  it("rôle inconnu → throw 'Rôle invalide'", () => {
    expect(() => validateUserRegistration(25, "superadmin", "a@b.com")).toThrow("Rôle invalide");
  });
  it("rôle vide → throw 'Rôle invalide'", () => {
    expect(() => validateUserRegistration(25, "", "a@b.com")).toThrow("Rôle invalide");
  });

  // ── ÂGE invalide ───────────────────────────────────────────────────────
  it("age NaN → throw 'Âge invalide'", () => {
    expect(() => validateUserRegistration(NaN, "user", "a@b.com")).toThrow("Âge invalide");
  });
  it("age > 120 → throw 'Âge invalide'", () => {
    expect(() => validateUserRegistration(121, "user", "a@b.com")).toThrow("Âge invalide");
  });

  // ── ÂGE < 18 ───────────────────────────────────────────────────────────
  it("mineur + rôle user → false", () => {
    expect(validateUserRegistration(16, "user", "a@b.com")).toBe(false);
  });
  it("mineur + rôle stagiaire → true", () => {
    expect(validateUserRegistration(16, "stagiaire", "a@b.com")).toBe(true);
  });

  // ── EMAIL invalide ─────────────────────────────────────────────────────
  it("email sans @ → false", () => {
    expect(validateUserRegistration(25, "user", "emailsansarobase.com")).toBe(false);
  });
  it("email sans point → false", () => {
    expect(validateUserRegistration(25, "user", "email@sanspoint")).toBe(false);
  });
  it("email vide → false", () => {
    expect(validateUserRegistration(25, "user", "")).toBe(false);
  });

  // ── CAS VALIDES (Pairwise) ─────────────────────────────────────────────
  test.each([
    [18,  "user",      "user@example.com",  true, "borne inf adulte + user"],
    [25,  "admin",     "admin@test.com",     true, "adulte + admin"],
    [120, "stagiaire", "stage@company.be",   true, "borne max age + stagiaire"],
  ])("age=%s, role=%s, email=%s → %s (%s)", (age, role, email, expected) => {
    expect(validateUserRegistration(age as number, role as string, email as string)).toBe(expected);
  });
});