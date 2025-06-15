export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  BLOG: "/blog",
  BLOG_POST: (id: string) => `/blog/${id}`, // dynamic route helper
};

export function navigateTo(route: string) {
  if (typeof window !== "undefined") {
    window.location.href = route;
  }
}
