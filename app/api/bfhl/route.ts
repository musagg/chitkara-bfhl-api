import { NextRequest } from "next/server";
import type { ErrorResponse, SuccessResponse } from "@/types";
import { validateRequest } from "@/lib/validation";
import { checkRateLimit, checkBodySize } from "@/lib/rateLimit";
import { handleOptions, jsonResponse } from "@/lib/cors";
import {
  fibonacci,
  filterPrimes,
  computeLCM,
  computeHCF,
} from "@/lib/math";
import { queryGemini } from "@/lib/ai";

const OFFICIAL_EMAIL = process.env.OFFICIAL_EMAIL || "";

/**
 * Creates an error response with official_email
 */
function errorResponse(error: string, status: number = 400): Response {
  const response: ErrorResponse = {
    is_success: false,
    official_email: OFFICIAL_EMAIL,
    error,
  };
  return jsonResponse(response, status);
}

/**
 * Creates a success response with official_email and data
 */
function successResponse(
  data: number[] | number | string
): Response {
  const response: SuccessResponse = {
    is_success: true,
    official_email: OFFICIAL_EMAIL,
    data,
  };
  return jsonResponse(response, 200);
}

/**
 * Handles OPTIONS preflight requests
 */
export async function OPTIONS() {
  return handleOptions();
}

/**
 * Handles POST requests to /api/bfhl
 */
export async function POST(request: NextRequest) {
  try {
    // Check rate limit
    const rateLimitCheck = checkRateLimit(request.headers);
    if (!rateLimitCheck.allowed) {
      return errorResponse(rateLimitCheck.error!, 429);
    }

    // Read and check body size
    const bodyText = await request.text();
    const bodySizeCheck = checkBodySize(bodyText);
    if (!bodySizeCheck.allowed) {
      return errorResponse(bodySizeCheck.error!, 413);
    }

    // Parse JSON
    let body: unknown;
    try {
      body = JSON.parse(bodyText);
    } catch (error) {
      return errorResponse("Invalid JSON in request body", 400);
    }

    // Validate request
    const validation = validateRequest(body);
    if (!validation.valid) {
      return errorResponse(validation.error, validation.status);
    }

    const { key, value } = validation;

    // Process based on key
    switch (key) {
      case "fibonacci": {
        const n = value as number;
        const result = fibonacci(n);
        return successResponse(result);
      }

      case "prime": {
        const numbers = value as number[];
        const result = filterPrimes(numbers);
        return successResponse(result);
      }

      case "lcm": {
        const numbers = value as number[];
        const result = computeLCM(numbers);
        return successResponse(result);
      }

      case "hcf": {
        const numbers = value as number[];
        const result = computeHCF(numbers);
        return successResponse(result);
      }

      case "AI": {
        const question = value as string;
        try {
          const answer = await queryGemini(question);
          return successResponse(answer);
        } catch (error) {
          console.error("AI error:", error);
          return errorResponse("AI service unavailable", 502);
        }
      }

      default:
        return errorResponse("Invalid operation", 400);
    }
  } catch (error) {
    // Log the actual error server-side but don't expose it to the client
    console.error("Unhandled error in POST /api/bfhl:", error);
    return errorResponse("Internal server error", 500);
  }
}

/**
 * Handles non-POST requests
 */
export async function GET() {
  return errorResponse("Method not allowed", 405);
}

export async function PUT() {
  return errorResponse("Method not allowed", 405);
}

export async function DELETE() {
  return errorResponse("Method not allowed", 405);
}

export async function PATCH() {
  return errorResponse("Method not allowed", 405);
}
