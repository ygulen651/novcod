"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Hat çizgilerini bir kez çizer; ürün görsellerini kaydırmayla maskeden açar. İçerik metinleri gizlenmez. */
export function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-draw]").forEach((line) => {
        const vertical = getComputedStyle(line).getPropertyValue("--draw-axis").trim() === "y";
        gsap.from(line, {
          scaleX: vertical ? 1 : 0,
          scaleY: vertical ? 0 : 1,
          duration: 1.1,
          ease: "power2.inOut",
          scrollTrigger: { trigger: line.parentElement, start: "top 88%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((item) => {
        gsap.fromTo(
          item,
          { clipPath: "inset(8% 7% 8% 7% round 20px)", scale: 0.94 },
          {
            clipPath: "inset(-10% -10% -10% -10% round 0px)",
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: item, start: "top 98%", end: "top 45%", scrub: 0.4 },
          },
        );
      });
    });
    return () => mm.revert();
  }, [pathname]);

  return null;
}
