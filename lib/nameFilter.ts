import { MIN_NAME_LENGTH, MAX_NAME_LENGTH } from "./constants";

export function validateNameLength(name: string): { valid: boolean; message?: string } {
  const trimmed = name.trim();

  if (trimmed.length < MIN_NAME_LENGTH) {
    return { valid: false, message: `Name must be at least ${MIN_NAME_LENGTH} characters` };
  }

  if (trimmed.length > MAX_NAME_LENGTH) {
    return { valid: false, message: `Name must be ${MAX_NAME_LENGTH} characters or less` };
  }

  return { valid: true };
}

export async function isNameAppropriate(name: string): Promise<{ valid: boolean; message?: string }> {
  const lengthCheck = validateNameLength(name);
  if (!lengthCheck.valid) return lengthCheck;

  try {
    const encoded = encodeURIComponent(name.trim());
    const res = await fetch(
      `https://www.purgomalum.com/service/containsprofanity?text=${encoded}`
    );
    const text = await res.text();

    if (text.trim() === "true") {
      return { valid: false, message: "Please choose an appropriate name" };
    }

    return { valid: true };
  } catch {
    // If the API is unreachable, allow the name (fail open)
    return { valid: true };
  }
}
