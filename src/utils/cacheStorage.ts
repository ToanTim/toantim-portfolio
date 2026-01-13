/**
 * Cache Storage Manager
 * Handles browser storage operations with type safety and error handling
 */

export type StorageType = "localStorage" | "sessionStorage" | "memory";

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

/**
 * Get the appropriate storage based on environment
 * Returns null on server-side (SSR)
 */
function getStorage(type: StorageType): Storage | null {
  if (typeof window === "undefined") return null; // SSR safety

  try {
    if (type === "localStorage") return window.localStorage;
    if (type === "sessionStorage") return window.sessionStorage;
  } catch (e) {
    console.warn(`${type} not available:`, e);
    return null;
  }

  return null;
}

/**
 * In-memory cache fallback for when browser storage is unavailable
 */
const memoryCache = new Map<string, CacheEntry<any>>();

/**
 * Serialize cache entry to JSON string
 */
function serializeCacheEntry<T>(entry: CacheEntry<T>): string {
  return JSON.stringify(entry);
}

/**
 * Deserialize cache entry from JSON string
 */
function deserializeCacheEntry<T>(json: string): CacheEntry<T> {
  return JSON.parse(json);
}

/**
 * Check if cached data is still valid (not expired)
 */
function isCacheValid<T>(entry: CacheEntry<T>): boolean {
  const now = Date.now();
  const age = now - entry.timestamp;
  return age < entry.ttl;
}

/**
 * Store data in cache with expiration
 */
export function setCacheData<T>(
  key: string,
  data: T,
  ttl: number = 5 * 60 * 1000, // Default 5 minutes
  storageType: StorageType = "localStorage"
): void {
  const entry: CacheEntry<T> = {
    data,
    timestamp: Date.now(),
    ttl,
  };

  // Server-side safety
  if (typeof window === "undefined") {
    return;
  }

  try {
    const storage = getStorage(storageType);

    if (storage) {
      storage.setItem(key, serializeCacheEntry(entry));
    } else {
      // Fallback to memory cache
      memoryCache.set(key, entry);
    }
  } catch (error) {
    console.warn(`Failed to set cache for key "${key}":`, error);
    // Fallback to memory cache on storage failure
    memoryCache.set(key, entry);
  }
}

/**
 * Retrieve cached data if valid
 * Returns null if not found or expired
 */
export function getCacheData<T>(
  key: string,
  storageType: StorageType = "localStorage"
): T | null {
  // Server-side safety
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storage = getStorage(storageType);
    let cachedJson: string | null = null;

    if (storage) {
      cachedJson = storage.getItem(key);
    } else {
      const entry = memoryCache.get(key);
      if (entry) {
        cachedJson = serializeCacheEntry(entry);
      }
    }

    if (!cachedJson) {
      return null;
    }

    const entry = deserializeCacheEntry<T>(cachedJson);

    // Check if cache is still valid
    if (!isCacheValid(entry)) {
      // Remove expired entry
      invalidateCache(key, storageType);
      return null;
    }

    return entry.data;
  } catch (error) {
    console.warn(`Failed to retrieve cache for key "${key}":`, error);
    return null;
  }
}

/**
 * Invalidate (remove) cached data for a specific key
 */
export function invalidateCache(
  key: string,
  storageType: StorageType = "localStorage"
): void {
  // Server-side safety
  if (typeof window === "undefined") {
    return;
  }

  try {
    const storage = getStorage(storageType);

    if (storage) {
      storage.removeItem(key);
    } else {
      memoryCache.delete(key);
    }
  } catch (error) {
    console.warn(`Failed to invalidate cache for key "${key}":`, error);
  }
}

/**
 * Clear all cached data for a specific storage type
 */
export function clearAllCache(storageType: StorageType = "localStorage"): void {
  // Server-side safety
  if (typeof window === "undefined") {
    return;
  }

  try {
    const storage = getStorage(storageType);

    if (storage) {
      storage.clear();
    } else if (storageType === "memory") {
      memoryCache.clear();
    }
  } catch (error) {
    console.warn("Failed to clear all cache:", error);
  }
}

/**
 * Get cache expiration info (debug purposes)
 */
export function getCacheInfo(
  key: string,
  storageType: StorageType = "localStorage"
): { expiresIn: number; isValid: boolean } | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storage = getStorage(storageType);
    let cachedJson: string | null = null;

    if (storage) {
      cachedJson = storage.getItem(key);
    } else {
      const entry = memoryCache.get(key);
      if (entry) {
        cachedJson = serializeCacheEntry(entry);
      }
    }

    if (!cachedJson) {
      return null;
    }

    const entry = deserializeCacheEntry<any>(cachedJson);
    const now = Date.now();
    const age = now - entry.timestamp;
    const expiresIn = entry.ttl - age;
    const isValid = expiresIn > 0;

    return { expiresIn, isValid };
  } catch (error) {
    console.warn(`Failed to get cache info for key "${key}":`, error);
    return null;
  }
}
