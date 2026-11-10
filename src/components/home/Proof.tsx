import { getProduct, videos } from "@/content/products";
import { VideoFacade } from "@/components/VideoFacade";
import { ParticleMark } from "./ParticleMark";
import s from "./Proof.module.css";

/** Yalnızca kaynak sitede yayımlanmış kullanıcı görüşleri ve Novcod'un kendi tanıtım filmleri kullanılır. */
export function Proof() {
  const quotes = getProduct("siparis").quotes ?? [];
  return (
    <section className={`panel ${s.section}`} id="videolar" data-tone="dark" aria-labelledby="sahadan-baslik">
      <span className={`gridBg gridLayer`} aria-hidden="true" />
      <ParticleMark className="gridLayer" showMark={false} density={0.6} />
      <div className={`wrap ${s.content}`}>
        <header className={s.head}>
          <p className="eyebrow">Sahadan</p>
          <h2 id="sahadan-baslik">Yazılımlarımızı çalışırken görün.</h2>
        </header>

        <div className={s.films}>
          <figure className={s.filmMain}>
            <VideoFacade video={videos.siparis} sizes="(min-width: 1024px) 820px, calc(100vw - 32px)" />
            <figcaption><span className={`mono ${s.capNum}`} aria-hidden="true">▶ 01</span>{videos.siparis.title}</figcaption>
          </figure>
          <figure>
            <VideoFacade video={videos.isletme} sizes="(min-width: 1024px) 420px, calc(100vw - 32px)" />
            <figcaption><span className={`mono ${s.capNum}`} aria-hidden="true">▶ 02</span>{videos.isletme.title}</figcaption>
          </figure>
          <figure>
            <VideoFacade video={videos.moduller} sizes="(min-width: 1024px) 420px, calc(100vw - 32px)" />
            <figcaption><span className={`mono ${s.capNum}`} aria-hidden="true">▶ 03</span>{videos.moduller.title}</figcaption>
          </figure>
        </div>

        {quotes.length > 0 && (
          <div className={s.quotes}>
            <p className={`mono ${s.quotesLabel}`}>Novcod Sipariş kullanıcıları anlatıyor</p>
            {quotes.map((quote) => (
              <figure key={quote.source} className={s.quote} data-fade>
                <blockquote>
                  <p>“{quote.text}”</p>
                </blockquote>
                <figcaption>{quote.source}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
