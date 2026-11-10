import Link from "next/link";
import { products } from "@/content/products";
import { ArrowSwap } from "@/components/Icons";
import { ParticleMark } from "./ParticleMark";
import s from "./SystemMap.module.css";

/**
 * Hakkımızda bandı: ortada parçacıklardan oluşan Novcod işareti, çevresinde ona bağlı yazılımlar.
 * Geniş ekranda kartlar 1000×430'luk çizim alanındaki yüzde konumlarına yerleşir; hatlar bu konumlara göre çizilir.
 * Dar ekranda kartlar alt alta dizilir, hatlar gizlenir. Tüm rakam ve modül adları ürün verisinden gelir.
 */
const SLOT_BY_ID: Record<string, string> = { isletme: "a", bayi: "b", siparis: "c" };

const LINES = [
  "M380 215 H350 Q330 215 330 195 V83 Q330 63 310 63 H300",
  "M380 215 H350 Q330 215 330 235 V241 Q330 261 310 261 H300",
  "M620 215 H650 Q670 215 670 195 V83 Q670 63 690 63 H700",
  "M620 215 H650 Q670 215 670 235 V241 Q670 261 690 261 H700",
  "M500 95 V0",
  "M500 335 V430",
];
const PORTS: [number, number][] = [[300, 63], [300, 261], [700, 63], [700, 261]];

const liveModules = (p: (typeof products)[number]) => p.modules.filter((m) => !m.offLine);
const MODULE_COUNT = products.reduce((sum, p) => sum + liveModules(p).length, 0);

export function SystemMap() {
  return (
    <figure className={`hud ${s.map}`} data-tone="dark">
      <span className={`gridBg ${s.grid}`} aria-hidden="true" />
      <ParticleMark className={s.canvas} markX={0.5} markY={0.5} markSize={0.2} density={0.8} />

      <svg className={s.lines} viewBox="0 0 1000 430" aria-hidden="true">
        <circle cx="500" cy="215" r="120" className={s.ring} />
        <circle cx="500" cy="215" r="150" className={s.ringOuter} />
        {LINES.map((d, i) => (
          <g key={d}>
            <path d={d} className={s.line} />
            <path d={d} pathLength={1000} className={s.pulse} style={{ animationDelay: `${i * 0.6}s` }} />
          </g>
        ))}
        {PORTS.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="4" className={s.port} />
        ))}
      </svg>

      <ul className={s.nodes}>
        {products.map((product) => {
          const mods = liveModules(product);
          return (
            <li key={product.id} className={s.node} data-slot={SLOT_BY_ID[product.id]}>
              <Link href={product.href} className={s.card}>
                <span className={`mono ${s.path}`}>
                  <span className={s.led} aria-hidden="true" /> {product.id}/
                  <span className={s.count}>{mods.length} modül</span>
                </span>
                <span className={s.name}>
                  {product.shortName} <ArrowSwap />
                </span>
                <span className={`mono ${s.mods}`}>
                  {mods.slice(0, 3).map((m) => (
                    <span key={m.slug}>├ {m.name}</span>
                  ))}
                  {mods.length > 3 && <span>└ +{mods.length - 3} modül daha</span>}
                </span>
              </Link>
            </li>
          );
        })}
        <li className={`${s.node} ${s.term}`} data-slot="d">
          <span className={`mono ${s.termBody}`}>
            <span className={s.termHead}>
              <i /> <i /> <i />
            </span>
            <span><b>&gt;</b> novcod --durum</span>
            <span>yazılım <em>{products.length}</em></span>
            <span>modül <em>{MODULE_COUNT}</em></span>
            <span>erişim <em>web tabanlı</em></span>
            <span><b>&gt;</b> <span className={`blink ${s.caret}`} /></span>
          </span>
        </li>
      </ul>

      <figcaption className={`mono ${s.caption}`}>
        <span className={s.led} aria-hidden="true" /> novcod/sistem — {products.length} yazılım, tek altyapı
      </figcaption>
    </figure>
  );
}
