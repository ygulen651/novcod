import Image from "next/image";
import Link from "next/link";
import { products } from "@/content/products";
import { site } from "@/content/site";
import { AnchorLink } from "./AnchorLink";
import s from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={s.footer} data-tone="light">
      <div className={`wrap ${s.grid}`}>
        <div className={s.brand}>
          <Image src="/images/logo-dark.png" alt="Novcod Software logosu" width={774} height={200} sizes="150px" className={s.logo} />
          <p>Firma ve kurumların ihtiyaçlarına yenilikçi ve özgün yazılım çözümleri sunuyoruz.</p>
        </div>
        <nav aria-label="Yazılımlarımız">
          <h2 className={s.title}>Yazılımlarımız</h2>
          <ul>
            {products.map((product) => (
              <li key={product.id}><Link href={product.href}>{product.name}</Link></li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Kurumsal">
          <h2 className={s.title}>Kurumsal</h2>
          <ul>
            <li><AnchorLink id="hizmetler">Hizmetlerimiz</AnchorLink></li>
            <li><AnchorLink id="hakkimizda">Hakkımızda</AnchorLink></li>
            <li><AnchorLink id="iletisim">İletişim</AnchorLink></li>
          </ul>
        </nav>
        <div>
          <h2 className={s.title}>İletişim</h2>
          <ul>
            <li><a href={site.phoneHref}>{site.phone}</a></li>
            <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li>{site.country}</li>
          </ul>
        </div>
      </div>
      <p className={`wrap ${s.wordmark}`} aria-hidden="true">
        Novcod<span>.</span>
      </p>
      <div className={`wrap ${s.bottom}`}>
        <p>© Novcod Software. Tüm hakları saklıdır.</p>
        <ul className={s.social}>
          {site.social.map((item) => (
            <li key={item.href}>
              <a href={item.href} target="_blank" rel="noopener noreferrer">{item.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
