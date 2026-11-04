"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";
import { useScrollApi } from "@/components/motion/SmoothScroll";

type Props = {
  id: string;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
};

/** Sayfa içi bölüm bağlantısı. Mevcut sayfada bölüm varsa Lenis ile gider, yoksa ana sayfadaki bölüme yönlenir. */
export function AnchorLink({ id, className, children, onNavigate }: Props) {
  const pathname = usePathname();
  const { scrollToId } = useScrollApi();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();
    if (pathname === "/" || document.getElementById(id)) {
      event.preventDefault();
      // Menü kapanırken kaydırma kilidi açılır; kaydırma bu işlemden sonra başlamalı.
      if (onNavigate) window.setTimeout(() => scrollToId(id), 80);
      else scrollToId(id);
    }
  };

  const href = pathname === "/" ? `#${id}` : `/#${id}`;
  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
