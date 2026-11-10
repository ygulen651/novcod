"use client";

import { useEffect, useRef } from "react";

type Particle = {
  /** Logo üzerindeki hedef konum, -1..1 aralığında */
  tx: number;
  ty: number;
  /** Derinlik: dönüşte ön/arka hissi verir */
  tz: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
};

type Dust = { x: number; y: number; vx: number; vy: number; a: number; color: string };

const SOURCE = "/images/logo-light.png";
/** Logonun sol tarafındaki işaret: kaynak görselin genişliğine oranla */
const MARK_RIGHT = 0.19;

/**
 * Novcod logo işaretini parçacıklarla çizer. İşaret yavaşça döner, imleç yaklaşınca parçacıklar dağılır.
 * Hareket azaltma tercihinde tek kare çizilir. Görünür alanda değilken ve sekme gizliyken çizim durur.
 */
type Props = {
  className?: string;
  showMark?: boolean;
  /** İşaretin merkezi, alanın genişlik/yüksekliğine oranla. Verilmezse açılıştaki yerleşim kullanılır. */
  markX?: number;
  markY?: number;
  /** İşaretin boyutu, kısa kenara oranla */
  markSize?: number;
  /** Toz yoğunluğu çarpanı (1 = varsayılan) */
  density?: number;
};

export function ParticleMark({ className, showMark = true, markX, markY, markSize, density = 1 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let particles: Particle[] = [];
    let dust: Dust[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let visible = true;
    let start = performance.now();
    const pointer = { x: -9999, y: -9999 };

    const sample = (img: HTMLImageElement) => {
      const sw = Math.round(img.naturalWidth * MARK_RIGHT);
      const sh = img.naturalHeight;
      const off = document.createElement("canvas");
      off.width = sw;
      off.height = sh;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return [];
      octx.drawImage(img, 0, 0);
      const data = octx.getImageData(0, 0, sw, sh).data;

      // İşaretin sınırlarını bul, hedefleri merkeze göre -1..1 aralığına taşı.
      let minX = sw, minY = sh, maxX = 0, maxY = 0;
      for (let y = 0; y < sh; y++) {
        for (let x = 0; x < sw; x++) {
          if (data[(y * sw + x) * 4 + 3] > 140) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }
      const span = Math.max(maxX - minX, maxY - minY) || 1;
      const cx = (minX + maxX) / 2;
      const cy = (minY + maxY) / 2;
      const small = window.innerWidth < 768;
      const step = small ? 2 : 1;
      const keep = small ? 0.5 : 0.62;
      const list: Particle[] = [];
      for (let y = minY; y <= maxY; y += step) {
        for (let x = minX; x <= maxX; x += step) {
          const i = (y * sw + x) * 4;
          if (data[i + 3] < 140 || Math.random() > keep) continue;
          const r = data[i], g = data[i + 1], b = data[i + 2];
          const light = r > 200 && g > 200 && b > 200;
          const tx = ((x - cx) / span) * 2 + (Math.random() - 0.5) * 0.012;
          const ty = ((y - cy) / span) * 2 + (Math.random() - 0.5) * 0.012;
          list.push({
            tx,
            ty,
            tz: (Math.random() - 0.5) * 0.18,
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            color: light ? "255,255,255" : `${r},${g},${b}`,
            size: Math.random() < 0.08 ? 1.6 : 1,
          });
        }
      }
      return list;
    };

    const makeDust = () => {
      const count = Math.round(((width * height) / 9000) * density);
      dust = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
        a: 0.15 + Math.random() * 0.45,
        color: Math.random() < 0.3 ? "54,169,240" : "255,255,255",
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeDust();
    };

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, width, height);

      for (const d of dust) {
        if (!reduced) {
          d.x = (d.x + d.vx + width) % width;
          d.y = (d.y + d.vy + height) % height;
        }
        ctx.fillStyle = `rgba(${d.color},${d.a})`;
        ctx.fillRect(d.x, d.y, 1.2, 1.2);
      }

      // İşaret, alanın ortasında kısa kenarın yaklaşık yarısı boyutunda durur.
      const wide = width >= 1100;
      const scale = Math.min(width, height) * (markSize ?? (wide ? 0.2 : 0.24));
      const ox = width * (markX ?? (wide ? 0.47 : 0.5));
      const oy = height * (markY ?? (wide ? 0.36 : 0.24));
      const angle = reduced ? 0.25 : Math.sin(t * 0.45) * 0.55;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const tilt = reduced ? 0 : Math.sin(t * 0.3) * 0.08;

      for (const p of particles) {
        // Y ekseni etrafında dönüş: x ve z karışır, perspektif boyutu ve parlaklığı değiştirir.
        const rx = p.tx * cos - p.tz * sin;
        const rz = p.tx * sin + p.tz * cos;
        const persp = 1 / (1.6 - rz * 0.6);
        const goalX = ox + rx * scale * persp * 1.6;
        const goalY = oy + (p.ty + rx * tilt) * scale * persp * 1.6;

        if (reduced) {
          p.x = goalX;
          p.y = goalY;
        } else {
          // Hedefe yay benzeri çekim, imleçten itme.
          const px = p.x;
          const py = p.y;
          let ax = (goalX - px) * 0.045;
          let ay = (goalY - py) * 0.045;
          const dx = px - pointer.x;
          const dy = py - pointer.y;
          const dist2 = dx * dx + dy * dy;
          const radius = 110;
          if (dist2 < radius * radius) {
            const dist = Math.sqrt(dist2) || 1;
            const force = (1 - dist / radius) * 6;
            ax += (dx / dist) * force;
            ay += (dy / dist) * force;
          }
          p.vx = (p.vx + ax) * 0.82;
          p.vy = (p.vy + ay) * 0.82;
          p.x = px + p.vx;
          p.y = py + p.vy;
        }

        const alpha = 0.55 + rz * 1.6;
        ctx.fillStyle = `rgba(${p.color},${Math.min(1, Math.max(0.25, alpha))})`;
        const size = p.size * (0.8 + persp * 0.5);
        ctx.fillRect(p.x, p.y, size, size);
      }
    };

    const loop = (now: number) => {
      draw(now);
      frame = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };

    const play = () => {
      if (reduced) {
        draw(performance.now());
        return;
      }
      if (!frame && visible && !document.hidden) frame = requestAnimationFrame(loop);
    };

    // Yalnızca toz isteniyorsa logo yüklenmez.
    if (!showMark) {
      resize();
      play();
    }
    const img = new Image();
    img.decoding = "async";
    if (showMark) img.src = SOURCE;
    img.onload = () => {
      particles = sample(img);
      start = performance.now();
      resize();
      // Giriş: parçacıklar alana dağılmış başlar ve işarette toplanır.
      for (const p of particles) {
        p.x = Math.random() * width;
        p.y = Math.random() * height;
      }
      play();
    };

    const onResize = () => {
      resize();
      if (reduced) draw(performance.now());
    };
    const onPointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const onVisibility = () => play();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      play();
    });
    io.observe(canvas);
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [showMark, markX, markY, markSize, density]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
