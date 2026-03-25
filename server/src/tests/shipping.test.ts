import { calculateShipping } from "../utils/shipping.js";

// ── CATALOG-BASED TESTING ──────────────────────────────────────────────────

describe("calculateShipping - Catalog Based Testing (valeurs limites)", () => {

  it("distance négative → throw 'Invalid distance'", () => {
    expect(() => calculateShipping(-1, 5, "standard")).toThrow("Invalid distance");
  });

  it("poids nul (0) → throw 'Invalid weight'", () => {
    expect(() => calculateShipping(10, 0, "standard")).toThrow("Invalid weight");
  });
  it("poids négatif → throw 'Invalid weight'", () => {
    expect(() => calculateShipping(10, -1, "standard")).toThrow("Invalid weight");
  });
  it("poids > 50 → throw 'Invalid weight'", () => {
    expect(() => calculateShipping(10, 51, "standard")).toThrow("Invalid weight");
  });

  it("distance = 0 (borne inf) → 10€", () => {
    expect(calculateShipping(0, 5, "standard")).toBe(10);
  });
  it("distance = 50 (borne sup courte) → 10€", () => {
    expect(calculateShipping(50, 5, "standard")).toBe(10);
  });
  it("distance = 51 (borne inf moyenne) → 25€", () => {
    expect(calculateShipping(51, 5, "standard")).toBe(25);
  });
  it("distance = 500 (borne sup moyenne) → 25€", () => {
    expect(calculateShipping(500, 5, "standard")).toBe(25);
  });
  it("distance = 501 (borne inf longue) → 50€", () => {
    expect(calculateShipping(501, 5, "standard")).toBe(50);
  });

  it("poids = 9 (juste sous majoration) → pas de majoration", () => {
    expect(calculateShipping(10, 9, "standard")).toBe(10);
  });
  it("poids = 10 (borne majoration 50%) → 15€", () => {
    expect(calculateShipping(10, 10, "standard")).toBe(15);
  });
  it("poids = 50 (borne max valide) → 15€", () => {
    expect(calculateShipping(10, 50, "standard")).toBe(15);
  });
});

// ── N-WISE TESTING ─────────────────────────────────────────────────────────

describe("calculateShipping - N-Wise (Pairwise) Testing", () => {

  test.each([
    [25,  5,  "standard",  10,    "D1+W1+T1 : courte, léger, standard"],
    [25,  20, "express",   30,    "D1+W2+T2 : courte, lourd, express"],
    [100, 5,  "express",   50,    "D2+W1+T2 : moyenne, léger, express"],
    [100, 20, "standard",  37.5,  "D2+W2+T1 : moyenne, lourd, standard"],
    [600, 5,  "express",   100,   "D3+W1+T2 : longue, léger, express"],
    [600, 20, "standard",  75,    "D3+W2+T1 : longue, lourd, standard"],
  ])("%s km, %s kg, %s → %s€ (%s)", (distance, weight, type, expected, _desc) => {
    expect(calculateShipping(
      distance as number,
      weight as number,
      type as "standard" | "express"
    )).toBe(expected);
  });
});