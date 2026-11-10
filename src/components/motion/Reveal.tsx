"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * `data-fade` taşıyan öğeler görünür alana girince `data-in` alır ve kısa bir girişle belirir.
 * Hareket azaltma tercihinde `html[data-motion]` hiç eklenmediği için öğeler doğrudan görünür.
 */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (!("motion" in root.dataset)) return;
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-fade]:not([data-in])"));
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.setAttribute("data-in", ""));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-in", "");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
