import { process } from "@/content/home";
import { AnchorLink } from "@/components/layout/AnchorLink";
import s from "./Process.module.css";

export function Process() {
  return (
    <section className={s.section} data-tone="light" aria-labelledby="surec-baslik">
      <div className="wrap">
        <header className={s.head}>
          <p className="eyebrow">Nasıl ilerliyoruz</p>
          <h2 id="surec-baslik" className={s.title}>İlk görüşmeden kullanıma, dört adım.</h2>
        </header>
        <ol className={s.steps}>
          <li className={s.rail} aria-hidden="true" role="presentation" />
          {process.map((step, index) => (
            <li key={step.title} className={s.step} data-fade style={{ "--fade-delay": `${index * 0.08}s` } as React.CSSProperties}>
              <span className={`mono ${s.num}`} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
        <p className={s.cta}>
          İlk adım için <AnchorLink id="iletisim" className="textLink">bize yazın</AnchorLink>
        </p>
      </div>
    </section>
  );
}
