"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { photos, shots, type Shot } from "@/content/products";
import { services } from "@/content/site";
import { Chevron } from "@/components/Icons";
import s from "./Services.module.css";

const VISUALS: Shot[] = [photos.chart, photos.team, shots.konferans];

function Composition({ index, sizes }: { index: number; sizes: string }) {
  const shot = VISUALS[index];
  return (
    <div className={s.main} data-comp-main>
      <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes={sizes} />
    </div>
  );
}

export function Services() {
  const [active, setActive] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const previous = useRef(0);

  useLayoutEffect(() => {
    if (previous.current === active) return;
    previous.current = active;
    const pane = stage.current?.querySelector(`[data-pane="${active}"]`);
    if (!pane || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-comp-main]",
        { clipPath: "inset(0% 100% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, ease: "power2.inOut", clearProps: "clipPath" },
      );
    }, pane);
    return () => ctx.revert();
  }, [active]);

  return (
    <section className={s.section} id="hizmetler" data-tone="light" aria-labelledby="hizmetler-baslik">
      <div className={`wrap ${s.grid}`}>
        <div className={s.left}>
          <h2 id="hizmetler-baslik">Hazır ürünlerin ötesinde bir ihtiyacınız varsa.</h2>
          <ul className={s.list}>
            {services.map((service, index) => {
              const open = index === active;
              return (
                <li key={service.name} className={s.row} data-open={open || undefined}>
                  <h3>
                    <button
                      type="button"
                      className={s.trigger}
                      aria-expanded={open}
                      aria-controls={`hizmet-${index}`}
                      id={`hizmet-buton-${index}`}
                      onClick={() => setActive(index)}
                    >
                      {service.name}
                      <Chevron size={20} />
                    </button>
                  </h3>
                  <div id={`hizmet-${index}`} role="region" aria-labelledby={`hizmet-buton-${index}`} className={s.panel}>
                    <div className={s.panelInner}>
                      <p className={s.need}>{service.need}</p>
                      <p className={s.body}>{service.body}</p>
                      <div className={s.mobileVisual}>{open && <Composition index={index} sizes="92vw" />}</div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <figure className={s.stage} ref={stage}>
          <div className={s.frame}>
            {services.map((service, index) => (
              <div key={service.name} className={s.pane} data-pane={index} data-active={index === active || undefined}>
                <Composition index={index} sizes="(min-width: 1024px) 56vw, 1px" />
              </div>
            ))}
          </div>
        </figure>
      </div>
    </section>
  );
}
