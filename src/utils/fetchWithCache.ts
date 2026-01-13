/**
 * Fetch with Cache Utility
 * Intelligent API fetching with browser caching, expiration, and error handling
 */

import {
  getCacheData,
  setCacheData,
  invalidateCache,
  StorageType,
} from "./cacheStorage";

// Global configuration
const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes
const DEFAULT_STORAGE: StorageType = "localStorage";

/**
 * Options for fetch request
 */
export interface FetchOptions extends Omit<RequestInit, "method" | "body"> {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: Record<string, any> | string; // Objects will be stringified automatically
}

/**
 * Options for fetchWithCache function
 */
export interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  storageType?: StorageType; // Type of storage to use
  skipCache?: boolean; // Skip reading from cache (but still write to it)
  forceRefresh?: boolean; // Bypass cache completely
}

/**
 * Response from fetchWithCache
 */
export interface FetchWithCacheResponse<T> {
  data: T;
  cached: boolean; // Whether data came from cache
  timestamp: number; // When the data was fetched/cached
  error?: string;
}

/**
 * Generate cache key from URL and options
 */
function generateCacheKey(url: string, options?: FetchOptions): string {
  // Create a unique key based on URL and relevant fetch options
  const key = `cache:${url}`;

  // Include method in key if not GET
  if (options?.method && options.method !== "GET") {
    return `${key}:${options.method}`;
  }

  return key;
}

/**
 * Validate that response is JSON
 */
async function validateJsonResponse(response: Response): Promise<any> {
  const contentType = response.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    throw new Error(
      `Expected JSON response, got ${contentType || "unknown content-type"}`
    );
  }

  return response.json();
}

/**
 * Main function: Fetch with intelligent caching
 *
 * @param url - API endpoint URL
 * @param fetchOptions - Fetch request options (method, headers, body, etc.)
 * @param cacheOptions - Cache behavior options
 * @returns Promise with cached/fetched data and metadata
 *
 * @example
 * // Basic usage
 * const { data, cached } = await fetchWithCache('/api/projects');
 *
 * @example
 * // With custom TTL
 * const { data } = await fetchWithCache('/api/projects', {}, { ttl: 10 * 60 * 1000 });
 *
 * @example
 * // Force refresh (bypass cache)
 * const { data } = await fetchWithCache('/api/projects', {}, { forceRefresh: true });
 *
 * @example
 * // POST request (not cached by default)
 * const { data } = await fetchWithCache(
 *   '/api/contact',
 *   { method: 'POST', body: { name: 'John' } },
 *   { ttl: 0 } // Don't cache POST
 * );
 */

export async function fetchWithCache<T = any>(
  url: string,
  fetchOptions?: FetchOptions,
  cacheOptions?: CacheOptions
): Promise<FetchWithCacheResponse<T>> {
  const {
    ttl = DEFAULT_TTL,
    storageType = DEFAULT_STORAGE,
    skipCache = false,
    forceRefresh = false,
  } = cacheOptions || {};

  const cacheKey = generateCacheKey(url, fetchOptions);
  const now = Date.now();

  try {
    // Step 1: Check cache if not forcing refresh
    if (!forceRefresh && !skipCache) {
      const cachedData = getCacheData<T>(cacheKey, storageType);
      if (cachedData !== null) {
        return {
          data: cachedData,
          cached: true,
          timestamp: now,
        };
      }
    }

    // Step 2: Prepare fetch body safely
    let body: BodyInit | undefined = undefined;
    if (fetchOptions?.body !== undefined) {
      if (typeof fetchOptions.body === "string") {
        body = fetchOptions.body;
      } else {
        // Convert object to JSON string
        body = JSON.stringify(fetchOptions.body);
      }
    }

    // Step 3: Fetch from API
    const response = await fetch(url, {
      ...fetchOptions,
      method: fetchOptions?.method || "GET",
      body,
    });

    if (!response.ok) {
      throw new Error(
        `API request failed with status ${response.status}: ${response.statusText}`
      );
    }

    // Step 4: Validate and parse JSON
    const data = await validateJsonResponse(response);

    // Step 5: Cache the response (if TTL > 0)
    if (ttl > 0 && fetchOptions?.method?.toUpperCase() !== "POST") {
      setCacheData(cacheKey, data, ttl, storageType);
    }

    return {
      data,
      cached: false,
      timestamp: now,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    // Return stale cache if fetch fails
    const cachedFallback = getCacheData<T>(cacheKey, storageType);
    if (cachedFallback !== null) {
      console.warn(`Fetch failed, returning stale cache for ${url}:`, errorMessage);
      return {
        data: cachedFallback,
        cached: true,
        timestamp: now,
        error: `Returning stale cache: ${errorMessage}`,
      };
    }

    // No cache available
    console.error(`Failed to fetch ${url}:`, errorMessage);
    throw new Error(`Failed to fetch ${url}: ${errorMessage}`);
  }
}


/**
 * Convenience function to invalidate cache for a specific URL
 */
export function invalidateCacheForUrl(
  url: string,
  fetchOptions?: FetchOptions,
  storageType: StorageType = DEFAULT_STORAGE
): void {
  const cacheKey = generateCacheKey(url, fetchOptions);
  invalidateCache(cacheKey, storageType);
}

/**
 * Convenience function for GET requests (most common)
 */
export async function fetchWithCacheGET<T = any>(
  url: string,
  cacheOptions?: CacheOptions
): Promise<FetchWithCacheResponse<T>> {
  return fetchWithCache<T>(url, { method: "GET" }, cacheOptions);
}

/**
 * Convenience function for POST requests (typically not cached)
 */
export async function fetchWithCachePOST<T = any>(
  url: string,
  body?: Record<string, any>,
  cacheOptions?: CacheOptions
): Promise<FetchWithCacheResponse<T>> {
  return fetchWithCache<T>(
    url,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    },
    { ...cacheOptions, ttl: 0 } // Don't cache POST by default
  );
}

/**
 * Get cache statistics (debug purposes)
 */
export function getCacheStats(
  url: string,
  fetchOptions?: FetchOptions,
  storageType: StorageType = DEFAULT_STORAGE
): {
  isCached: boolean;
  expiresIn?: number;
  isValid?: boolean;
} {
  const cacheKey = generateCacheKey(url, fetchOptions);
  const cachedData = getCacheData(cacheKey, storageType);

  return {
    isCached: cachedData !== null,
  };
}
