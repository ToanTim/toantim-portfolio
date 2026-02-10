Components (src/components)
Navbar: primary site navigation with responsive menu.
LayoutWrapper: app-level wrapper that handles the initial loader.
PageLoader: full-screen loading animation.
ImageSwiper: image carousel used in project details.
ResearchCard: summary card for research areas.
TimelineItem: timeline entry for experience/education.
index.ts: barrel exports for components.

Components (src/components/paper-readings)
PaperReadingsPage: full page wrapper (navbar + background) for /paper-readings.
PaperReadingsSection: reusable header + list block for embedding on the home page.
PaperList: semantic list layout that renders multiple paper cards.
PaperCard: single paper display with metadata, summary, tags, and links.
TagBadge: small visual label for paper topics/keywords.

Components (src/components/skeletons)
SkeletonBase: shared shimmer/animation wrapper.
SkeletonText: text line placeholder.
SkeletonImage: image block placeholder.
SkeletonCard: generic card placeholder.
ProjectCardSkeleton: placeholder for project cards.
ProjectsGridSkeleton: grid wrapper for multiple project card skeletons.
ProjectDetailSkeleton: placeholder for project detail view.
ResearchCardSkeleton: placeholder for research cards.
index.ts: barrel exports for skeletons.
