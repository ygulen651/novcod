import { products } from "@/content/products";
import s from "./Faq.module.css";

/** Ürün verisindeki modül SSS'leri tek listede toplanır; yeni eklenen sorular burada da görünür. */
const ITEMS = products.flatMap((product) =>
  product.modules.flatMap((module) => (module.faq ?? []).map((item) => ({ ...item, product: product.shortName }))),
);

export function Faq() {
  if (ITEMS.length === 0) return null;
  return (
    <section className={`panel ${s.section}`} data-tone="light" aria-labelledby="sss-baslik">
      <span className="gridBg gridLayer" aria-hidden="true" />
      <div className={s.inner}>
        <header className={s.head}>
          <p className="eyebrow">SSS</p>
          <h2 id="sss-baslik" className={s.title}>Sıkça sorulan sorular</h2>
        </header>
        <div className={s.list}>
          {ITEMS.map((item, index) => (
            <details key={item.q} className={s.item} open={index === 0}>
              <summary className={s.question}>
                <span className={`mono ${s.qNum}`} aria-hidden="true">Q.{String(index + 1).padStart(2, "0")}</span>
                <span className={s.qText}>
                  <small className={`mono ${s.tag}`}>[{item.product}]</small>
                  {item.q}
                </span>
                <span className={s.icon} aria-hidden="true" />
              </summary>
              <p className={s.answer}>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
