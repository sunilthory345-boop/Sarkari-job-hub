/**
 * High-reliability fetch wrapper with automatic retry capabilities
 * specifically designed to handle cold-starts and transport failures elegantly.
 */
export async function fetchWithRetry(
  input: RequestInfo | URL,
  init?: RequestInit,
  retries = 3,
  delayMs = 1200
): Promise<Response> {
  let lastError: any;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(input, init);
      // If we got a 502/503/504, it might be a temporary gateway error during redeploys
      if (response.status === 502 || response.status === 503 || response.status === 504) {
        throw new Error(`Server temporarily unavailable (HTTP ${response.status})`);
      }
      return response;
    } catch (err: any) {
      lastError = err;
      
      // If we are out of retries, bust out of the loop and throw
      if (attempt === retries) {
        break;
      }

      // Log warning and wait for the backoff delay
      console.warn(
        `[Sarkari Fetch Safety] Attempt ${attempt}/${retries} failed for ${input.toString()}: ${err.message || err}. Retrying in ${delayMs}ms...`
      );
      
      await new Promise(resolve => setTimeout(resolve, delayMs));
      // Progressive backoff delay increment
      delayMs = Math.floor(delayMs * 1.5);
    }
  }

  throw lastError || new Error("Failed to fetch after multiple retries");
}
