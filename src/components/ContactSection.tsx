import { site } from "@/content/site";
import { ContactForm } from "./ContactForm";
import s from "./Contact.module.css";

type Props = {
  title?: string;
  defaultSubject?: string;
};

export function ContactSection({
  title = "İşiniz için doğru yazılımı birlikte belirleyelim.",
  defaultSubject,
}: Props) {
  const backendReady = Boolean(process.env.CONTACT_WEBHOOK_URL);
  return (
    <section className={s.section} id="iletisim" aria-labelledby="iletisim-baslik">
      <div className={`wrap ${s.grid}`}>
        <div className={s.intro}>
          <h2 id="iletisim-baslik">{title}</h2>
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
