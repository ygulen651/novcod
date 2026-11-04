"use client";

import { useEffect, useRef, useState } from "react";
import { videos } from "@/content/products";
import s from "./Hero.module.css";

const VIDEO = videos.siparis;
const ORIGIN = "https://www.youtube-nocookie.com";
const SRC = `${ORIGIN}/embed/${VIDEO.id}?autoplay=1&mute=1&loop=1&playlist=${VIDEO.id}&controls=0&disablekb=1&playsinline=1&rel=0&iv_load_policy=3&enablejsapi=1`;

/**
 * Sessiz arka plan videosu. Fotoğraf ilk boyamada görünür, video sayfa yüklendikten sonra üstüne gelir.
 * Dar ekran, veri tasarrufu ve azaltılmış harekette yüklenmez.
 */
export function HeroVideo() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const allowed = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)").matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (!allowed || connection?.saveData) return;

    const timer = window.setTimeout(() => setEnabled(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  const toggle = () => {
    frame.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: paused ? "playVideo" : "pauseVideo", args: [] }),
      ORIGIN,
    );
    setPaused(!paused);
  };

  if (!enabled) return null;

  return (
    <>
      <div className={s.video} data-visible={visible || undefined} aria-hidden="true">
        <iframe
          ref={frame}
          src={SRC}
          title="Novcod tanıtım filmi, sessiz arka plan"
          tabIndex={-1}
          allow="autoplay; encrypted-media"
          onLoad={() => window.setTimeout(() => setVisible(true), 2200)}
        />
      </div>
      {visible && (
        <button type="button" className={s.videoToggle} style={{ zIndex: 2 }} onClick={toggle}>
          {paused ? "Videoyu oynat" : "Videoyu durdur"}
        </button>
      )}
    </>
  );
}
