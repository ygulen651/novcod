"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { gsap } from "gsap";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(GSAPSplitText, useGSAP);

type Props = {
  text: string;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  duration?: number;
};

/**
 * React Bits SplitText bileşeninden uyarlandı (reactbits.dev, MIT + Commons Clause).
 * Değişiklikler: yalnızca satır bazlı giriş, yükleme tetikleyicisi, hareket azaltma desteği
 * ve Türkçe aksanların kırpılmaması için maske payı (.splitLine-mask, globals.css).
 */
export function SplitHeading({ text, className, style, delay = 0, duration = 0.8 }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    let active = true;
    document.fonts.ready.then(() => active && setFontsReady(true));
    return () => {
      active = false;
    };
  }, []);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !fontsReady) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const split = GSAPSplitText.create(el, {
        type: "lines",
        mask: "lines",
        linesClass: "splitLine",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, { yPercent: 110, duration, delay, ease: "power4.out", stagger: 0.09 }),
      });
      return () => split.revert();
    },
    { dependencies: [fontsReady, text], scope: ref },
  );

  return (
    <h1 ref={ref} className={className} style={style}>
      {text}
    </h1>
  );
}
