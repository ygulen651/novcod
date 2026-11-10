import { about } from "@/content/site";
import { SystemMap } from "./SystemMap";
import s from "./Story.module.css";

export function Story() {
  return (
    <section className={s.section} id="hakkimizda" data-tone="light" aria-labelledby="hakkimizda-baslik">
      <SystemMap />

      <div className={`wrap ${s.grid}`}>
        <header className={s.head}>
          <p className="eyebrow">Hakkımızda</p>
          <h2 id="hakkimizda-baslik">Yazılımlarımızı kendimiz geliştiriyoruz.</h2>
        </header>
        <div className={s.body}>
          <p className={s.statement} data-fade>{about.statement}</p>
          <p className={s.vision} data-fade>{about.vision}</p>
          <dl className={s.values}>
            {about.values.map((value, index) => (
              <div key={value.title} className={s.value} data-fade>
                <dt>
                  <span className={`mono ${s.valueNum}`} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  {value.title}
                </dt>
                <dd>{value.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
