import type { ValidKey, ValidationResult } from "@/types";

const VALID_KEYS: ValidKey[] = ["fibonacci", "prime", "lcm", "hcf", "AI"];
const MAX_FIBONACCI = 100;
const MAX_ARRAY_LENGTH = 1000;
const MAX_AI_QUESTION_LENGTH = 500;

/**
 * Validates that a value is a non-negative integer
 * @param value - Value to check
 * @returns true if value is a non-negative integer
 */
function isNonNegativeInteger(value: unknown): boolean {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= 0 &&
    !Number.isNaN(value)
  );
}

/**
 * Validates that a value is a positive integer
 * @param value - Value to check
 * @returns true if value is a positive integer (> 0)
 */
function isPositiveInteger(value: unknown): boolean {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value > 0 &&
    !Number.isNaN(value)
  );
}

/**
 * Validates an array contains only positive integers
 * @param arr - Array to validate
 * @returns Validation result object
 */
function validateIntegerArray(
  arr: unknown,
  key: string
): ValidationResult | null {
  if (!Array.isArray(arr)) {
    return {
      valid: false,
      status: 400,
      error: `${key} requires a non-empty array of integers`,
    };
  }

  if (arr.length === 0) {
    return {
      valid: false,
      status: 400,
      error: `${key} requires a non-empty array of integers`,
    };
  }

  if (arr.length > MAX_ARRAY_LENGTH) {
    return {
      valid: false,
      status: 400,
      error: `Array too large, max ${MAX_ARRAY_LENGTH} elements`,
    };
  }

  for (const item of arr) {
    if (!isPositiveInteger(item)) {
      return {
        valid: false,
        status: 400,
        error: "Array must contain only positive integers",
      };
    }
  }

  return null;
}

/**
 * Validates the request body and extracts the operation key and value
 * @param body - Request body to validate
 * @returns ValidationResult with either success or failure details
 */
export function validateRequest(body: unknown): ValidationResult {
  // Check if body exists
  if (body === null || body === undefined || typeof body !== "object") {
    return {
      valid: false,
      status: 400,
      error: "Request body is required",
    };
  }

  const bodyObj = body as Record<string, unknown>;
  const keys = Object.keys(bodyObj);

  // Find recognized keys
  const recognizedKeys = keys.filter((key) =>
    VALID_KEYS.includes(key as ValidKey)
  );

  // Check for no recognized keys
  if (recognizedKeys.length === 0) {
    return {
      valid: false,
      status: 400,
      error: "Request must contain exactly one of: fibonacci, prime, lcm, hcf, AI",
    };
  }

  // Check for multiple recognized keys
  if (recognizedKeys.length > 1) {
    return {
      valid: false,
      status: 400,
      error: "Request must contain exactly one key",
    };
  }

  const key = recognizedKeys[0] as ValidKey;
  const value = bodyObj[key];

  // Validate based on key type
  switch (key) {
    case "fibonacci": {
      if (!isNonNegativeInteger(value)) {
        return {
          valid: false,
          status: 400,
          error: "fibonacci requires a non-negative integer",
        };
      }

      if ((value as number) > MAX_FIBONACCI) {
        return {
          valid: false,
          status: 400,
          error: `fibonacci input too large, max is ${MAX_FIBONACCI}`,
        };
      }

      return { valid: true, key, value };
    }

    case "prime":
    case "lcm":
    case "hcf": {
      const arrayError = validateIntegerArray(value, key);
      if (arrayError) {
        return arrayError;
      }

      return { valid: true, key, value };
    }

    case "AI": {
      if (typeof value !== "string") {
        return {
          valid: false,
          status: 400,
          error: "AI requires a question string",
        };
      }

      const trimmed = value.trim();

      if (trimmed.length === 0) {
        return {
          valid: false,
          status: 400,
          error: "AI question cannot be empty",
        };
      }

      if (trimmed.length > MAX_AI_QUESTION_LENGTH) {
        return {
          valid: false,
          status: 400,
          error: `AI question too long, max ${MAX_AI_QUESTION_LENGTH} characters`,
        };
      }

      return { valid: true, key, value: trimmed };
    }

    default:
      return {
        valid: false,
        status: 400,
        error: "Request must contain exactly one of: fibonacci, prime, lcm, hcf, AI",
      };
  }
}
