type Role = "admin" | "user" | "stagiaire";

export function validateUserRegistration(
  age: number,
  role: Role | string,
  email: string
): boolean {

  if (role !== "admin" && role !== "user" && role !== "stagiaire") {
    throw new Error("Rôle invalide");
  }

  if (typeof age !== "number" || isNaN(age)) {
    throw new Error("Âge invalide");
  }
  if (age > 120) {
    throw new Error("Âge invalide");
  }
  if (age < 18 && role !== "stagiaire") {
    return false;
  }

  if (!email.includes("@") || !email.includes(".")) {
    return false;
  }

  return true;
}