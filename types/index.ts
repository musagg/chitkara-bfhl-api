/**
 * Valid operation keys for the BFHL API
 */
export type ValidKey = "fibonacci" | "prime" | "lcm" | "hcf" | "AI";

/**
 * Success response structure for BFHL API
 */
export interface SuccessResponse {
  is_success: true;
  official_email: string;
  data: number[] | number | string;
}

/**
 * Error response structure for BFHL API
 */
export interface ErrorResponse {
  is_success: false;
  official_email: string;
  error: string;
}

/**
 * Union type for all possible API responses
 */
export type ApiResponse = SuccessResponse | ErrorResponse;

/**
 * Successful validation result
 */
export interface ValidationSuccess {
  valid: true;
  key: ValidKey;
  value: unknown;
}

/**
 * Failed validation result
 */
export interface ValidationFailure {
  valid: false;
  status: number;
  error: string;
}

/**
 * Union type for validation results
 */
export type ValidationResult = ValidationSuccess | ValidationFailure;
