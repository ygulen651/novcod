import { benefits } from "@/content/home";
import { products } from "@/content/products";
import { services } from "@/content/site";
import { CountUp } from "@/components/motion/CountUp";
import s from "./Benefits.module.css";

const COUNTS: Record<string, number> = {
  products: products.length,
  modules: products.reduce((sum, product) => sum + product.modules.filter((m) => !m.offLine).length, 0),
  services: services.length,
};

export function Benefits() {
  return (
    <section className={s.section} data-tone="dark" aria-labelledby="faydalar-baslik">
      <span className={`gridBg ${s.grid}`} aria-hidden="true" />
      <div className={`wrap ${s.wrap}`}>
        <header className={s.head}>
          <div className={s.headCopy}>
            <p className="eyebrow">Neden Novcod</p>
            <h2 id="faydalar-baslik" className={s.title}>Dağınık programlar yerine tek bir düzen.</h2>
            <p className={s.intro}>
              İşletme, restoran ve bayi süreçlerinizi ayrı ayrı araçlarla değil, işinizi bilen tek bir yazılımla yönetin.
            </p>
          </div>
          {/* Açılıştaki ürün grubu kaydırınca buraya iner (yalnızca geniş ekranda). */}
          <div className={s.landing} data-landing aria-hidden="true" />
        </header>
        <ul className={s.list}>
          {benefits.map((item, index) => (
            <li key={item.title} className={s.item} data-fade style={{ "--fade-delay": `${index * 0.07}s` } as React.CSSProperties}>
              <p className={`mono ${s.index}`} aria-hidden="true">[{String(index + 1).padStart(2, "0")}]</p>
              <p className={`mono ${s.figure}`}>
                {item.figure in COUNTS ? <CountUp value={COUNTS[item.figure]} /> : item.figure}
                <span className={s.unit}>{item.unit}</span>
              </p>
              <h3 className={s.itemTitle}>{item.title}</h3>
              <p className={s.body}>{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
