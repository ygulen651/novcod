"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { moduleHref, type Product, type Shot } from "@/content/products";
import { Zoomable } from "@/components/Zoomable";
import s from "./ProductStory.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type StoryStep = {
  title: string;
  body: string;
  shot?: Shot;
  /** Görsel yerine gösterilecek şema */
  diagram?: ReactNode;
  fit: "photo" | "phone" | "device" | "screen" | "diagram";
};

type Props = {
  product: Product;
  steps: StoryStep[];
  links: string[];
  /** Ekran görüntüleri için daha geniş görsel kolonu */
  wide?: boolean;
};

function Visual({ step, sizes, decorative }: { step: StoryStep; sizes: string; decorative?: boolean }) {
  if (step.diagram) return <>{step.diagram}</>;
  const { shot } = step;
  if (!shot) return null;
  return (
    <Image
      src={shot.src}
      alt={decorative ? "" : shot.alt}
      width={shot.width}
      height={shot.height}
      sizes={sizes}
      className={step.fit === "screen" ? "shotScreen" : undefined}
    />
  );
}

/** Ürünün iş akışı adım adım anlatılır: masaüstünde görsel sabit kalır, adımlar kaydıkça değişir. */
export function ProductStory({ product, steps, links, wide }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-step]").forEach((step, index) => {
          ScrollTrigger.create({
            trigger: step,
            start: "top 60%",
            end: "bottom 60%",
            onToggle: (self) => {
              if (self.isActive) setActive(index);
            },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div className={`wrap ${s.story}`} ref={root}>
      <div className={s.grid} data-wide={wide || undefined}>
        <ol className={s.steps}>
          {steps.map((step, index) => (
            <li key={step.title} className={s.step} data-step data-active={index === active || undefined}>
              <div className={s.inline} data-fit={step.fit}>
                <Visual step={step} sizes="92vw" />
              </div>
              <span className={s.number} aria-hidden="true">{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              {step.fit === "screen" && step.shot && <Zoomable shot={step.shot} sizes="100vw" label="Ekranı büyüt" />}
            </li>
          ))}
        </ol>
        <div className={s.stick} aria-hidden="true">
          <div className={s.stage}>
            {steps.map((step, index) => (
              <div key={step.title} className={s.slide} data-fit={step.fit} data-active={index === active || undefined}>
                <Visual step={step} sizes="(min-width: 1024px) 760px, 1px" decorative />
              </div>
            ))}
          </div>
        </div>
      </div>
      <ul className={s.links} aria-label={`${product.shortName} modülleri`}>
        {links.map((slug) => {
          const item = product.modules.find((module) => module.slug === slug)!;
          return (
            <li key={slug}><Link href={moduleHref(product, slug)}>{item.name}</Link></li>
          );
        })}
      </ul>
    </div>
  );
}
