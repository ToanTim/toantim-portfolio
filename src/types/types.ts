/* ./projects/[id] */
interface Step {
  id: string;
  title: string;
  icon: string;
  content: {
    engineering: string;
  };
  images?: string [];
}

interface ProjectData {
  id: string;
  title: string;
  github_link?: string;
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


/* ./paper-readings */
interface Paper {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  category: string;
  readDate: string;
  summary: string;
  tags: string[];
  notionUrl: string;
  paperUrl: string;
}

export type { Paper };


/* ./components/ImageSwiper */
interface ImageSwiperProps {
  images: string[];
  title: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}
export type { ImageSwiperProps };