# Novcod tasarım sistemi

## Yaklaşım
İki referansın karışımı. **frank.com.tr**'den: koyu sahne, parçacıklı marka işareti, dev başlıklar, kaydırmayla üst üste binen kartlar, numaralı proje ızgarası ve dev "Novcod." yazılı footer. **ikasa.com.tr**'den: beyaz sayfa üzerinde kenardan içeri çekilmiş yuvarlak paneller, marka mavisi üst bilgi şeridi, hap butonlar, yuvarlak ok düğmeleri, rozetli ve iki renkli açılış başlığı, sıcak gri panelde SSS. Her ikisi de Novcod markasıyla yeniden yorumlandı (logo mavisi, Novcod logo işareti, ödül/müşteri logosu yerine içerikten hesaplanan sayılar).

Ritim: koyu hero paneli → tek koyu panelde faydalar, yazılım kartları ve hizmetler → beyaz modül ızgarası → hakkımızda (koyu sistem haritası bandı) → koyu sahadan paneli → süreç → gri-mavi SSS paneli → koyu iletişim paneli → beyaz footer.

## Renk (`src/app/globals.css`)
| Rol | Koyu ton | Açık ton |
|---|---|---|
| Zemin `--bg` / ikincil `--bg-alt` | `#111214` / `#1A1B1F` | `#FFFFFF` / `#F2F2F3` |
| Metin `--fg` / ikincil `--fg-muted` | `#FFFFFF` / `#A3A6AD` | `#111214` / `#5F636B` |
| Vurgu `--accent`, `--link` | `#36A9F0` | `#0B6DB5` |

Bölümler `data-tone="dark"` veya `data-tone="light"` alır; iki ton da tüm anlamsal değerleri tanımlar. Açık panel zemini `--warm` (#EAF0F6, soğuk gri-mavi; adı geçmişten kaldı). Üst menü her zaman beyazdır; üstünde marka mavisi bilgi şeridi vardır.

## Tipografi
Plus Jakarta Sans (başlık ve metin) + JetBrains Mono (`--font-mono`, `.mono`): etiketler, numaralar, rakamlar, terminal satırı. Bölüm etiketi `.eyebrow`: mono, büyük harf, `//` öneki ve imleç karesi.

## Dijital dil (teknoloji / veri havası)
- `.gridBg`: kenarlara doğru soluklaşan ince teknik ızgara (açılış, faydalar, hizmetler).
- Açılışta devre hatları ve üzerlerinde akan ışık darbeleri (yalnızca geniş ekranda), yavaş dönen kesikli yörünge halkaları.
- `ScrambleText`: "aynı sistemde." açılışta karakter karakter çözülür; yer tutucu kopya sayesinde satır kaymaz, ekran okuyucu gerçek metni okur.
- `CountUp`: faydalardaki rakamlar görünür olunca sayar; sunucuda son değer yazılıdır.
- Açık bölümlerde de ızgara: `--grid-line` ton başına tanımlıdır (açıkta mavi %7); `.gridLayer` ile bölümün tamamına yayılır (SSS, sahadan), modül ızgarasında ekranların arkasında.
- Hakkımızda bandı bir sistem haritasıdır (`SystemMap.tsx`): ortada parçacıklı Novcod işareti, çevresinde ışık darbeli hatlarla bağlı üç yazılım kartı (modül adları ve sayıları ürün verisinden) ve bir `novcod --durum` terminal kartı. 1100 px ve üstünde kartlar 1000×430 çizim alanındaki yüzde konumlarına oturur; altında alt alta dizilir, hatlar gizlenir.
- Fotoğraflara gerekirse `.scanlines` ile ekran dokusu verilebilir.
- Süreç adımları mono `01–04` kareler; aralarındaki kesikli hatta ışık darbesi akar. SSS soruları `Q.01` numaralı, ürün etiketi `[Novcod Sipariş]` biçiminde mono.
- `.hud`: görsellerde köşe çerçeveleri. Numaralar `[01]`, yollar `işletme/organizer` biçiminde mono.
- Tüm rakam ve etiketler içerikten gelir; uydurma veri kullanılmaz. Hareket azaltma tercihinde animasyonlar durur (sonsuz animasyonlar tek tura indirilir).

## Bileşen kuralları
- Paneller `.panel` sınıfıyla kenardan `--inset` kadar içeri çekilir ve `--radius-l` köşe alır. Kartlar `--radius-m`, iç görseller `--radius-s`.
- Butonlar hap şeklindedir: dolu (`.btn.btnPrimary`) ya da çerçeveli (`.btn.btnGhost`). Menüdeki eylem butonu marka mavisidir; mobilde "[+] Menü".
- Kartlar ve ızgaralar ince çizgilerle ayrılır; numaralar (01, 02) ve yuvarlak ok düğmeleri (↗ ↘) yön gösterir.
- SSS, ürün verisindeki modül sorularından otomatik toplanır (`Faq.tsx`), yerleşik `details/summary` ile açılır.
- Görsel oranları: modül ızgarası 16:9, ürün kartı ekranı esnek, sistem haritası 1000:430 (dar ekranda serbest).

## Hareket
- **Ürün sahnesi (`Hero.tsx`, iKasa'dan):** Açılışta üç ürün (İşletme monitörde, Sipariş tablette, Bayi dizüstünde) bir yayın önünde durur. Masaüstünde açılış CSS `sticky` ile sabitlenir; kaydırdıkça ürünler sırayla öne gelir ve alttaki ilgili yol vurgulanır. Sabitleme bitince ürün grubu aşağı iner ve "Faydalar" bölümündeki `data-landing` alanına konar (GSAP ScrollTrigger, ölçüler her yenilemede yeniden hesaplanır). Mobilde ve hareket azaltma tercihinde ürünler sabit kompozisyondur, iniş alanı gizlenir.
- Cihaz çerçeveleri (monitör, dizüstü) CSS ile çizilir; ekran görüntüsü değiştirilince çerçeve aynı kalır.
- `ParticleMark.tsx` açılışta, sahadan ve iletişim panellerinde yalnızca hafif toz olarak çalışır (`showMark={false}`, yoğunluk `density`); sistem haritasında `showMark` açıktır ve Novcod logo işaretini `markX/markY/markSize` ile verilen konumda parçacıklarla çizer. Görünür alanda değilken ve sekme gizliyken durur.
- Yazılım kartlarının üst üste binmesi yalnızca CSS `position: sticky` ile yapılır (1100 px ve üstü).
- `data-fade` taşıyan öğeler görünür alana girince 16 px yukarıdan belirir (`Reveal.tsx`). Yalnızca `html[data-motion]` varsa uygulanır; hareket azaltma tercihinde içerik doğrudan görünür.
- Hero başlığı ve öndeki ürün görseli (LCP) hiçbir zaman gizlenmez.
- Lenis tek döngüyle GSAP ticker üzerinden çalışır. Ürün sayfalarındaki kaydırma efektleri `ScrollEffects.tsx` içindedir.

## Görseller
Kaynak siteden gerçek ekranlar, fotoğraflar ve filmler (`src/content/products.ts` içindeki `photos`, `shots`, `videos`). Değiştirmek için aynı oranlı yeni dosyayı `public/images` altına koyup bu kayıtları güncellemek yeterlidir.
