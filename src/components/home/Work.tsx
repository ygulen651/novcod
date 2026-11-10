import Image from "next/image";
import Link from "next/link";
import { getProduct, shots, type ProductId, type Shot } from "@/content/products";
import s from "./Work.module.css";

type Item = { product: ProductId; slug: string; shot: Shot };

const ITEMS: Item[] = [
  { product: "isletme", slug: "organizer", shot: shots.organizer },
  { product: "siparis", slug: "qr-menu", shot: shots.phoneStage },
  { product: "bayi", slug: "siparis-sevk", shot: shots.sevk },
  { product: "isletme", slug: "finans", shot: shots.finans },
];

/** Gerçek modül ekranları; her biri kendi modül sayfasına götürür. */
export function Work() {
  return (
    <section className={s.section} data-tone="light" aria-labelledby="ekranlar-baslik">
      <div className="wrap">
        <header className={s.head}>
          <h2 id="ekranlar-baslik" className="eyebrow">Ekranlardan</h2>
          <p className={s.lede}>Yazılımlarımızdan gerçek ekranlar. Her modülün ne yaptığını kendi sayfasında inceleyin.</p>
        </header>
        <ul className={s.grid}>
          {ITEMS.map((item, index) => {
            const product = getProduct(item.product);
            const mod = product.modules.find((m) => m.slug === item.slug);
            if (!mod) return null;
            return (
              <li key={item.slug} data-fade style={{ "--fade-delay": `${(index % 2) * 0.08}s` } as React.CSSProperties}>
                <Link href={`${product.href}/${mod.slug}`} className={s.item} data-kind={item.shot.kind}>
                  <span className={`hud ${s.media}`}>
                    <Image src={item.shot.src} alt={item.shot.alt} width={item.shot.width} height={item.shot.height} sizes="(min-width: 900px) 620px, calc(100vw - 32px)" />
                  </span>
                  <span className={s.meta}>
                    <span className={`mono ${s.num}`}>[{String(index + 1).padStart(2, "0")}] {product.shortName.replace("Novcod ", "").toLocaleLowerCase("tr")}/{mod.slug}</span>
                    <span className={s.arrow} aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 5l10 10M15 7v8H7" /></svg>
                    </span>
                  </span>
                  <span className={s.name}>{mod.name}</span>
                  <span className={s.category}>{product.shortName}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
