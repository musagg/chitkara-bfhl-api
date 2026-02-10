/**
 * Adds CORS headers to a Response object
 * @param response - The Response object to add headers to
 * @returns The Response object with CORS headers added
 */
export function addCorsHeaders(response: Response): Response {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.headers.set("Access-Control-Max-Age", "86400");

  return response;
}

/**
 * Creates a Response with CORS headers
 * @param body - Response body
 * @param init - Response initialization options
 * @returns Response with CORS headers
 */
export function createCorsResponse(
  body: BodyInit,
  init?: ResponseInit
): Response {
  const response = new Response(body, init);
  return addCorsHeaders(response);
}

/**
 * Creates a JSON Response with CORS headers
 * @param data - Data to serialize as JSON
 * @param status - HTTP status code
 * @returns Response with JSON body and CORS headers
 */
export function jsonResponse(data: unknown, status: number = 200): Response {
  return createCorsResponse(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

/**
 * Handles OPTIONS preflight requests
 * @returns Response with CORS headers and 200 status
 */
export function handleOptions(): Response {
  return createCorsResponse("", { status: 200 });
}
