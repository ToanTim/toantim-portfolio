import { useEffect, useState } from "react";

export function useScrollToTopButton(showAfter = 300) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > showAfter);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAfter]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return { show, scrollToTop };
}


export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}