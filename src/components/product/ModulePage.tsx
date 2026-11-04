import Link from "next/link";
import { ContactSection } from "@/components/ContactSection";
import { JsonLd } from "@/components/JsonLd";
import { Zoomable } from "@/components/Zoomable";
import { VideoFacade } from "@/components/VideoFacade";
import { moduleHref, videos, type Module, type Product } from "@/content/products";
import { site } from "@/content/site";
import { Hat } from "./Hat";
import s from "./Product.module.css";

type Props = { product: Product; module: Module };

export function ModulePage({ product, module }: Props) {
  const { shot } = module;
  const isSupport = module.slug === "destek";

  return (
    <div data-hat={product.id}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Ana sayfa", item: site.url },
            { "@type": "ListItem", position: 2, name: product.name, item: `${site.url}${product.href}` },
            { "@type": "ListItem", position: 3, name: module.name, item: `${site.url}${moduleHref(product, module.slug)}` },
          ],
        }}
      />
      {module.faq && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: module.faq.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }}
        />
      )}

      <div className={`wrap ${s.moduleTop}`}>
        <nav aria-label="Sayfa yolu" className={s.crumbs}>
          <ol>
            <li><Link href="/">Ana sayfa</Link></li>
            <li><Link href={product.href}>{product.name}</Link></li>
            <li aria-current="page">{module.name}</li>
          </ol>
        </nav>
        <div className={s.moduleHead}>
          <h1>{module.name}</h1>
          <p className={s.lede}>{module.lede}</p>
        </div>
      </div>

      {shot && (
        <div className={`wrap ${s.moduleShot}`} data-kind={shot.kind} data-reveal>
          <Zoomable shot={shot} priority sizes="(min-width: 1080px) 1040px, 100vw" />
        </div>
      )}

      {isSupport && (
        <section className={`wrap ${s.support}`} aria-label="Destek kanalları">
          <a href={site.phoneHref} className={s.supportPhone}>{site.phone}</a>
          <dl>
            <div><dt>Hafta içi</dt><dd>09:00-23:00</dd></div>
            <div><dt>Hafta sonu</dt><dd>10:00-22:00</dd></div>
          </dl>
          {product.video && (
            <a href={`https://www.youtube.com/watch?v=${product.video.id}`} className="textLink" target="_blank" rel="noopener noreferrer">
              Kullanım videosunu izle
            </a>
          )}
        </section>
      )}

      {module.sections.length > 0 && (
        <div className={s.sectionsBand} data-tone="light">
         <div className={`wrap ${s.sections}`}>
          {module.sections.map((section) => (
            <section key={section.title} className={s.sectionRow}>
              <h2>{section.title}</h2>
              <div>
                {section.body && <p>{section.body}</p>}
                {section.items && (
                  <ul className={s.items}>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
         </div>
        </div>
      )}

      {module.faq && (
        <section className={`wrap ${s.faq}`} aria-labelledby="sss">
          <h2 id="sss">Sıkça sorulan sorular</h2>
          <div>
            {module.faq.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {product.id === "isletme" && (
        <section className={`wrap ${s.videoBand}`} aria-labelledby="modul-video">
          <h2 id="modul-video">{videos.moduller.title}</h2>
          <div><VideoFacade video={videos.moduller} /></div>
        </section>
      )}

      <section className={`wrap ${s.hatBand}`} aria-label={`${product.shortName} hattı`}>
        <Hat product={product} current={module.slug} label={`${product.shortName} içindeki diğer sayfalar`} />
      </section>

      <ContactSection title={`${module.name} hakkında görüşelim.`} defaultSubject={product.name} />
    </div>
  );
}
