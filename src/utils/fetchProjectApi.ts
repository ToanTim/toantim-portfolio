// lib/getProjectById.ts
import { ProjectData, ProjectOverview } from "@/types/types";
import { fetchWithCache } from "./fetchWithCache";

const API =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL_PRODUCTION
    : process.env.NEXT_PUBLIC_API_URL;

/**
 * Fetch a single project by ID with caching
 * Cache TTL: 10 minutes
 */
export async function getProjectById(
  id: string
): Promise<ProjectData | null> {
  try {
    // Skip caching in development
    if (process.env.NODE_ENV === "development") {
      const response = await fetch(`${API}/projects/${id}`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    }

    const response = await fetchWithCache<ProjectData>(
      `${API}/projects/${id}`,
      { method: "GET" },
      {
        ttl: 10 * 60 * 1000, // 10 minutes
        storageType: "localStorage",
      }
    );

    return response.data || null;
  } catch (error) {
    console.error("Failed to fetch project:", error);
    return null;
  }
}

/**
 * Fetch all projects overview with caching
 * Cache TTL: 15 minutes
 */
export async function getProjectsOverview(): Promise<ProjectOverview[]> {
  try {
    // Skip caching in development
    if (process.env.NODE_ENV === "development") {
      const response = await fetch(`${API}/projects/overview`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    }

    const response = await fetchWithCache<ProjectOverview[]>(
      `${API}/projects/overview`,
      { method: "GET" },
      {
        ttl: 15 * 60 * 1000, // 15 minutes
        storageType: "localStorage",
      }
    );

    return response.data || [];
  } catch (error) {
    console.error("Failed to fetch projects overview:", error);
    return [];
  }
}
