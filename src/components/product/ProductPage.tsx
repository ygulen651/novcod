import Link from "next/link";
import { ContactSection } from "@/components/ContactSection";
import { ArrowRight } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { VideoFacade } from "@/components/VideoFacade";
import { Zoomable } from "@/components/Zoomable";
import { AnchorLink } from "@/components/layout/AnchorLink";
import { moduleHref, type Product } from "@/content/products";
import { site } from "@/content/site";
import { Flow, Hat } from "./Hat";
import s from "./Product.module.css";

export function ProductPage({ product }: { product: Product }) {
  const [lead, ...rest] = product.gallery;
  const bySlug = (slug: string) => product.modules.find((m) => m.slug === slug)!;

  return (
    <div data-hat={product.id}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: product.name,
          applicationCategory: product.category,
          operatingSystem: "Web",
          url: `${site.url}${product.href}`,
          description: product.seoDescription,
          publisher: { "@type": "Organization", name: site.name, url: site.url },
        }}
      />

      <section className={s.hero} data-kind={product.shot.kind}>
        <div className={s.heroCopy}>
          <h1>{product.name}</h1>
          <p className={s.lede}>{product.lede}</p>
          <div className={s.ctas}>
            <AnchorLink id="iletisim" className="btn btnPrimary">Projenizi konuşalım</AnchorLink>
            {product.video && <AnchorLink id="video" className="btn btnGhost">Tanıtım filmini izle</AnchorLink>}
          </div>
        </div>
        <div className={s.heroVisual} data-reveal>
          <Zoomable shot={product.shot} priority sizes="(min-width: 1240px) 1200px, 100vw" />
        </div>
      </section>

      <section className={`wrap ${s.hatBand}`} aria-label="Modüller">
        <Hat product={product} />
      </section>

      <section className={`wrap ${s.advantages}`} aria-labelledby="neden">
        <h2 id="neden" className={s.visuallyHidden}>Öne çıkanlar</h2>
        <dl>
          {product.advantages.map((item) => (
            <div key={item.title}>
              <dt>{item.title}</dt>
              <dd>{item.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      {product.video && (
        <section className={`wrap ${s.videoBand}`} id="video" aria-labelledby="video-baslik">
          <h2 id="video-baslik">{product.video.title}</h2>
          <div><VideoFacade video={product.video} /></div>
        </section>
      )}

      {product.flow && (
        <section className={s.flowBand} data-tone="light" aria-labelledby="akis">
          <div className="wrap">
            <h2 id="akis">{product.flow.title}</h2>
            <div className={s.flowBody}><Flow product={product} /></div>
          </div>
        </section>
      )}

      <section className={s.groupsBand} data-tone="light" aria-labelledby="moduller">
       <div className={`wrap ${s.groups}`}>
        <h2 id="moduller">{product.id === "siparis" ? "Çözümler" : "Modüller"}</h2>
        <div className={s.groupList}>
          {product.groups.map((group) => (
            <div key={group.title} className={s.group}>
              <div>
                <h3>{group.title}</h3>
                <p>{group.note}</p>
              </div>
              <ul>
                {group.slugs.map((slug) => {
                  const item = bySlug(slug);
                  return (
                    <li key={slug}>
                      <Link href={moduleHref(product, slug)} className={s.moduleLink}>
                        <span>
                          <strong>{item.name}</strong>
                          <small>{item.summary}</small>
                        </span>
                        <ArrowRight />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
       </div>
      </section>

      <section className={s.gallery} aria-labelledby="ekranlar">
        <div className="wrap">
          <h2 id="ekranlar">Ürün ekranları</h2>
          <div className={s.galleryGrid}>
            {[lead, ...rest].map((item, index) => (
              <figure key={item.shot.src} className={index === 0 ? s.galleryLead : undefined} data-kind={item.shot.kind} data-reveal>
                <Zoomable
                  shot={item.shot}
                  sizes={index === 0 ? "(min-width: 1024px) 62vw, 100vw" : "(min-width: 1024px) 34vw, 100vw"}
                />
                <figcaption>{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {product.quotes && (
        <section className={`wrap ${s.quotes}`} aria-label="Kullanıcı görüşleri">
          {product.quotes.map((quote) => (
            <figure key={quote.source}>
              <blockquote>{quote.text}</blockquote>
              <figcaption>{quote.source}</figcaption>
            </figure>
          ))}
        </section>
      )}

      <ContactSection title={`${product.shortName} için görüşelim.`} defaultSubject={product.name} />
    </div>
  );
}
