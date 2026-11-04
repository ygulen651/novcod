export const site = {
  name: "Novcod Yazılım Teknolojileri",
  shortName: "Novcod",
  url: "https://novcod.com.tr",
  description:
    "Novcod Yazılım Teknolojileri; işletme yönetimi, cafe ve restoran operasyonları ve bayi süreçleri için web tabanlı yazılımlar geliştirir.",
  email: "info@novcod.com.tr",
  phone: "444 12 70",
  phoneHref: "tel:4441270",
  country: "Türkiye",
  social: [
    { label: "Facebook", href: "https://www.facebook.com/Novcod" },
    { label: "Instagram", href: "https://www.instagram.com/novcodtr/" },
    { label: "X (Twitter)", href: "https://twitter.com/novcodtr" },
  ],
} as const;

export const services = [
  {
    need: "Kurumunuza özel bir web uygulaması gerekiyorsa",
    name: "Web Uygulama Geliştirme",
    body: "Web uygulamalarındaki güncel yaklaşımları takip eden geliştirici kadromuz, kalite beklentilerinize uygun çözümleri kurumunuza özel olarak geliştirir.",
  },
  {
    need: "Birden fazla lokasyon, departman ve sistemle çalışıyorsanız",
    name: "Kurumsal Uygulamalar",
    body: "Ölçek büyüdükçe işbirliği, anlık bilgi alışverişi ve iş akışı yönetimi zorlaşır. Farklı sistemleri, süreçleri, verileri ve insanları ortak bir platformda bir araya getiren kurumsal çözümler sunarız.",
  },
  {
    need: "BT altyapınızdan daha fazla fayda almak istiyorsanız",
    name: "Bakım ve Destek",
    body: "Uzman danışmanlarımız, proje deneyimleri ve teknoloji uzmanlıklarıyla altyapınızdaki hizmet ve ürünlerden en yüksek faydayı almanız için bakım ve destek çözümleri sunar.",
  },
] as const;

export const about = {
  statement:
    "Firma ve kurumların ihtiyaçlarına, müşteri odaklı bir hizmet anlayışıyla yenilikçi ve özgün yazılım çözümleri sunuyoruz.",
  vision:
    "Vizyonumuz; alanında uzman ve tecrübeli kadromuzla memnuniyete önem veren, yenilikçi, dürüst ve özgün yazılımlarıyla marka değerini kanıtlayan bir firma olmak.",
  values: [
    { title: "Uzman kadro", body: "Alanında uzman ve tecrübeli bir ekiple çalışıyoruz." },
    { title: "Müşteri odaklı hizmet", body: "Kuruluşumuzdan bugüne hizmet anlayışımızın merkezinde müşterilerimizin ihtiyaçları var." },
    { title: "Özgün çözümler", body: "Yazılımlarımızı kendimiz geliştiriyor, kuruma özel ihtiyaçlara göre şekillendiriyoruz." },
  ],
} as const;

export const contactSubjects = [
  "Novcod İşletme Yönetim Yazılımı",
  "Novcod Sipariş",
  "Novcod Bayi Yönetim Yazılımı",
  "Web Uygulama Geliştirme",
  "Kurumsal Uygulamalar",
  "Bakım ve Destek",
  "Diğer",
] as const;
