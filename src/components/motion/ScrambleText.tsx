"use client";

import { useEffect, useState } from "react";

const GLYPHS = "01<>/{}[]#*+=_ABCDEFGHIJKLMNOPRSTUVYZ";

type Props = { text: string; className?: string; delay?: number; duration?: number };

/**
 * Metni kısa bir "şifre çözme" efektiyle gösterir: harfler soldan sağa rastgele karakterlerden çözülür.
 * Sunucuda ve hareket azaltma tercihinde metin doğrudan görünür. Ekran okuyucular yalnızca gerçek metni okur.
 */
export function ScrambleText({ text, className, delay = 250, duration = 900 }: Props) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / duration);
      const solved = Math.floor(t * text.length);
      setDisplay(
        text
          .split("")
          .map((char, i) => (i < solved || char === " " ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join(""),
      );
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    const timer = window.setTimeout(() => (frame = requestAnimationFrame(tick)), delay);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
      setDisplay(text);
    };
  }, [text, delay, duration]);

  return (
    <span className={className}>
      <span className="srOnly">{text}</span>
      {/* Gerçek metin görünmez biçimde yer tutar; efekt üstünde çalışır, satır kaymaz. */}
      <span className="scramble" aria-hidden="true">
        <span className="scrambleGhost">{text}</span>
        <span className="scrambleLive">{display}</span>
      </span>
    </span>
  );
}
