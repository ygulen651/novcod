"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ScrollApi = {
  scrollToId: (id: string, immediate?: boolean) => void;
  scrollToY: (y: number, immediate?: boolean) => void;
  lock: () => void;
  unlock: () => void;
};

const ScrollContext = createContext<ScrollApi>({
  scrollToId: () => {},
  scrollToY: () => {},
  lock: () => {},
  unlock: () => {},
});

export const useScrollApi = () => useContext(ScrollContext);

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let tick: ((time: number) => void) | null = null;

    const stop = () => {
      if (tick) gsap.ticker.remove(tick);
      tick = null;
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };

    const start = () => {
      stop();
      if (reduced.matches) return;
      // Dokunmatikte syncTouch kapalı kalır, kaydırma tarayıcıda doğal çalışır.
      const lenis = new Lenis({ lerp: 0.14, wheelMultiplier: 1, allowNestedScroll: true });
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      lenisRef.current = lenis;
    };

    start();
    reduced.addEventListener("change", start);
    return () => {
      reduced.removeEventListener("change", start);
      stop();
    };
  }, []);

  useEffect(() => {
    if (!window.location.hash) lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  const scrollToY = useCallback((y: number, immediate = false) => {
    if (lenisRef.current) lenisRef.current.scrollTo(y, { duration: 1, immediate, force: immediate });
    else window.scrollTo(0, y);
  }, []);

  const scrollToId = useCallback(
    (id: string, immediate = false) => {
      const el = document.getElementById(id);
      if (!el) return;
      const moveFocus = () => {
        if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
        el.focus({ preventScroll: true });
      };
      if (lenisRef.current) {
        // Üst boşluk CSS scroll-margin-top ile gelir; Lenis bu değeri kendisi hesaba katar.
        lenisRef.current.scrollTo(el, { duration: 1, immediate, force: immediate, onComplete: moveFocus });
      } else {
        el.scrollIntoView();
        moveFocus();
      }
      history.replaceState(null, "", `#${id}`);
    },
    [],
  );

  const api = useMemo<ScrollApi>(
    () => ({
      scrollToId,
      scrollToY,
      lock: () => lenisRef.current?.stop(),
      unlock: () => lenisRef.current?.start(),
    }),
    [scrollToId, scrollToY],
  );

  return <ScrollContext.Provider value={api}>{children}</ScrollContext.Provider>;
}
