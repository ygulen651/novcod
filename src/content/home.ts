import type { ProductId } from "./products";

/** Ana sayfaya özel metinler. Ürün, hizmet ve hakkımızda metinleri `products.ts` ve `site.ts` içindedir. */

export const hero = {
  eyebrow: "Novcod Yazılım Teknolojileri",
  title: "İşinizin tüm parçaları,",
  titleAccent: "aynı sistemde.",
  badge: "Web tabanlı iş yazılımları",
  lede: "İşletme yönetimi, cafe ve restoran operasyonları ve bayi ağları için web tabanlı yazılımlar geliştiriyor, kurumunuza özel uygulamalar kuruyoruz.",
};

/** Hero altındaki "ihtiyacınıza göre" yolları: ziyaretçi kendi işini seçip ürüne geçer. */
export const paths: { id: ProductId; need: string }[] = [
  { id: "isletme", need: "Departmanlarımı tek yerden yönetmek istiyorum" },
  { id: "siparis", need: "Cafe veya restoran işletiyorum" },
  { id: "bayi", need: "Bayi ağımla sipariş alıyorum" },
];

/**
 * Faydalar ve her birinin yanındaki gerçek sayı. Sayılar içerikten hesaplanır (`Benefits.tsx`),
 * "7/24" ise İşletme ve Bayi sayfalarındaki "7/24 erişim" ifadesinden gelir.
 */
export const benefits = [
  {
    figure: "products",
    unit: "yazılım",
    title: "Süreçler tek ekranda",
    body: "Her yazılım kendi alanındaki işleri modüller hâlinde bir araya getirir. Dağınık programlar arasında gidip gelmezsiniz.",
  },
  {
    figure: "modules",
    unit: "modül",
    title: "İşinize göre şekillenir",
    body: "Yazılımlarımızı kendimiz geliştiriyor, modülleri işletmenizin tipine ve ihtiyacına göre uyarlıyoruz.",
  },
  {
    figure: "7/24",
    unit: "web erişimi",
    title: "Her yerden erişim",
    body: "Web tabanlı yazılımlarla internet olan her yerden çalışırsınız. Bayileriniz siparişlerini mobilden takip eder.",
  },
  {
    figure: "services",
    unit: "hizmet alanı",
    title: "Uzman ekiple destek",
    body: "Özel geliştirme, kurumsal uygulamalar ve bakım-destek hizmetiyle yazılımdan en yüksek faydayı almanızı sağlarız.",
  },
] as const;

/**
 * Çalışma adımları. Varsayım: kaynak sitede adım adım bir süreç anlatılmıyor;
 * bu metinler genel çalışma biçimini anlatır ve yayından önce Novcod ekibince teyit edilmelidir.
 */
export const process = [
  { title: "Tanışalım", body: "Formu doldurun ya da bizi arayın. İşinizi ve ihtiyacınızı dinleyelim." },
  { title: "Doğru yazılımı belirleyelim", body: "Hangi yazılımın ve modüllerin işinize uyduğunu birlikte netleştirelim." },
  { title: "İşinize göre uyarlayalım", body: "Kullanıcıları, ekranları ve süreçleri kurumunuza göre yapılandıralım." },
  { title: "Yanınızda olalım", body: "Bakım ve destek hizmetimizle kullanım boyunca sorularınızı yanıtlayalım." },
];
