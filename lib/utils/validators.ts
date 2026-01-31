// Input validation utilities

/**
 * Validate email address
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate slug format (lowercase, hyphens, no special chars)
 */
export function isValidSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
}

/**
 * Validate required field
 */
export function isRequired(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

/**
 * Validate minimum length
 */
export function hasMinLength(value: string, minLength: number): boolean {
  return value.length >= minLength;
}

/**
 * Validate maximum length
 */
export function hasMaxLength(value: string, maxLength: number): boolean {
  return value.length <= maxLength;
}

/**
 * Validate number is within range
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Validate NFR ID format (positive integer)
 */
export function isValidNFRId(id: unknown): id is number {
  return typeof id === "number" && Number.isInteger(id) && id > 0;
}

/**
 * Validate category slug
 */
export function isValidCategory(
  category: string
): category is "frontend" | "backend" | "shared" | "advanced" {
  return ["frontend", "backend", "shared", "advanced"].includes(category);
}

/**
 * Validate difficulty level
 */
export function isValidDifficulty(
  difficulty: string
): difficulty is "beginner" | "intermediate" | "advanced" {
  return ["beginner", "intermediate", "advanced"].includes(difficulty);
}

/**
 * Sanitize search query
 */
export function sanitizeSearchQuery(query: string): string {
  return query
    .trim()
    .replace(/[<>]/g, "") // Remove potential XSS characters
    .slice(0, 100); // Limit length
}

/**
 * Validation result type
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Create validation result
 */
export function createValidationResult(
  isValid: boolean,
  errors: string[] = []
): ValidationResult {
  return { isValid, errors };
}

/**
 * Combine multiple validation results
 */
export function combineValidationResults(
  ...results: ValidationResult[]
): ValidationResult {
  const errors = results.flatMap((r) => r.errors);
  return {
    isValid: errors.length === 0,
    errors,
  };
}
