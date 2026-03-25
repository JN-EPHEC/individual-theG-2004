import { validatePassword } from "../utils/password.js";

describe("Password Validator - White Box (100% Branch Coverage)", () => {

  // Branch 1 : pwd vide
  it("pwd vide → false", () => {
    expect(validatePassword("", 25)).toBe(false);
  });

  // Branch 2 : longueur < 8
  it("pwd trop court (< 8 chars) → false", () => {
    expect(validatePassword("Ab1!", 25)).toBe(false);
  });

  // Branch 3 : longueur > 20
  it("pwd trop long (> 20 chars) → false", () => {
    expect(validatePassword("Ab1!Ab1!Ab1!Ab1!Ab1!Ab1!", 25)).toBe(false);
  });

  // Branche enfant (age < 12)
  it("enfant : pas de minuscule → false", () => {
    expect(validatePassword("ABCDEFGH", 8)).toBe(false);
  });
  it("enfant : avec minuscule → true", () => {
    expect(validatePassword("abcdefgh", 8)).toBe(true);
  });

  // Branche adulte (12 <= age < 65)
  it("adulte : pas de majuscule → false", () => {
    expect(validatePassword("abcdefg1!", 25)).toBe(false);
  });
  it("adulte : pas de minuscule → false", () => {
    expect(validatePassword("ABCDEFG1!", 25)).toBe(false);
  });
  it("adulte : pas de chiffre → false", () => {
    expect(validatePassword("Abcdefg!!", 25)).toBe(false);
  });
  it("adulte : pas de caractère spécial → false", () => {
    expect(validatePassword("Abcdefg12", 25)).toBe(false);
  });
  it("adulte : pwd valide → true", () => {
    expect(validatePassword("Abcdef1!", 25)).toBe(true);
  });

  // Branche senior (age >= 65)
  it("senior : ni chiffre ni majuscule → false", () => {
    expect(validatePassword("abcdefgh", 70)).toBe(false);
  });
  it("senior : avec chiffre seulement → true", () => {
    expect(validatePassword("abcdef12", 70)).toBe(true);
  });
  it("senior : avec majuscule seulement → true", () => {
    expect(validatePassword("Abcdefgh", 70)).toBe(true);
  });
});