import { about } from "@/content/site";
import s from "./About.module.css";

export function About() {
  return (
    <section className={s.section} id="hakkimizda" data-tone="light" aria-labelledby="hakkimizda-baslik">
      <div className="wrap">
        <h2 id="hakkimizda-baslik" className={s.statement}>{about.statement}</h2>
        <div className={s.side}>
          <p className={s.vision}>{about.vision}</p>
          <dl className={s.values}>
            {about.values.map((value) => (
              <div key={value.title}>
                <dt>{value.title}</dt>
                <dd>{value.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
