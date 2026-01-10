/* ./projects/[id] */
interface Step {
  id: string;
  title: string;
  icon: string;
  content: {
    engineering: string;
  };
}

interface ProjectData {
  id: string;
  title: string;
  description: string;
  image?: string;
  gradient: string;
  tech: string[];
  active: boolean;
  steps: Step[];
  categories?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

interface ProjectOverview {
  id: string;
  title: string;
  description: string;
  tech: string[];
  gradient?: string;
  image?: string;
};

export type { ProjectOverview,ProjectData, Step };