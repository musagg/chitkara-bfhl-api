interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting
const rateLimitStore = new Map<string, RateLimitEntry>();

const MAX_REQUESTS = 100;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_BODY_SIZE = 10 * 1024; // 10KB

/**
 * Extracts client IP address from request headers
 * @param headers - Request headers
 * @returns IP address or "unknown"
 */
function getClientIP(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  const realIP = headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }

  return "unknown";
}

/**
 * Checks if the request should be rate limited
 * @param headers - Request headers
 * @returns Object with allowed status and optional error
 */
export function checkRateLimit(headers: Headers): {
  allowed: boolean;
  error?: string;
} {
  const ip = getClientIP(headers);
  const now = Date.now();

  const entry = rateLimitStore.get(ip);

  // If no entry or window expired, create new entry
  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + WINDOW_MS,
    });
    return { allowed: true };
  }

  // Increment count
  entry.count++;

  // Check if over limit
  if (entry.count > MAX_REQUESTS) {
    return {
      allowed: false,
      error: "Too many requests, slow down",
    };
  }

  return { allowed: true };
}

/**
 * Checks if request body size is within limits
 * @param body - Request body as string
 * @returns Object with allowed status and optional error
 */
export function checkBodySize(body: string): {
  allowed: boolean;
  error?: string;
} {
  const sizeInBytes = Buffer.byteLength(body, "utf8");

  if (sizeInBytes > MAX_BODY_SIZE) {
    return {
      allowed: false,
      error: "Request body too large",
    };
  }

  return { allowed: true };
}

/**
 * Cleanup expired entries from the rate limit store (optional maintenance)
 */
export function cleanupRateLimitStore(): void {
  const now = Date.now();
  const toDelete: string[] = [];
  
  rateLimitStore.forEach((entry, ip) => {
    if (now > entry.resetTime) {
      toDelete.push(ip);
    }
  });
  
  toDelete.forEach(ip => rateLimitStore.delete(ip));
}
