"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { photos } from "@/content/products";
import { AnchorLink } from "@/components/layout/AnchorLink";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { HeroVideo } from "./HeroVideo";
import s from "./Hero.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      delete document.documentElement.dataset.intro;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-intro-item='copy']",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.5, stagger: 0.1, ease: "power3.out", clearProps: "transform" },
        );
        // Film kaydırmayla ekrandan çerçeveye çekilir.
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.4 },
        });
        tl.fromTo("[data-frame]", { clipPath: "inset(0% 0% 0% 0% round 0px)" }, { clipPath: "inset(7% 6% 7% 6% round 28px)" }, 0)
          .to("[data-hero-content]", { opacity: 0, y: -48, duration: 0.5 }, 0);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section className={s.hero} ref={root} aria-label="Novcod Yazılım Teknolojileri">
      <div className={s.frame} data-frame>
        <Image src={photos.meetingRoom.src} alt="" fill priority sizes="100vw" className={s.photo} />
        <HeroVideo />
        <span className={s.shade} aria-hidden="true" />
      </div>
      <div className={s.content} data-hero-content>
        <div data-intro-item="title">
          <SplitHeading text="İşinizin tüm parçaları, aynı sistemde." className={s.title} delay={0.1} duration={1.1} />
        </div>
        <p className={s.lede} data-intro-item="copy">
          İşletme, restoran ve bayi süreçleri için web tabanlı yazılımlar.
        </p>
        <div className={s.ctas} data-intro-item="copy">
          <AnchorLink id="yazilimlar" className="btn btnPrimary">Yazılımları keşfet</AnchorLink>
          <AnchorLink id="videolar" className={s.filmLink}>Filmi izle</AnchorLink>
        </div>
      </div>
    </section>
  );
}
