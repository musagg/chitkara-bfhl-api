import type { ErrorResponse, SuccessResponse } from "@/types";
import { handleOptions, jsonResponse } from "@/lib/cors";

const OFFICIAL_EMAIL = process.env.OFFICIAL_EMAIL || "";

/**
 * Handles OPTIONS preflight requests
 */
export async function OPTIONS() {
  return handleOptions();
}

/**
 * Handles GET requests to /api/health
 */
export async function GET() {
  const response: SuccessResponse = {
    is_success: true,
    official_email: OFFICIAL_EMAIL,
    data: "healthy",
  };
  return jsonResponse(response, 200);
}

/**
 * Handles non-GET requests with error response
 */
function methodNotAllowed(): Response {
  const response: ErrorResponse = {
    is_success: false,
    official_email: OFFICIAL_EMAIL,
    error: "Method not allowed",
  };
  return jsonResponse(response, 405);
}

export async function POST() {
  return methodNotAllowed();
}

export async function PUT() {
  return methodNotAllowed();
}

export async function DELETE() {
  return methodNotAllowed();
}

export async function PATCH() {
  return methodNotAllowed();
}
