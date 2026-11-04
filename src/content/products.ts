export type ProductId = "isletme" | "siparis" | "bayi";

export type Shot = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** screen: düz ekran görüntüsü, device: şeffaf zeminli cihaz görseli, photo: fotoğraf */
  kind: "screen" | "device" | "photo";
};

export type ModuleSection = {
  title: string;
  body?: string;
  items?: string[];
};

export type Faq = { q: string; a: string };

export type Module = {
  slug: string;
  name: string;
  /** Hat üzerindeki kısa durak adı */
  stop: string;
  summary: string;
  seoTitle: string;
  seoDescription: string;
  lede: string;
  shot?: Shot;
  sections: ModuleSection[];
  faq?: Faq[];
  /** Destek ve paket gibi ürün modülü olmayan sayfalar hat dışında kalır */
  offLine?: boolean;
};

export type ModuleGroup = { title: string; note: string; slugs: string[] };

export type Product = {
  id: ProductId;
  name: string;
  shortName: string;
  href: string;
  seoTitle: string;
  seoDescription: string;
  category: string;
  benefit: string;
  lede: string;
  menuNote: string;
  heroStops: string[];
  shot: Shot;
  highlights: string[];
  advantages: { title: string; body: string }[];
  flow?: { title: string; steps: { label: string; note: string }[] };
  groups: ModuleGroup[];
  gallery: { shot: Shot; caption: string; slug?: string }[];
  video?: Video;
  quotes?: { text: string; source: string }[];
  modules: Module[];
};

const screen = (src: string, width: number, height: number, alt: string): Shot => ({
  src: `/images/${src}.webp`,
  width,
  height,
  alt,
  kind: "screen",
});

const device = (src: string, width: number, height: number, alt: string): Shot => ({
  src: `/images/${src}.webp`,
  width,
  height,
  alt,
  kind: "device",
});

const photo = (src: string, width: number, height: number, alt: string): Shot => ({
  src: `/images/site/${src}.webp`,
  width,
  height,
  alt,
  kind: "photo",
});

export const photos = {
  meetingRoom: photo("toplanti-odasi", 2000, 1333, "Cam duvarlı toplantı odasında masa etrafında çalışan ekip"),
  office: photo("ofis-sunum", 1600, 1066, "Dizüstü bilgisayarların açık olduğu masada sunum yapan ekip"),
  team: photo("ekip-toplantisi", 1600, 1066, "Yuvarlak toplantı masasında bilgisayarlarıyla çalışan ekip"),
  chart: photo("finans-grafik", 800, 570, "Tablet üzerindeki finans grafiğini kalemle inceleyen kişi"),
  qr: photo("qr-siparis", 800, 570, "Masadaki QR kodu okutup telefondan menüye bakan müşteri"),
};

export type Video = { id: string; title: string; poster: string };

export const videos = {
  isletme: { id: "QbcvUckZDio", title: "Novcod İşletme Yönetim Yazılımı modülleri", poster: "/images/site/video-isletme.webp" },
  siparis: { id: "bmgtIhFt26A", title: "Novcod Sipariş tanıtım filmi", poster: "/images/site/video-siparis.webp" },
  moduller: { id: "eFWJCrmOsnA", title: "Novcod İşletme Yönetim Yazılımı tanıtımı", poster: "/images/site/video-moduller.webp" },
} satisfies Record<string, Video>;

export const shots = {
  finans: screen("isletme/finans", 2000, 1444, "Novcod İşletme Finans Modülü'nde aylara göre borç, alacak ve sonuç çizgilerini gösteren Finansal Denge Analizi ekranı"),
  muhasebe: screen("isletme/muhasebe", 2000, 1444, "Novcod İşletme Muhasebe Modülü'nde veri giriş formu ve kayıt listesi ekranı"),
  organizer: screen("isletme/organizer", 2000, 1444, "Novcod İşletme Organizer Modülü'nde iş talepleri, piyasa bilgileri, ajanda ve hesap makinesini aynı anda gösteren ekran"),
  isSurec: screen("isletme/is-surec", 2000, 1444, "Novcod İşletme İş Süreç Takip ekranında oluşturulan, tamamlanan ve bekleyen görev sayıları ile görev listesi"),
  konferans: screen("isletme/konferans", 2000, 1444, "Novcod İşletme Konferans Modülü'nde beyaz tahta alanı ve katılımcı listesi ekranı"),
  dokuman: screen("isletme/dokuman", 2000, 1444, "Novcod İşletme Doküman Yönetim Modülü'nde klasör ağacı ve doküman listesi ekranı"),
  satinAlma: screen("isletme/satin-alma", 2000, 1444, "Novcod İşletme Satın Alma Modülü'nde talep filtresi ve satın alma talep listesi ekranı"),
  bayi: screen("bayi/bayi", 1920, 939, "Novcod Bayi yazılımında tanımlı bayilerin listelendiği ekran"),
  depo: screen("bayi/depo", 1920, 1080, "Novcod Bayi yazılımında depo tanımlama ekranı"),
  kullanici: screen("bayi/kullanici", 1920, 1080, "Novcod Bayi yazılımında bayi kullanıcılarının listelendiği ekran"),
  sevk: screen("bayi/siparis-sevk", 1920, 1080, "Novcod Bayi yazılımında sipariş ve sevk detay ekranı"),
  stok: screen("bayi/stok", 1920, 939, "Novcod Bayi yazılımında ürün görselleriyle stok listesi ekranı"),
  uretim: screen("bayi/uretim", 1920, 940, "Novcod Bayi yazılımında günlük üretim giriş penceresi"),
  raporlar: screen("bayi/raporlar", 1920, 1080, "Novcod Bayi yazılımında tarih filtreli sipariş raporu ekranı"),
  phoneStage: device("siparis/phone-stage", 2000, 1206, "Telefonda Novcod Sipariş QR menüsü: ürün kategorileri, öneriler ve dil seçenekleri"),
  tabletRapor: device("siparis/tablet-rapor", 1600, 960, "Tablette Novcod Sipariş yönetim ekranı: satış grafiği ile nakit ve kredi kartı toplamları"),
  tabletCift: device("siparis/tablet-cift", 2000, 886, "İki tablette Novcod Sipariş rapor ekranları"),
  tabletSiparis: device("siparis/tablet-siparis", 825, 634, "Tablette Novcod Sipariş satış ekranı: adisyon ve ürün görselleriyle menü"),
  hizliSatis: device("siparis/hizli-satis", 734, 351, "Tablette Novcod Sipariş hızlı satış ve terazi ekranı"),
  qrMenu: device("siparis/qr-menu", 575, 597, "Telefonda Novcod Sipariş QR menüsü: ürün kategorileri ve öneriler"),
  qrDiller: device("siparis/qr-diller", 615, 517, "Telefonda farklı dil seçenekleriyle Novcod Sipariş QR menüsü"),
  odeme: device("siparis/masadan-odeme", 593, 759, "İki telefonda Novcod Sipariş masadan ödeme ekranları ve kredi kartı"),
  raporEkran: device("siparis/raporlar", 677, 602, "İki tablette Novcod Sipariş yönetici rapor ekranları"),
  adisyon: device("siparis/tablet-adisyon", 681, 600, "Tablette Novcod Sipariş adisyon rapor ekranı"),
};

