import { services } from "@/content/site";
import { AnchorLink } from "@/components/layout/AnchorLink";
import { ArrowSwap } from "@/components/Icons";
import s from "./Services.module.css";

export function Services() {
  return (
    <section className={s.section} id="hizmetler" data-tone="dark" aria-labelledby="hizmetler-baslik">
      <span className={`gridBg ${s.grid}`} aria-hidden="true" />
      <div className={`wrap ${s.wrap}`}>
        <header className={s.head}>
          <p className="eyebrow">Hizmetlerimiz</p>
          <h2 id="hizmetler-baslik" className={s.title}>Hazır yazılım yetmediğinde, size özel geliştiriyoruz.</h2>
        </header>
        <ol className={s.list}>
          {services.map((service, index) => (
            <li key={service.name} className={s.row} data-fade>
              <span className={`mono ${s.num}`} aria-hidden="true">[{String(index + 1).padStart(2, "0")}]</span>
              <h3 className={s.name}>{service.name}</h3>
              <div className={s.text}>
                <p className={s.need}>{service.need}</p>
                <p className={s.body}>{service.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <AnchorLink id="iletisim" className={`btn btnPrimary ${s.cta}`}>
          Projenizi konuşalım <ArrowSwap />
        </AnchorLink>
      </div>
    </section>
  );
}
