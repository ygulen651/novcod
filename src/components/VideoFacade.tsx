"use client";

import Image from "next/image";
import { useState } from "react";
import type { Video } from "@/content/products";
import s from "./VideoFacade.module.css";

type Props = { video: Video; sizes?: string };

/** YouTube oynatıcısı yalnızca ziyaretçi başlatınca yüklenir. */
export function VideoFacade({ video, sizes = "(min-width: 1024px) 50vw, 100vw" }: Props) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={s.frame}>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
          title={video.title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button type="button" className={s.poster} aria-label={`Videoyu oynat: ${video.title}`} onClick={() => setPlaying(true)}>
          <Image src={video.poster} alt="" fill sizes={sizes} />
          <span className={s.play} aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor"><path d="M6 3.5v15l12.5-7.5z" /></svg>
          </span>
        </button>
      )}
    </div>
  );
}