const isletme: Product = {
  id: "isletme",
  name: "Novcod İşletme Yönetim Yazılımı",
  shortName: "Novcod İşletme",
  href: "/isletme-yonetim-yazilimi",
  seoTitle: "İşletme Yönetim Yazılımı",
  seoDescription:
    "Muhasebe, finans, iş süreç, satın alma, doküman, konferans ve organizer modülleriyle departman ve operasyonları tek ekrandan yöneten web tabanlı yazılım.",
  category: "BusinessApplication",
  benefit: "Departmanlarınızı ve operasyonlarınızı ayrı programlar kullanmadan yönetin.",
  lede: "Muhasebe, finans, iş süreçleri ve satın alma; işletmenizin ihtiyaç duyduğu yazılımlar modüller hâlinde tek ekranda toplanır.",
  menuNote: "Muhasebe, finans, iş süreç ve satın alma",
  heroStops: ["Muhasebe", "Finans", "İş süreç", "Satın alma"],
  shot: shots.finans,
  highlights: [
    "Web tabanlı: internet olan her yerden 7/24 erişim",
    "İhtiyaç duyulan yazılımlar kategorize modüllerle tek ekranda",
    "Eklenen yeni özellikler hesabınıza anında yansır",
  ],
  advantages: [
    { title: "7/24 erişim", body: "Web tabanlı olduğu için internet erişiminin olduğu her yerden hesabınıza ulaşırsınız." },
    { title: "Web tabanlı", body: "Yazılıma eklenen her yeni özellik anında sizin hesabınıza da yansır." },
    { title: "Tek ekran yönetimi", body: "İşletmenizin ihtiyacı olan yazılımları, kategorize edilmiş modüllerle tek ekrandan kullanırsınız." },
  ],
  groups: [
    { title: "Günlük çalışma", note: "Ekiplerin planlaması, görevleri ve toplantıları", slugs: ["organizer", "is-surec", "konferans"] },
    { title: "Para ve tedarik", note: "Alım, kayıt ve mali takip", slugs: ["satin-alma", "muhasebe", "finans"] },
    { title: "Arşiv", note: "Belgelerin saklanması ve yetkilendirilmesi", slugs: ["dokuman"] },
  ],
  gallery: [
    { shot: shots.organizer, caption: "Organizer: iş talepleri, piyasa bilgileri ve ajanda aynı ekranda", slug: "organizer" },
    { shot: shots.isSurec, caption: "İş Süreç: görevlerin durumu ve listesi", slug: "is-surec" },
    { shot: shots.muhasebe, caption: "Muhasebe: veri girişi ve kayıt listesi", slug: "muhasebe" },
  ],
  video: videos.isletme,
  modules: [
    {
      slug: "organizer",
      name: "Organizer Modülü",
      stop: "Organizer",
      summary: "Yapılacaklar, fihrist, ziyaretçi defteri ve ajanda tek ekranda.",
      seoTitle: "Organizer Modülü",
      seoDescription: "Yapılacaklar, fihrist, ziyaretçi defteri, ajanda, şirket içi sohbet ve güncel bilgi akışını tek ekranda toplayan Novcod İşletme modülü.",
      lede: "İşletmenizin günlük ihtiyacı olan pratik araçları tek ekrandan kullanın.",
      shot: shots.organizer,
      sections: [
        { title: "Yapılacaklar", body: "Tüm işlerinizi kategoriler hâlinde kaydedin; bu kayıtlar için sistem üzerinden bildirim ve SMS ile hatırlatma alın." },
        { title: "Fihrist", body: "İletişimde olduğunuz firma ve kişileri kategorize edin, kayıtlar üzerinde sorgulama yapın. Seçtiğiniz grup ya da kişilere sistem üzerinden toplu SMS veya e-posta gönderin." },
        { title: "Ziyaretçi defteri", body: "İşletmenize yapılan ziyaretleri kayıt altına alın. Ziyaret edilen kişi, ziyaretçi ve firma bilgileri, giriş-çıkış saatleri ve araç plakası gibi bilgilerle detaylı rapor alın." },
        { title: "Ajanda", body: "Yeni randevular oluşturun, günlük randevularınızı anlık olarak görün ve hatırlatma bildirimleriyle hazırlanın." },
        { title: "Şirket içi ve dışı sohbet", body: "Sohbet sistemi ve dosya paylaşımıyla ekip içi ve dışı iletişimi hızlandırın." },
        { title: "Güncel bilgi akışı", body: "Haberler, belirlediğiniz il için 7 günlük hava tahmini, döviz kurları, altın fiyatları ve BIST paketleri RSS sistemiyle ekranınızda yer alır." },
      ],
    },
    {
      slug: "is-surec",
      name: "İş Süreç Takip Modülü",
      stop: "İş Süreç",
      summary: "Görevlendirme, iş ilerleyişi ve bildirimler tek ekrandan.",
      seoTitle: "İş Süreç Takip Modülü",
      seoDescription: "Görev atama, alt görevler, tarih belirleme, dosya paylaşımı ve SMS/e-posta bildirimleriyle iş akışını takip eden Novcod İşletme modülü.",
      lede: "Görevlendirmeleri tek ekrandan yapın, işin ilerleyişini anlık takip edin ve sonlandırın.",
      shot: shots.isSurec,
      sections: [
        { title: "İş akışı", body: "Görevlendirmeleri tek ekran üzerinden yapın, iş ilerleyişini anlık ekranlarla izleyin ve işi sonlandırın." },
        { title: "Bildirimler", body: "Görev tanımları ve iş yönlendirmeleri sistem bildirimleriyle anında ulaşır. İş ilerleyişi, gecikmiş görevler ve görev yorumları için de ayrıca bildirim alırsınız." },
        { title: "Dosya paylaşımı", body: "İşe ait dokümanları modül içinde ekleyin ve açıklama yazın." },
        {
          title: "Özellikler",
          items: ["Görev atama", "İş başlangıç ve bitiş tarihleri belirleme", "Dosya ekleme ve paylaşma", "SMS ve e-posta bildirimleri", "Alt görevler oluşturma", "İş ve süreçle ilgili açıklama ekleme"],
        },
      ],
    },
    {
      slug: "konferans",
      name: "Konferans Modülü",
      stop: "Konferans",
      summary: "Kurulum gerektirmeyen görüntülü konferans.",
      seoTitle: "Konferans Modülü",
      seoDescription: "Bilgisayara kurulum yapmadan internet üzerinden görüntülü görüşme, beyaz tahta, ekran paylaşımı ve toplantı kaydı sunan Novcod İşletme modülü.",
      lede: "Bilgisayarınıza hiçbir kurulum yapmadan internet üzerinden görüntülü konferans yapın.",
      shot: shots.konferans,
      sections: [
        {
          title: "Toplantı araçları",
          items: [
            "Görüntülü görüşme: kamera ve mikrofonla çok yönlü canlı iletişim",
            "Beyaz tahta: boş tahtada ya da sunum ve resim üzerinde çalışma",
            "Ekran paylaşımı: ekranın tamamını ya da belli bir kısmını paylaşma",
            "Doküman, video, sunum ve web sayfası paylaşma, üzerinde işaretleme yapma",
            "Kayıtlı video yayınlama",
            "Anlık yazışma ve sohbet",
            "Mola: konferansı bitirmeden kısa ara verme",
            "Kayıt: toplantıyı kaydedip katılımcılarla paylaşma",
            "Katılımcılara otomatik hatırlatma SMS'i ve e-postası",
          ],
        },
        { title: "Katılım", body: "Sınırsız katılımcıyla 7/24 internet üzerinden konferans yapabilirsiniz. Katılımcılar mobil cihazlardan da bağlanabilir." },
        { title: "Kullanım alanları", body: "Yönetim kurulu ve genel kurul toplantıları yapabilir, toplantı odasında Microsoft Office, video ve multimedya dosyalarını paylaşabilirsiniz. Modül API entegrasyonunu destekler." },
      ],
    },
    {
      slug: "satin-alma",
      name: "Satın Alma Modülü",
      stop: "Satın Alma",
      summary: "Tekliften siparişe satın alma süreçleri.",
      seoTitle: "Satın Alma Modülü",
      seoDescription: "Küçük ve orta ölçekli işletmeler için online teklif, teklif kıyaslama, onay süreci ve tedarikçi kaydı sunan Novcod İşletme satın alma modülü.",
      lede: "Küçük ve orta ölçekli işletmeler için pratik ve hızlı satın alma süreç yönetimi.",
      shot: shots.satinAlma,
      sections: [
        { title: "Teklif ve sipariş", body: "Tedarikçiler talep edilen malzemelere online teklif formuyla fiyat verir. Teklifler kıyaslanır, en uygunu belirlenir ve siparişe dönüştürülür." },
        { title: "Onay süreci", body: "Tüm talepleri aynı ekranda görün, talep onayı için kullanıcı yetkilendirmesi yapın ve farklı lokasyonlardaki birimlerinizin taleplerini takip edin." },
        { title: "Web tabanlı çalışma", body: "Yükleme gerektirmez. İnternet erişiminin olduğu her yerden, herhangi bir cihazla satın alma süreçlerinizi 7/24 takip edebilirsiniz." },
        {
          title: "Avantajlar",
          items: ["Hızlı fiyat araştırma ve teklif isteme", "Elektronik iş akışı ve onay", "Tedarikçilerle ilişkileri kayıt altında tutma", "Satın alma aşamalarını kaydetme ve izleme", "Mükerrer alımların önüne geçme", "Önceki dönem fiyatlarını inceleme"],
        },
      ],
    },
    {
      slug: "muhasebe",
      name: "Muhasebe Modülü",
      stop: "Muhasebe",
      summary: "Muhasebe kayıtları, cari, kasa, banka ve raporlar.",
      seoTitle: "Muhasebe Modülü",
      seoDescription: "Fatura, cari ekstre, gider, kasa, banka, çek ve senet takibini tek ekrandan yöneten, Excel ve PDF raporları sunan Novcod İşletme muhasebe modülü.",
      lede: "Tüm muhasebe kayıtlarınızı sade bir arayüzle tek ekrandan yönetin.",
      shot: shots.muhasebe,
      sections: [
        { title: "Fatura oluşturma ve yazdırma", body: "Satışlarınızı satış faturası olarak kaydedin; müşterinize ait satış ve tahsilat bilgisi kayıt altına alınsın, fatura çıktınızı yazdırın." },
        { title: "Cari hesap ekstresi", body: "Cari hesaplarla işlem geçmişinizi kayıt altında tutun, ekstreleri Excel ve PDF olarak paylaşın. “Müşteri Ekranı” özelliğiyle carilerinize özel sayfa açıp aranızdaki işlemleri bu sayfadan takip edin." },
        { title: "Şirket ve personel giderleri", body: "Kira, fatura, maaş, prim, vergi ve banka komisyonu gibi giderleri takip edin; gider kategorilerine göre raporlayın. Maaş, avans ve prim ödemelerini ve çalışanların şirket adına yaptığı harcamaları çalışan bakiyesi üzerinden izleyin." },
        { title: "Kasa, banka, çek ve senet", body: "Kasa ve banka hesaplarınızı, verdiğiniz ve aldığınız çekleri ayrı ayrı kaydedin. Nakit Akışı Raporu ile önünüzdeki 12 ayda nakdinizin ne durumda olacağını öngörün." },
        { title: "Virman ve hatırlatmalar", body: "Virman hareketlerini tek giriş ekranından yapın; hareketler cari, kasa ve banka işlemlerine otomatik aktarılır. Vadesi gelen tahsilat ve tediyeler için anlık, sesli bildirim alın." },
        { title: "Veri aktarımı", body: "Başka bir programdan veya Excel'den verilerinizi içe aktarın. Girdiğiniz verileri istediğiniz zaman Excel formatında dışa aktarın." },
        { title: "Raporlar", items: ["Kasa ve banka raporları", "Çek ve senet raporları", "Cari raporlar", "Gelir-gider ve nakit akış raporları", "Masraf yeri ve alt kategorilere göre raporlar", "Excel ve PDF aktarımı"] },
      ],
    },
    {
      slug: "finans",
      name: "Finans Modülü",
      stop: "Finans",
      summary: "Finansal denge, nakit akışı ve vadeli raporlar.",
      seoTitle: "Finans Modülü",
      seoDescription: "Finansal denge, kasa-banka bakiyeleri, çek-senet, tahsilat-tediye, cari ve ileri vadeli raporları tek ekranda sunan Novcod İşletme finans modülü.",
      lede: "Finansal dengenizi, alış-satışlarınızı ve ileri tarihli borç-alacak analizlerinizi tek ekrandan izleyin.",
      shot: shots.finans,
      sections: [
        { title: "Anlık mali takip", body: "Tahsilat, ödeme ve diğer mali işlemlerinizi anlık takip edin. Tanımladığınız banka bilgileriyle hesaplarınızı izleyin, çek ve senet takibi yapın." },
        { title: "Kayıt altında işlemler", body: "Finansal İzleme Sistemi ile tüm işlemlerinizin logları kayıt altındadır. Verilerinize dilediğiniz zaman, dilediğiniz cihazdan erişebilirsiniz." },
        {
          title: "Finansal izleme raporları",
          items: ["Finansal denge", "Kasa ve banka bakiyeleri", "Toplam çek ve senetler", "Toplam tahsilat ve tediyeler", "Toplam cari borç ve alacaklar", "İleri vadeli alacak ve borçlar", "İleri vadeli alış ve satışlar"],
        },
      ],
    },
    {
      slug: "dokuman",
      name: "Doküman Yönetim Modülü",
      stop: "Doküman",
      summary: "Belgeleri arşivleme, arama ve yetkilendirme.",
      seoTitle: "Doküman Yönetim Modülü",
      seoDescription: "İşletme belgelerini arşivleyen, detaylı arama, klasör tanımı ve kişi-grup-rol bazlı yetkilendirme sunan Novcod İşletme doküman modülü.",
      lede: "İşletme belgelerinizi arşivleyin, yönetin ve ihtiyaç duyduğunuzda hızlıca ulaşın.",
      shot: shots.dokuman,
      sections: [
        { title: "Hızlı erişim", body: "Dijital ortama geçirilen belgelerde detaylı arama yapın; aradığınız dokümana hızlıca ulaşın." },
        { title: "Her yerden çalışma", body: "Belgelerinizin kontrolünü iş yerinizdeki sunucuda tutarken onlara internet erişiminin olduğu her yerden web tarayıcısıyla ulaşabilirsiniz." },
        { title: "Yetkilendirme", body: "Kullanıcılara, gruplara, dosyalara, dolap ve klasörlere ayrı ayrı yetki verebilirsiniz." },
        { title: "Özellikler", items: ["Detaylı arama", "Belge paylaşımı", "Klasör tanımlarıyla arşivleme", "Kişi, grup ve rol bazlı yetkilendirme", "Detaylı raporlama", "API entegrasyonu"] },
      ],
    },
  ],
};

