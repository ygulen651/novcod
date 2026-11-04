"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";
import s from "./PageTransition.module.css";

/** İç bağlantılarda kısa perde geçişi. Yeni sekme, değiştirici tuşlar ve tarayıcı geri tuşu olduğu gibi çalışır. */
export function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const curtain = useRef<HTMLDivElement>(null);
  const leaving = useRef(false);
  const first = useRef(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onClick = (event: MouseEvent) => {
      if (reduced.matches || event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest?.("a");
      if (!link || link.target || link.hasAttribute("download")) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      if (/\.[a-z0-9]+$/i.test(url.pathname)) return;
      // Hedef bölüm bu sayfada varsa sayfa değişmez, kaydırmayı AnchorLink yapar.
      if (url.hash && document.getElementById(url.hash.slice(1))) return;

      event.preventDefault();
      leaving.current = true;
      gsap.killTweensOf(curtain.current);
      gsap.fromTo(
        curtain.current,
        { scaleY: 0, transformOrigin: "50% 100%", autoAlpha: 1 },
        {
          scaleY: 1,
          duration: 0.32,
          ease: "power3.inOut",
          onComplete: () => router.push(url.pathname + url.search + url.hash),
        },
      );
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (!window.location.hash) document.getElementById("icerik")?.focus({ preventScroll: true });
    if (!leaving.current) return;
    leaving.current = false;
    gsap.to(curtain.current, {
      scaleY: 0,
      transformOrigin: "50% 0%",
      duration: 0.42,
      delay: 0.05,
      ease: "power3.inOut",
      onComplete: () => {
        gsap.set(curtain.current, { autoAlpha: 0 });
      },
    });
  }, [pathname]);

  return <div ref={curtain} className={s.curtain} aria-hidden="true" />;
}
