// lib/getProjectById.ts
import { ProjectData, ProjectOverview } from "@/types/types";

const API=process.env.NODE_ENV==='production'? process.env.NEXT_PUBLIC_API_URL_PRODUCTION : process.env.NEXT_PUBLIC_API_URL;

export async function getProjectById(
  id: string
): Promise<ProjectData | null> {
  try {
    const res = await fetch(
      `${API}/projects/${id}`,
      {
        cache: "no-store", // or "force-cache" / revalidate if needed
      }
    );

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("Failed to fetch project:", error);
    return null;
  }
}

export async function getProjectsOverview(): Promise<ProjectOverview[]> {
  const res = await fetch(
    `${API}/projects/overview`,
    {
      cache: "no-store", // or 'force-cache' if you want static
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  return res.json();
}