const siparis: Product = {
  id: "siparis",
  name: "Novcod Sipariş",
  shortName: "Novcod Sipariş",
  href: "/novcod",
  seoTitle: "Novcod Sipariş: Cafe ve Restoran Yönetim Yazılımı",
  seoDescription:
    "QR menü, masadan sipariş, masadan ödeme, mutfak ve bar ekranları, stok, reçete ve raporlarıyla cafe ve restoranlar için web tabanlı yönetim yazılımı.",
  category: "BusinessApplication",
  benefit: "Masadaki siparişten gün sonu raporuna kadar cafe ve restoranınızı tek yazılımla yönetin.",
  lede: "Her cafe ve restoran tipine göre özelleştirilebilen; sipariş, ödeme ve servis işlemlerini bilgisayar, tablet ve yazıcılarla yürüten yönetim yazılımı.",
  menuNote: "QR menü, masadan sipariş ve ödeme",
  heroStops: ["QR menü", "Sipariş", "Mutfak ve bar", "Ödeme"],
  shot: shots.tabletSiparis,
  highlights: [
    "Müşteri QR kodu okutarak telefonundan sipariş verir",
    "Sipariş garson onayıyla mutfak ve bar yazıcılarına ve ekranlarına iletilir",
    "Hesap masadan kredi kartıyla ödenebilir",
    "Gün sonu, kasa, satış ve stok raporlarına uzaktan ulaşılır",
  ],
  advantages: [
    { title: "Tüm sipariş türleri", body: "Self servis, masaya servis ve paket servis gibi sipariş türlerine uygundur." },
    { title: "Her cihazla uyumlu", body: "TV, tablet, bilgisayar ve akıllı telefonlarla çalışır." },
    { title: "Uzaktan yönetim", body: "Bulut altyapısı sayesinde web tabanlı yönetimden gün sonu, kasa, satış ve stok raporlarınıza ulaşırsınız." },
  ],
  flow: {
    title: "Masadan mutfağa, mutfaktan kasaya",
    steps: [
      { label: "QR menü", note: "Müşteri masadaki kodu telefonuyla okutur." },
      { label: "Sipariş", note: "Ürünleri sepete ekleyip siparişi verir." },
      { label: "Garson onayı", note: "Gelen sipariş garson tarafından onaylanır." },
      { label: "Mutfak ve bar", note: "Sipariş yazıcılardan çıkar, ekranlara sesli bildirimle düşer." },
      { label: "Masadan ödeme", note: "Müşteri hesabı kredi kartıyla öder." },
    ],
  },
  groups: [
    { title: "Masada", note: "Müşterinin telefonundan yaptıkları", slugs: ["qr-menu", "masadan-siparis", "masadan-odeme"] },
    { title: "İşletmede", note: "Personelin günlük çalıştığı ekranlar", slugs: ["ana-yazilim", "hizli-satis-terazi", "entegrasyonlar"] },
    { title: "Yönetimde", note: "Takip, kapsam ve destek", slugs: ["yonetim-ekranlari", "paketler", "destek"] },
  ],
  gallery: [
    { shot: shots.tabletRapor, caption: "Yönetim ekranı: satış grafiği ve ödeme tipi toplamları", slug: "yonetim-ekranlari" },
    { shot: shots.qrMenu, caption: "QR menü: müşterinin telefonunda kategoriler", slug: "qr-menu" },
    { shot: shots.odeme, caption: "Masadan ödeme: müşterinin kendi telefonundan", slug: "masadan-odeme" },
  ],
  video: videos.siparis,
  quotes: [
    { text: "Novcod Sipariş ile birlikte işletmemizin tüm raporlarını doğru bir şekilde görebiliyoruz. Özellikle, cep telefonlarımızdan raporlar almak, bizim için büyük bir kolaylık.", source: "Venüs Pastanesi" },
    { text: "Novcod Sipariş ile paket servis ve sipariş sürecimizi çok iyi yönetiyoruz.", source: "Voswos Cafe Bistro" },
  ],
  modules: [
    {
      slug: "ana-yazilim",
      name: "Ana Yazılım",
      stop: "Ana Yazılım",
      summary: "Adisyon, ürün, stok, reçete, muhasebe ve finans işlemleri.",
      seoTitle: "Novcod Sipariş Ana Yazılım",
      seoDescription: "Adisyon, ürün, stok, reçete, muhasebe, finans ve kullanıcı yönetimini içeren cafe ve restoran ana yazılımı.",
      lede: "Self servis, masaya servis ve paket servis için tüm işlemleri tek ekrandan, tablet ya da bilgisayardan yürütün.",
      shot: shots.tabletSiparis,
      sections: [
        { title: "Kullanıcı ve rol yönetimi", body: "Yönetici, kasa personeli, garson, mutfak ve bar gibi kullanıcıları tanımlayın; hangi menülerde işlem yapabileceklerini yetkilendirin." },
        { title: "Tanımlama işlemleri", body: "Masa, kat, birim ve yazıcı tanımlarını yapın; garsonları masalarla eşleştirin. Müşteri, paket servis personeli ve ödeme yöntemlerini tanımlayın." },
        { title: "Ürün ve yan ürünler", body: "Menüdeki ürünleri, ürün gruplarını, yan ürünleri ve özelliklerini oluşturun. Alerjen ürünleri tanımlayın." },
        {
          title: "Adisyon işlemleri",
          items: ["Adisyon bölme, birleştirme ve taşıma", "Yetkiye göre ikram ve iade", "Açık hesabı müşteri carisine aktarma", "Ürün grubuna göre yüzdelik fiyat güncelleme", "Tek adisyonda ürün bazlı ödeme", "Birden fazla ödeme tipiyle parçalı ödeme", "Ürün resmine dokunarak sipariş alma", "Adisyona ve ürüne not ekleme", "Ödemelerde adisyon kilitleme"],
        },
        { title: "Muhasebe ve finans", body: "Kasa, banka, cari, masraf türleri, fiş ve virman bilgilerini girin. Tahsilat-tediye, maliyet, kâr/zarar, ileri tarihli borç-alacak ve masraf raporlarını görün." },
        { title: "Stok ve reçete", body: "Stok tanımlarını yapın, stok hareketlerini ve raporlarını izleyin. Ürün reçetelerini girin ve listeleyin." },
        { title: "Raporlar ve ayarlar", body: "Gün sonu, masa, adisyon, ürün ve sipariş bazlı raporları görün; Excel veya PDF olarak aktarın. Kasa takip, masa talepleri, mutfak ve bar takip ekranlarını ayarlardan yönetin." },
      ],
    },
    {
      slug: "qr-menu",
      name: "QR Menü",
      stop: "QR Menü",
      summary: "Masadaki kodla açılan, çok dilli dijital menü.",
      seoTitle: "QR Menü",
      seoDescription: "Müşterilerin masadaki kodu okutarak ulaştığı, yönetim panelinden düzenlenen ve birden fazla dil destekleyen dijital QR menü.",
      lede: "Müşterileriniz masadaki QR kodu okutarak menünüze hızlıca ulaşır ve siparişini kolayca verir.",
      shot: shots.qrDiller,
      sections: [
        { title: "Dijital menüye geçin", body: "Müşteriler kodu telefonlarıyla okutarak ürünlerinize erişir, fiziksel temas gerekmeden sipariş verir." },
        { title: "Baskıya gerek kalmadan güncelleyin", body: "Ürünlerinizi yönetim panelinden birkaç dakikada dilediğiniz gibi düzenleyin." },
        { title: "Çoklu dil", body: "En çok kullanılan yabancı dilleri ekleyerek menünüzü yabancı müşterilerinize birden fazla dilde sunun." },
        { title: "Masa talepleri", body: "Müşteriler QR menüden garson çağırabilir, temizlik talep edebilir ve müşteri anketi doldurabilir." },
      ],
    },
    {
      slug: "masadan-siparis",
      name: "Masadan Sipariş",
      stop: "Masadan Sipariş",
      summary: "Müşteri telefonundan sipariş verir, talepler anında düşer.",
      seoTitle: "Masadan Sipariş Sistemi",
      seoDescription: "QR menüden telefonla sipariş, garson çağrısı, masa temizlik talebi, SMS doğrulama ve sipariş-talep takip ekranları.",
      lede: "Müşteriler kendi telefonlarıyla masadan sipariş verir; siparişler ve talepler takip ekranlarına düşer.",
      shot: shots.qrMenu,
      sections: [
        { title: "Sipariş akışı", body: "Müşteri QR menüden ürünleri sepete ekler ve onaylar. Gelen masa siparişleri garson onayıyla mutfak ya da bar yazıcılarından çıkar; mutfak ve bar ekranlarında sesli bildirimle görüntülenir." },
        { title: "Sipariş iptali ve geçmiş", body: "Müşteri verdiği siparişi 1 dakika içinde iptal edebilir, geçmiş tarihli siparişlerini listeleyebilir." },
        { title: "SMS doğrulama", body: "İşletmenize ilk kez gelen müşteriden bir kereye mahsus telefon doğrulaması istenir. Bu adım masadan gelen siparişlerin güvenliğini artırır." },
        { title: "Sipariş ve talep takip ekranları", body: "Siparişler ve talepler Smart TV, tablet ve bilgisayarlardan izlenebilen takip ekranlarına düşer." },
        { title: "Masa talepleri", items: ["Garson çağırma", "Masa temizliği talebi", "Dilek ve şikâyet formu"] },
      ],
    },
    {
      slug: "masadan-odeme",
      name: "Masadan Ödeme",
      stop: "Masadan Ödeme",
      summary: "Uygulama indirmeden telefondan kredi kartıyla ödeme.",
      seoTitle: "Masadan Ödeme Sistemi",
      seoDescription: "Müşterilerin uygulama indirmeden QR kodla masa hesabını ya da kendi siparişini kredi kartıyla ödediği sistem.",
      lede: "Müşteriler uygulama indirmeden, kendi telefonlarından kredi kartıyla ödeme yapar.",
      shot: shots.odeme,
      sections: [
        { title: "Masa hesabı ya da kendi siparişi", body: "Müşteri masa hesabının tamamını ya da yalnızca kendi sipariş ettiği ürünleri ödeyebilir." },
        { title: "Kasa yoğunluğuna alternatif", body: "Sipariş veren müşteri ödemesini de kendi telefonundan yaparak kasaya gitmeden hesabını kapatır." },
        { title: "DevParam ile entegre", body: "Masadan Ödeme sistemi DevParam ile entegre çalışır." },
      ],
    },
    {
      slug: "yonetim-ekranlari",
      name: "Yönetim Ekranları",
      stop: "Yönetim",
      summary: "Satış, ödeme ve stok raporları.",
      seoTitle: "Yönetim Ekranları ve Raporlar",
      seoDescription: "Gün sonu, satış, kâr-zarar, maliyet, depo stok ve vade raporlarını sunan Novcod Sipariş yönetici ekranları.",
      lede: "Satış, ödeme ve stok verileriniz işletmenize özel, anlaşılır raporlar hâlinde sunulur.",
      shot: shots.raporEkran,
      sections: [
        { title: "Satış raporları", items: ["Gün sonu raporları", "Geçmiş yıllara göre dönem satışları", "En çok ve en az satan ürünler", "Satılmayan ürünler", "Saatlik ürün satışları", "Aylık ürün grubu satışları", "İki tarih arası satışlar"] },
        { title: "Kasa ve kârlılık", items: ["Anlık kasa, banka ve POS raporları", "Kâr ve zarar raporları", "Maliyet raporları", "Ürün bazlı maliyet raporları", "Vade raporları", "İkram, iade ve ıskonto raporları"] },
        { title: "Stok", items: ["Depo stok raporları"] },
      ],
    },
    {
      slug: "hizli-satis-terazi",
      name: "Hızlı Satış ve Terazi",
      stop: "Hızlı Satış",
      summary: "Kiloyla satış yapan işletmeler için Cass terazi entegrasyonu.",
      seoTitle: "Hızlı Satış ve Terazi",
      seoDescription: "Kiloyla satış yapan işletmeler için Cass terazi entegrasyonlu hızlı satış ekranı.",
      lede: "Kiloyla satış yapan işletmeler için Cass terazi entegrasyonuyla hızlı satış.",
      shot: shots.hizliSatis,
      sections: [
        { title: "Cass terazi entegrasyonu", body: "Novcod Sipariş, kiloyla satış yapan firmalar için Cass terazi ile entegre edilerek hızlı satışa uyumlu çalışır." },
        { title: "Terazi özellikleri", items: ["Arka ışıklı alfanümerik LCD ekran", "Standart Ethernet veya RS-232 arayüzü", "Hızlı etiket ve fiş yazdırma"] },
      ],
    },
    {
      slug: "entegrasyonlar",
      name: "Entegrasyonlar",
      stop: "Entegrasyonlar",
      summary: "Getir, Trendyol Yemek ve YemekSepeti siparişleri tek ekranda.",
      seoTitle: "Paket Servis Entegrasyonları",
      seoDescription: "Getir, Trendyol Yemek ve YemekSepeti siparişlerini Novcod Sipariş paket servis ekranından takip edin.",
      lede: "Getir, Trendyol Yemek ve YemekSepeti siparişlerinizi paket servis ekranından takip edin.",
      shot: shots.tabletSiparis,
      sections: [
        { title: "Paket servis", body: "Getir, Trendyol Yemek ve YemekSepeti üzerinden gelen tüm siparişler Novcod Sipariş içindeki paket servis ekranına düşer." },
        { title: "Diğer entegrasyonlar", items: ["DevParam ile masadan ödeme", "Cass terazi ile hızlı satış"] },
      ],
    },
    {
      slug: "paketler",
      name: "Paket Kapsamı",
      stop: "Paketler",
      offLine: true,
      summary: "Ana yazılım ve ek özellikler.",
      seoTitle: "Paket Kapsamı",
      seoDescription: "Novcod Sipariş ana yazılımının içerdiği özellikler ve eklenebilen masadan sipariş, masadan ödeme, hızlı satış ve entegrasyonlar.",
      lede: "Ana yazılımla birlikte gelenler ve işletmenize göre ekleyebileceğiniz özellikler. Güncel fiyat için bizi arayın.",
      sections: [
        { title: "Ana yazılım", items: ["Stok işlemleri", "Reçete işlemleri", "Muhasebe işlemleri", "Finans işlemleri", "Gelişmiş raporlama"] },
        { title: "Ek özellikler", items: ["Masadan Sipariş", "Masadan Ödeme", "Hızlı Satış", "Entegrasyonlar"] },
      ],
    },
    {
      slug: "destek",
      name: "Destek",
      stop: "Destek",
      offLine: true,
      summary: "Destek hattı, kullanım videoları ve sık sorulanlar.",
      seoTitle: "Destek",
      seoDescription: "Novcod Sipariş destek hattı saatleri, kullanım videosu ve sıkça sorulan sorular.",
      lede: "Sorularınız için destek hattımızı hafta içi 09:00-23:00, hafta sonu 10:00-22:00 saatleri arasında arayabilirsiniz.",
      sections: [],
      faq: [
        { q: "QR menü nedir?", a: "Müşterilerin akıllı telefonlarıyla masadaki karekodu okutarak görüntülediği dijital menüdür." },
        { q: "Masadan sipariş nasıl verilir?", a: "Müşteri QR kodu telefonuyla okutur, açılan sayfada seçtiği ürünleri sepete ekler. Sipariş üretim yerlerine iletilir, hazırlanan ürünler personel tarafından masaya teslim edilir." },
        { q: "Temassız sipariş ve ödeme nasıl gerçekleşir?", a: "Müşteri masaya özel kodu okutarak QR menüye ulaşır ve siparişini verir. Sonrasında masanın hesabını ya da yalnızca kendi siparişini, uygulama indirmeden telefonundan öder." },
        { q: "QR menü hangi telefonlarda kullanılabilir?", a: "QR kod okutabilen akıllı telefonlarda kullanılabilir." },
      ],
    },
  ],
};

