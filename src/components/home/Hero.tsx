"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { hero, paths } from "@/content/home";
import { getProduct, products, shots } from "@/content/products";
import { ScrambleText } from "@/components/motion/ScrambleText";
import { AnchorLink } from "@/components/layout/AnchorLink";
import { ArrowSwap, CheckIcon } from "@/components/Icons";
import { ParticleMark } from "./ParticleMark";
import s from "./Hero.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Sahnedeki üç konum: öndeki büyük ürün ve arkadaki iki küçük ürün.
 * Değerler sahne kutusuna göre yüzdedir; CSS'teki varsayılan yerleşimle aynıdır.
 */
const SLOTS = {
  front: { left: "14%", top: "20%", width: "72%", rotation: 0, opacity: 1, zIndex: 3 },
  back: { left: "-2%", top: "2%", width: "44%", rotation: -9, opacity: 0.85, zIndex: 1 },
  side: { left: "60%", top: "54%", width: "40%", rotation: 8, opacity: 0.9, zIndex: 2 },
} as const;

const MODULE_COUNT = products.reduce((sum, p) => sum + p.modules.filter((m) => !m.offLine).length, 0);

/**
 * Sahnenin arkasındaki devre hatları. Koordinatlar 1000×800'lük çizim alanındadır;
 * her hattın üzerinde ışık darbesi akar (CSS, hareket azaltma tercihinde durur).
 */
const TRACES = [
  "M0 180 H260 Q280 180 280 200 V300 Q280 320 300 320 H520",
  "M0 420 H180 Q200 420 200 440 V520 Q200 540 220 540 H560",
  "M1000 120 H820 Q800 120 800 140 V260 Q800 280 780 280 H660",
  "M1000 560 H860 Q840 560 840 580 V660 Q840 680 820 680 H600",
  "M420 800 V700 Q420 680 440 680 H560",
  "M640 0 V90 Q640 110 620 110 H460",
];
const NODES: [number, number][] = [[520, 320], [560, 540], [660, 280], [600, 680], [560, 680], [460, 110], [280, 200], [800, 140]];

