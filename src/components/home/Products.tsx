import Image from "next/image";
import Link from "next/link";
import { getProduct, shots, type ProductId, type Shot } from "@/content/products";
import s from "./Products.module.css";

type Card = { id: ProductId; word: string; shot: Shot };

const CARDS: Card[] = [
  { id: "isletme", word: "İşletme", shot: shots.organizer },
  { id: "siparis", word: "Sipariş", shot: shots.tabletCift },
  { id: "bayi", word: "Bayi", shot: shots.stok },
];

export function Products() {
  return (
    <section className={s.section} id="yazilimlar" data-tone="dark" aria-labelledby="yazilimlar-baslik">
      <div className={`wrap ${s.grid}`}>
        <header className={s.intro}>
          <h2 id="yazilimlar-baslik" className="eyebrow">Yazılımlarımız</h2>
          <p className={s.lede}>
            Üç iş alanı, her biri için ayrı bir yazılım. Her biri kendi alanının işlerini baştan sona yürütür; ihtiyacınız olan modülleri seçer, işinize göre uyarlarız.
          </p>
        </header>

        <ol className={s.stack}>
          {CARDS.map((card, index) => {
            const product = getProduct(card.id);
            const moduleCount = product.modules.filter((m) => !m.offLine).length;
            return (
              <li key={card.id} className={s.slot} style={{ "--i": index } as React.CSSProperties}>
                <Link href={product.href} className={s.card} data-kind={card.shot.kind}>
                  <div className={s.cardHead}>
                    <h3 className={s.word}>
                      {card.word}<span className={s.dot}>.</span>
                    </h3>
                    <span className={s.arrow} aria-hidden="true">
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 16 16 6M8 6h8v8" /></svg>
                    </span>
                  </div>
                  <p className={`mono ${s.sub}`}>
                    <span className={s.subIdx} aria-hidden="true">0{index + 1}</span> {product.name} <span aria-hidden="true">/</span> {moduleCount} modül
                  </p>
                  <div className={`hud ${s.shot}`}>
                    <Image src={card.shot.src} alt={card.shot.alt} width={card.shot.width} height={card.shot.height} sizes="(min-width: 1100px) 560px, calc(100vw - 64px)" />
                  </div>
                  <p className={s.benefit}>{product.benefit}</p>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