const bayi: Product = {
  id: "bayi",
  name: "Novcod Bayi Yönetim Yazılımı",
  shortName: "Novcod Bayi",
  href: "/bayi-siparis-yazilimi",
  seoTitle: "Bayi Sipariş Yönetim Yazılımı (B2B)",
  seoDescription:
    "Bayi ve alt bayi siparişlerini, stok, depo, sevk, üretim, kullanıcı ve raporları tek merkezden yöneten web tabanlı ve mobil B2B yazılımı.",
  category: "BusinessApplication",
  benefit: "Bayilerinizi ve sipariş süreçlerinizi tek merkezden yönetin.",
  lede: "Alt bayiden bayiye, bayiden fabrikaya uzanan tüm sipariş sürecini kontrol altına alan web tabanlı ve mobil B2B yazılımı.",
  menuNote: "Bayi, stok, depo, sipariş ve sevk",
  heroStops: ["Alt bayi", "Bayi", "Fabrika", "Sevk"],
  shot: shots.stok,
  highlights: [
    "Alt bayi siparişi bayiye, bayiden onaylanan sipariş fabrikaya gider",
    "Her müşteriye ayrı iskonto ve ödeme koşulu",
    "Stoklarınızı alt bayi ve müşterilerinize açarak sipariş alma",
    "Bayiler 7/24 sipariş girer, durumunu mobilden takip eder",
  ],
  advantages: [
    { title: "Bayiye özel satış politikası", body: "Her müşteriye ayrı iskonto ve ödeme koşulu belirleyin; her ürün grubu için ayrı iskonto tanımlayın." },
    { title: "Ayrıntıyı görerek sipariş", body: "Bayiler stok miktarı, gramaj, koli adedi, güncel fiyat ve uygulanan iskontoyu görerek sipariş verir." },
    { title: "Web ve mobil", body: "Bayiler duyuru ve raporları mobilden ya da bilgisayardan takip eder, tablet ve telefondan sipariş girer." },
  ],
  flow: {
    title: "Alt bayiden fabrikaya sipariş akışı",
    steps: [
      { label: "Alt bayi", note: "Siparişini ilgili bayiye iletir." },
      { label: "Bayi", note: "Gelen siparişi onaylar." },
      { label: "Fabrika", note: "Onaylanan sipariş doğrudan fabrikaya gider." },
      { label: "Sevk", note: "Sevkiyat farklı depolardan, parçalı yapılabilir; bayi bildirim alır." },
    ],
  },
  groups: [
    { title: "Tanımlar", note: "Sistemin temel kayıtları", slugs: ["stok", "bayi", "depo"] },
    { title: "Sipariş ve üretim", note: "Günlük operasyon akışı", slugs: ["siparis-sevk", "uretim"] },
    { title: "Yetki ve raporlama", note: "Kim ne görür, ne ölçülür", slugs: ["kullanici", "raporlar"] },
  ],
  gallery: [
    { shot: shots.bayi, caption: "Bayi tanımlama: bölge bazlı bayi listesi", slug: "bayi" },
    { shot: shots.sevk, caption: "Sipariş ve sevk: sipariş detayı", slug: "siparis-sevk" },
    { shot: shots.raporlar, caption: "Özel raporlar: tarih filtreli listeler", slug: "raporlar" },
  ],
  modules: [
    {
      slug: "stok",
      name: "Stok Tanımlama",
      stop: "Stok",
      summary: "Ürün grupları, iskontolar ve min-max limit uyarıları.",
      seoTitle: "Stok Tanımlama Modülü",
      seoDescription: "Ürünleri grup ve alt gruplara ayıran, alış-satış iskontosu ve min-max stok uyarısı sunan bayi yazılımı modülü.",
      lede: "Ürünlerinizi gruplara ayırın, iskontoları ve stok limitlerini belirleyin.",
      shot: shots.stok,
      sections: [
        { title: "Ürün kayıtları", body: "Ürünlerinizi gruplarına göre ayırıp alt gruplar oluşturarak stoklarınızı tanımlayın." },
        { title: "İskonto", body: "Stoklarınıza satışta veya alışta uygulamak istediğiniz iskontoları belirleyin." },
        { title: "Limit uyarıları", body: "Ürünler için minimum ve maksimum limitleri belirleyin; limitlerin dışına çıkıldığında program sizi otomatik uyarır." },
      ],
    },
    {
      slug: "bayi",
      name: "Bayi Tanımlama",
      stop: "Bayi",
      summary: "Bölge bazlı bayi, alt bayi ve para birimi tanımları.",
      seoTitle: "Bayi Tanımlama Modülü",
      seoDescription: "Yurt içi ve yurt dışı bayileri, alt bayileri, para birimlerini ve bayiye özel iskontoları tanımlayan modül.",
      lede: "Firmanıza ait bölge bazlı bayilerin kayıtlarını yapın.",
      shot: shots.bayi,
      sections: [
        { title: "Bayi kayıtları", body: "Yurt içi ve yurt dışı bayilerin para birimleri, ülke ve şehir bilgileri ile bayiye ait alt bayileri tanımlanır." },
        { title: "Bayiye özel iskonto", body: "Stok ve depo iskontoları bayilere özel olarak tanımlanabilir." },
        { title: "Birden fazla kullanıcı", body: "Bayi ve alt bayilere birden fazla kullanıcı tanımlanarak şirket içi sipariş takibi daha kapsamlı yapılabilir." },
      ],
    },
    {
      slug: "depo",
      name: "Depo Tanımlama",
      stop: "Depo",
      summary: "Bayi ve alt bayi depoları, depo iskontoları.",
      seoTitle: "Depo Tanımlama Modülü",
      seoDescription: "Bayi ve alt bayilere ait depoları, üç farklı depo iskontosunu ve depo yetkilerini tanımlayan modül.",
      lede: "Bayi ve alt bayilere ait depoları tanımlayın ve yönetin.",
      shot: shots.depo,
      sections: [
        { title: "Depo tanımları", body: "Tanımlanan depolara 3 farklı depo iskontosu verilebilir. Bir bayiye birden fazla depo açma yetkisi tanımlanır." },
        { title: "Görünürlük", body: "Her bayi kendi depolarını ve alt bayilerinin depolarını görür, işlem yapabilir." },
      ],
    },
    {
      slug: "siparis-sevk",
      name: "Sipariş ve Sevk",
      stop: "Sipariş ve Sevk",
      summary: "7/24 sipariş girişi, farklı depolardan ve parçalı sevkiyat.",
      seoTitle: "Sipariş ve Sevk Modülü",
      seoDescription: "Bayilerin 7/24 sipariş girdiği, farklı depolara ve parçalı sevkiyat yapılabilen, bildirimli B2B sipariş modülü.",
      lede: "Tek siparişte farklı depolardan sevkiyat yapın; bayiler sevkiyatları bildirimle öğrensin.",
      shot: shots.sevk,
      sections: [
        { title: "Her yerden sipariş", body: "Bayiler uygulamaya tablet ve akıllı telefonlardan erişir; 7/24 sipariş girer, sipariş durumlarını takip eder." },
        { title: "Sevkiyat", body: "Tek bir siparişte farklı depolara sevkiyat yapılır, sevkiyatlar bildirimle bayilere ulaşır. Sipariş parçalı sevk edilebilir, kalan siparişler takip edilir." },
        { title: "Bayi ve merkez iletişimi", body: "Bayiler kendileriyle paylaşılan duyuru ve raporları mobilden ya da bilgisayardan takip eder. İşletmenin ihtiyacına göre özelleştirilebilen yapı, sipariş ve tahsilat süreçlerini uçtan uca yönetir." },
      ],
    },
    {
      slug: "uretim",
      name: "Üretim Tanımlama",
      stop: "Üretim",
      summary: "Günlük üretim girişleri ve stoka göre üretim planı.",
      seoTitle: "Üretim Tanımlama Modülü",
      seoDescription: "Günlük üretim girişleri, fire kaydı ve siparişlere göre üretim planlamasını yöneten bayi yazılımı modülü.",
      lede: "Üretilen ürünleri stoka girin, gelen siparişlere göre üretimi planlayın.",
      shot: shots.uretim,
      sections: [
        { title: "Günlük üretim girişleri", body: "Üretilen ürünler üretim departmanı tarafından stoklara girilir; fire ve sevk edilen ürünler de sisteme işlenerek güncel stok miktarı ortaya çıkar." },
        { title: "Üretim planlama", body: "Gelen siparişlere göre stok miktarlarına bakılır, sevk edilecek stokların üretim planlaması yapılır." },
      ],
    },
    {
      slug: "kullanici",
      name: "Kullanıcı Tanımlama",
      stop: "Kullanıcı",
      summary: "Fabrika, bayi ve alt bayi kullanıcıları ile yetkileri.",
      seoTitle: "Kullanıcı Tanımlama Modülü",
      seoDescription: "Fabrika, bayi ve alt bayi kullanıcılarını ve yetkilerini tanımlayan bayi yazılımı modülü.",
      lede: "Fabrika, bayi ve alt bayi kullanıcılarını tek yerden tanımlayın.",
      shot: shots.kullanici,
      sections: [
        { title: "Kullanıcı kayıtları", body: "Kullanıcıya ait tüm bilgiler ve yetkiler bu bölümden girilir." },
        { title: "Yetkiler", body: "Kullanıcılar yetkili oldukları alanlarda işlem yapar." },
      ],
    },
    {
      slug: "raporlar",
      name: "Özel Raporlar",
      stop: "Raporlar",
      summary: "İki tarih arası filtrelenen sipariş, stok ve bayi raporları.",
      seoTitle: "Özel Raporlar",
      seoDescription: "Sipariş, sevk, üretim, stok, bayi ve depo raporlarını iki tarih arası filtreyle sunan bayi yazılımı modülü.",
      lede: "İki tarih arası filtrelenebilen, ihtiyaca göre seçilebilen raporlar.",
      shot: shots.raporlar,
      sections: [
        {
          title: "Rapor türleri",
          items: ["Gelen sipariş raporları", "Sevk edilen siparişler", "Tamamlanan siparişler", "İptal edilen siparişler", "Silinen siparişler", "Günlük üretim raporları", "Stok raporları", "Sipariş-sevk raporları", "Bayi raporları", "Depo raporları"],
        },
      ],
    },
  ],
};

export const products: Product[] = [isletme, siparis, bayi];

export const getProduct = (id: ProductId) => products.find((p) => p.id === id)!;

export const lineModules = (product: Product) => product.modules.filter((m) => !m.offLine);

export const moduleHref = (product: Product, slug: string) => `${product.href}/${slug}`;
