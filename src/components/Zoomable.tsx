"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Shot } from "@/content/products";
import { useScrollApi } from "@/components/motion/SmoothScroll";
import { CloseIcon, ZoomIcon } from "@/components/Icons";
import s from "./Zoomable.module.css";

type Props = {
  shot: Shot;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Verilirse görsel yerine yalnızca metin düğmesi gösterilir. */
  label?: ReactNode;
};

export function Zoomable({ shot, sizes, priority, className, label }: Props) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { lock, unlock } = useScrollApi();

  useEffect(() => {
    if (!open) return;
    dialogRef.current?.showModal();
    lock();
    return unlock;
  }, [open, lock, unlock]);

  return (
    <>
      {label ? (
        <button type="button" className={s.textTrigger} onClick={() => setOpen(true)}>
          <ZoomIcon /> {label}
        </button>
      ) : (
        <button
          type="button"
          className={`${s.trigger} ${className ?? ""}`}
          aria-label={`Görseli büyüt: ${shot.alt}`}
          onClick={() => setOpen(true)}
        >
          <Image
            src={shot.src}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
            sizes={sizes}
            priority={priority}
            className={shot.kind === "screen" ? "shotScreen" : undefined}
          />
          <span className={s.hint} aria-hidden="true"><ZoomIcon /></span>
        </button>
      )}
      {open && (
        <dialog
          ref={dialogRef}
          className={s.dialog}
          aria-label={shot.alt}
          data-lenis-prevent
          onClose={() => setOpen(false)}
          onClick={(event) => {
            if (event.target === event.currentTarget) dialogRef.current?.close();
          }}
        >
          <button type="button" className={s.close} aria-label="Görseli kapat" onClick={() => dialogRef.current?.close()}>
            <CloseIcon />
          </button>
          <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes="100vw" quality={90} className={s.full} />
        </dialog>
      )}
    </>
  );
}
