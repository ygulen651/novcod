"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollApi } from "@/components/motion/SmoothScroll";

/** Tüm sahneler kurulduktan sonra ölçümleri yeniler ve adresteki bölüme gider. */
export function HomeReady() {
  const { scrollToId } = useScrollApi();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      const id = window.location.hash.slice(1);
      if (id) scrollToId(id, true);
    });
    return () => cancelAnimationFrame(frame);
  }, [scrollToId]);

  return null;
}
