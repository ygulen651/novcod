import Link from "next/link";
import type { ReactNode } from "react";
import { getProduct, photos, shots, type Product } from "@/content/products";
import { BayiNetwork } from "./BayiNetwork";
import { ProductStory, type StoryStep } from "./ProductStory";
import s from "./Chapters.module.css";

const ISLETME_STEPS: StoryStep[] = [
  {
    title: "Günün işleri tek ekranda.",
    body: "Yapılacaklar, ajanda, fihrist ve ziyaretçi kaydı Organizer'da bir arada. Hatırlatmalar bildirim ve SMS ile gelir.",
    shot: shots.organizer,
    fit: "screen",
  },
  {
    title: "Görevler atanır, takip edilir.",
    body: "Görevlendirmeleri tek ekrandan yapar, işin ilerleyişini anlık izlersiniz. Gecikmeler için bildirim alırsınız.",
    shot: shots.isSurec,
    fit: "screen",
  },
  {
    title: "Satın alma tekliften siparişe yürür.",
    body: "Tedarikçiler online teklif verir, teklifler kıyaslanır, en uygunu siparişe dönüştürülür.",
    shot: shots.satinAlma,
    fit: "screen",
  },
  {
    title: "Muhasebe tek ekrandan yönetilir.",
    body: "Fatura, cari, kasa, banka, çek ve senet kayıtlarınızı girer, raporları Excel ve PDF olarak alırsınız.",
    shot: shots.muhasebe,
    fit: "screen",
  },
  {
    title: "Finansal dengeniz önünüzde.",
    body: "Alış-satışlarınızı ve ileri tarihli borç-alacak analizlerinizi tek ekrandan izleyip raporlarsınız.",
    shot: shots.finans,
    fit: "screen",
  },
];

const SIPARIS_STEPS: StoryStep[] = [
  {
    title: "Müşteri masadaki kodu okutur.",
    body: "Uygulama indirmeden, kendi telefonuyla menünüze ulaşır. Menü birden fazla dilde sunulabilir.",
    shot: photos.qr,
    fit: "photo",
  },
  {
    title: "Menüden seçer, sipariş verir.",
    body: "Ürünleri sepete ekler. Garson çağırabilir, masa temizliği isteyebilir.",
    shot: shots.phoneStage,
    fit: "phone",
  },
  {
    title: "Sipariş mutfağa ve bara ulaşır.",
    body: "Garson onayıyla yazıcılardan çıkar, ekranlara sesli bildirimle düşer. Getir, Trendyol Yemek ve YemekSepeti siparişleri de paket servis ekranına gelir.",
    shot: shots.tabletSiparis,
    fit: "device",
  },
  {
    title: "Hesap masadan ödenir.",
    body: "Müşteri masanın hesabını ya da yalnızca kendi siparişini kredi kartıyla telefonundan öder.",
    shot: shots.odeme,
    fit: "device",
  },
  {
    title: "Gün sonunda her şey önünüzde.",
    body: "Gün sonu, kasa, satış ve stok raporlarına web tabanlı yönetimden, bulunduğunuz yerden ulaşırsınız.",
    shot: shots.tabletRapor,
    fit: "device",
  },
];

const BAYI_STEPS: StoryStep[] = [
  {
    title: "Sipariş alt bayiden merkeze ulaşır.",
    body: "Alt bayinin siparişi ilgili bayiye, bayiden onaylanan sipariş doğrudan fabrikaya gider.",
    diagram: <BayiNetwork />,
    fit: "diagram",
  },
  {
    title: "Her bayinin kendi koşulları.",
    body: "Bölge bazlı bayileri, para birimlerini ve alt bayileri tanımlarsınız. Her müşteriye ayrı iskonto ve ödeme koşulu belirlersiniz.",
    shot: shots.bayi,
    fit: "screen",
  },
  {
    title: "Bayi ayrıntıyı görerek sipariş verir.",
    body: "Stok miktarı, koli adedi, güncel fiyat ve uygulanan iskonto sipariş ekranında görünür. Limit dışına çıkan stoklar için program uyarır.",
    shot: shots.stok,
    fit: "screen",
  },
  {
    title: "Sevkiyat farklı depolardan yapılır.",
    body: "Tek siparişte farklı depolara sevkiyat yapılır, parçalı sevk edilebilir. Bayiler bildirimle haberdar olur.",
    shot: shots.sevk,
    fit: "screen",
  },
  {
    title: "Tüm süreç raporlanır.",
    body: "Sipariş, sevk, üretim, stok, bayi ve depo raporlarını iki tarih arasında filtreleyerek alırsınız.",
    shot: shots.raporlar,
    fit: "screen",
  },
];

function Chapter({ product, tone, children }: { product: Product; tone?: "light"; children: ReactNode }) {
  return (
    <article className={s.chapter} data-tone={tone} data-hat={product.id} id={`urun-${product.id}`}>
      <header className={`wrap ${s.head}`}>
        <h2>{product.shortName}</h2>
        <p className={s.benefit}>{product.benefit}</p>
        <Link href={product.href} className="btn btnPrimary">Ürünü incele</Link>
      </header>
      {children}
      <dl className={`wrap ${s.points}`}>
        {product.advantages.map((item) => (
          <div key={item.title}>
            <dt>{item.title}</dt>
            <dd>{item.body}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

export function Chapters() {
  const isletme = getProduct("isletme");
  const siparis = getProduct("siparis");
  const bayi = getProduct("bayi");

  return (
    <section id="yazilimlar" aria-label="Yazılımlarımız">
      <Chapter product={isletme} tone="light">
        <ProductStory
          product={isletme}
          steps={ISLETME_STEPS}
          links={["organizer", "is-surec", "konferans", "satin-alma", "muhasebe", "finans", "dokuman"]}
          wide
        />
      </Chapter>
      <Chapter product={siparis}>
        <ProductStory
          product={siparis}
          steps={SIPARIS_STEPS}
          links={["qr-menu", "masadan-siparis", "masadan-odeme", "ana-yazilim", "yonetim-ekranlari", "entegrasyonlar", "hizli-satis-terazi"]}
        />
      </Chapter>
      <Chapter product={bayi} tone="light">
        <ProductStory
          product={bayi}
          steps={BAYI_STEPS}
          links={["stok", "bayi", "depo", "siparis-sevk", "uretim", "kullanici", "raporlar"]}
          wide
        />
      </Chapter>
    </section>
  );
}