/** Her adımda hangi ürünün hangi konumda olduğu (ürün sırası: İşletme, Sipariş, Bayi) */
const STEPS: (keyof typeof SLOTS)[][] = [
  ["front", "side", "back"],
  ["back", "front", "side"],
  ["side", "back", "front"],
];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1100px) and (prefers-reduced-motion: no-preference)", () => {
        const section = root.current;
        const inner = section?.querySelector<HTMLElement>("[data-inner]");
        const stage = section?.querySelector<HTMLElement>("[data-stage]");
        const items = gsap.utils.toArray<HTMLElement>("[data-item]", section);
        const landing = document.querySelector<HTMLElement>("[data-landing]");
        if (!section || !inner || !stage || items.length !== 3) return;
        // İç kutu menünün altına yapışır; sabitleme aralığı bu boşluğa göre hesaplanır.
        const stickyTop = () => parseFloat(getComputedStyle(inner).top) || 0;

        // 1) Sahne sabitken ürünler sırayla öne gelir.
        const rotate = gsap.timeline({
          defaults: { duration: 1, ease: "power2.inOut" },
          scrollTrigger: {
            trigger: section,
            start: () => `top top+=${stickyTop()}`,
            end: () => `+=${section.offsetHeight - inner.offsetHeight}`,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => setActive(self.progress < 0.38 ? 0 : self.progress < 0.72 ? 1 : 2),
          },
        });
        items.forEach((item, i) => gsap.set(item, SLOTS[STEPS[0][i]]));
        rotate.to({}, { duration: 0.35 });
        [1, 2].forEach((step) => {
          const at = rotate.duration();
          items.forEach((item, i) => {
            const { zIndex, ...slot } = SLOTS[STEPS[step][i]];
            rotate.to(item, slot, at);
            rotate.set(item, { zIndex }, at + 0.5);
          });
          rotate.to({}, { duration: 0.35 });
        });

        // 2) Sabitleme bitince ürün grubu aşağı iner ve bir sonraki bölümdeki yerine konar.
        if (landing) {
          // Sahnenin dönüşümsüz konumu, onu saran (dönüşüm almayan) kutudan hesaplanır.
          const wrap = stage.parentElement as HTMLElement;
          const measure = () => {
            const sectionTop = section.getBoundingClientRect().top + window.scrollY;
            const innerRect = inner.getBoundingClientRect();
            const wrapRect = wrap.getBoundingClientRect();
            // Sabitleme bittiğinde iç kutunun sayfadaki üst konumu
            const innerEndTop = sectionTop + section.offsetHeight - inner.offsetHeight;
            const stageLeft = wrapRect.left + window.scrollX + stage.offsetLeft;
            const stageEndTop = innerEndTop + (wrapRect.top - innerRect.top) + stage.offsetTop;
            const box = landing.getBoundingClientRect();
            return {
              x: box.left + window.scrollX - stageLeft,
              y: box.top + window.scrollY - stageEndTop,
              scale: box.width / stage.offsetWidth,
            };
          };
          gsap.to(stage, {
            x: () => measure().x,
            y: () => measure().y,
            scale: () => measure().scale,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: () => `bottom top+=${stickyTop() + inner.offsetHeight}`,
              endTrigger: landing,
              end: "center 60%",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });
        }
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className={s.hero} data-tone="dark" aria-labelledby="hero-baslik">
      <div className={s.inner} data-inner>
        <div className={s.backdrop} aria-hidden="true">
          <span className={`gridBg ${s.grid}`} />
          <ParticleMark className={s.canvas} showMark={false} />
          <span className={s.orbit} />
          <span className={`${s.orbit} ${s.orbitInner}`} />
        </div>

        <div className={`wrap ${s.content}`}>
          <div className={s.copy}>
            <p className={`mono ${s.badge}`}>
              <CheckIcon /> {hero.badge}
            </p>
            <h1 id="hero-baslik" className={s.title}>
              {hero.title} <ScrambleText text={hero.titleAccent} className={s.accent} />
            </h1>
            <p className={s.lede}>{hero.lede}</p>
            <div className={s.ctas}>
              <AnchorLink id="iletisim" className="btn btnPrimary">
                Projenizi konuşalım <ArrowSwap />
              </AnchorLink>
              <AnchorLink id="yazilimlar" className="btn btnGhost">Yazılımları inceleyin</AnchorLink>
            </div>
            <p className={`mono ${s.terminal}`}>
              <span className={s.prompt} aria-hidden="true">&gt;</span> web tabanlı · {products.length} yazılım · {MODULE_COUNT} modül
              <span className={`blink ${s.cursor}`} aria-hidden="true" />
            </p>
          </div>

          <div className={s.stageWrap}>
            {/* Devre hatları yalnızca ürün sahnesinin arkasında: hiçbir genişlikte metnin üstüne gelmez. */}
            <svg className={s.traces} aria-hidden="true" viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid slice">
              {TRACES.map((d, i) => (
                <g key={d}>
                  <path d={d} className={s.trace} />
                  <path d={d} pathLength={1000} className={s.pulse} style={{ animationDelay: `${i * 0.7}s` }} />
                </g>
              ))}
              {NODES.map(([cx, cy]) => (
                <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" className={s.node} />
              ))}
            </svg>
            <div className={s.stage} data-stage>
              <figure className={s.item} data-item data-slot="front">
                <div className={s.monitor}>
                  <Image src={shots.organizer.src} alt={shots.organizer.alt} width={shots.organizer.width} height={shots.organizer.height} sizes="(min-width: 1100px) 460px, 70vw" loading="eager" fetchPriority="high" />
                </div>
                <span className={s.stand} />
              </figure>
              <figure className={s.item} data-item data-slot="side">
                <Image src={shots.tabletSiparis.src} alt={shots.tabletSiparis.alt} width={shots.tabletSiparis.width} height={shots.tabletSiparis.height} sizes="(min-width: 1100px) 460px, 70vw" className={s.device} />
              </figure>
              <figure className={s.item} data-item data-slot="back">
                <div className={s.laptop}>
                  <Image src={shots.stok.src} alt={shots.stok.alt} width={shots.stok.width} height={shots.stok.height} sizes="(min-width: 1100px) 460px, 70vw" />
                </div>
                <span className={s.base} />
              </figure>
            </div>
          </div>
        </div>

        <nav className={s.paths} aria-label="İhtiyacınıza göre yazılım seçin">
          <ul>
            {paths.map((path, index) => {
              const product = getProduct(path.id);
              return (
                <li key={path.id}>
                  <Link href={product.href} className={s.path} data-current={active === index || undefined}>
                    <span className={`mono ${s.pathNum}`} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <span className={s.need}>{path.need}</span>
                    <span className={s.pathName}>
                      {product.shortName} <ArrowSwap />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </section>
  );
}
