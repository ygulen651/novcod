import { site } from "@/content/site";
import { ContactForm } from "./ContactForm";
import { ParticleMark } from "./home/ParticleMark";
import s from "./Contact.module.css";

type Props = {
  title?: string;
  defaultSubject?: string;
};

export function ContactSection({
  title,
  defaultSubject,
}: Props) {
  const backendReady = Boolean(process.env.CONTACT_WEBHOOK_URL);
  return (
    <section className={`panel ${s.section}`} id="iletisim" data-tone="dark" aria-labelledby="iletisim-baslik">
      <span className="gridBg gridLayer" aria-hidden="true" />
      <ParticleMark className="gridLayer" showMark={false} />
      <div className={`wrap ${s.grid}`}>
        <div className={s.intro}>
          <p className="eyebrow">İletişim</p>
          <h2 id="iletisim-baslik" className={s.title}>
            {title ?? (
              <>
                <span className={s.titleMuted}>İşinize uyan yazılımı</span> birlikte belirleyelim.
              </>
            )}
          </h2>
          <p className={s.lede}>İhtiyacınızı kısaca yazın ya da doğrudan bize ulaşın.</p>
          <ul className={s.channels}>
            <li><a href={site.phoneHref}>{site.phone}</a></li>
            <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
          </ul>
          <p className={s.country}>{site.country}</p>
        </div>
        <ContactForm backendReady={backendReady} defaultSubject={defaultSubject} />
      </div>
    </section>
  );
}
