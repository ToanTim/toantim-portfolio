/**
 * useFetchWithCache Hook
 * React hook for fetching data with intelligent caching
 * Handles loading, error states, and cache management
 */

import { useState, useEffect, useCallback } from "react";
import {
  fetchWithCache,
  CacheOptions,
  FetchOptions,
  FetchWithCacheResponse,
  invalidateCacheForUrl,
} from "@/utils/fetchWithCache";

/**
 * Hook state
 */
interface UseFetchWithCacheState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  cached: boolean;
  refetch: () => Promise<void>;
  invalidate: () => void;
}

/**
 * useFetchWithCache Hook
 *
 * Manages API calls with automatic caching
 *
 * @param url - API endpoint URL
 * @param fetchOptions - Fetch request options
 * @param cacheOptions - Cache behavior options
 * @param dependencies - Effect dependencies (default: [url])
 * @returns Hook state with data, loading, error, and refetch/invalidate functions
 *
 * @example
 * // Basic usage
 * const { data, loading, error } = useFetchWithCache('/api/projects');
 *
 * @example
 * // With refetch button
 * const { data, loading, refetch } = useFetchWithCache('/api/data');
 * return (
 *   <>
 *     {loading && <Skeleton />}
 *     {data && <Content data={data} />}
 *     <button onClick={refetch}>Refresh</button>
 *   </>
 * );
 *
 * @example
 * // Invalidate cache on demand
 * const { data, invalidate } = useFetchWithCache('/api/items');
 * const handleCreate = async () => {
 *   await createItem();
 *   invalidate(); // Clear cache to refetch
 * };
 */
export function useFetchWithCache<T = any>(
  url: string,
  fetchOptions?: FetchOptions,
  cacheOptions?: CacheOptions,
  dependencies: any[] = [url]
): UseFetchWithCacheState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [cached, setCached] = useState(false);

  /**
   * Perform the fetch
   */
  const performFetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchWithCache<T>(
        url,
        fetchOptions,
        cacheOptions
      );

      setData(response.data);
      setCached(response.cached);

      if (response.error) {
        console.warn(response.error);
      }
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      setError(errorObj);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url, fetchOptions, cacheOptions]);

  /**
   * Effect to fetch on mount and dependency changes
   */
  useEffect(() => {
    performFetch();
  }, dependencies);

  /**
   * Refetch manually
   */
  const refetch = useCallback(async () => {
    await performFetch();
  }, [performFetch]);

  /**
   * Invalidate cache manually
   */
  const invalidate = useCallback(() => {
    invalidateCacheForUrl(url, fetchOptions, cacheOptions?.storageType);
    // Refetch after invalidation
    performFetch();
  }, [url, fetchOptions, cacheOptions, performFetch]);

  return {
    data,
    loading,
    error,
    cached,
    refetch,
    invalidate,
  };
}

/**
 * useInvalidateCache Hook
 * Minimal hook just for cache invalidation
 *
 * @example
 * const invalidateProjects = useInvalidateCache('/api/projects');
 * const handleUpdate = async () => {
 *   await updateProject();
 *   invalidateProjects(); // Clear cache
 * };
 */
export function useInvalidateCache(
  url: string,
  fetchOptions?: FetchOptions,
  storageType = "localStorage"
) {
  return useCallback(() => {
    invalidateCacheForUrl(url, fetchOptions, storageType as any);
  }, [url, fetchOptions, storageType]);
}
