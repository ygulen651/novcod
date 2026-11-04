"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import s from "./Statement.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TEXT = "Muhasebeden masadaki siparişe, alt bayiden fabrikaya. İşinizin her adımı için geliştirdiğimiz yazılımlar.";

/** React Bits ScrollReveal fikrinden uyarlandı: cümle kaydırmayla kelime kelime aydınlanır. */
export function Statement() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-word]",
          { opacity: 0.38 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.05,
            scrollTrigger: { trigger: root.current, start: "top 72%", end: "bottom 62%", scrub: 0.4 },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section className={s.section} ref={root}>
      <p className={`wrap ${s.text}`}>
        {TEXT.split(" ").map((word, index) => (
          <span key={index} data-word>{word} </span>
        ))}
      </p>
    </section>
  );
}
