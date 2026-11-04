import { VideoFacade } from "@/components/VideoFacade";
import { videos } from "@/content/products";
import s from "./Videos.module.css";

export function Videos() {
  return (
    <section className={s.section} id="videolar" aria-labelledby="videolar-baslik">
      <div className="wrap">
        <h2 id="videolar-baslik">Filmde izleyin.</h2>
        <div className={s.grid}>
          {[videos.isletme, videos.siparis].map((video) => (
            <figure key={video.id}>
              <VideoFacade video={video} />
              <figcaption>{video.title}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
