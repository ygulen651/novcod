# Novcod tasarım sistemi

## Yaklaşım
Ürün lansman sayfası disiplini: siyah ve kırık beyaz sahneler, ortalanmış büyük başlıklar, bol boşluk, her ürün için tek büyük görsel. Gösteriş efektten değil ölçekten ve filmden gelir. Tek renk logodaki renktir.

Ritim: tam ekran film, siyah cümle, açık İşletme, siyah Sipariş, açık Bayi, siyah filmler, açık hizmetler ve hakkımızda, siyah iletişim.

## Renk (`src/app/globals.css`)
| Rol | Değer |
|---|---|
| Koyu zemin | `#000000`, metin `#F5F5F7`, ikincil `#A1A1A6` |
| Açık zemin | `#F5F5F7`, metin `#1D1D1F`, ikincil `#6E6E73` |
| Bağlantı | Koyuda `#5CC8F5`, açıkta `#00719F` (logo camgöbeğinden) |

`--bg`, `--fg`, `--fg-muted`, `--rule`, `--link` anlamsal değerlerdir; `data-tone="light"` açık bölümler için değiştirir. Birincil buton `--fg` zeminli haptır.

## Tipografi
Geist. Başlıklar 600 ağırlık, `-0.035em` izleme, çoğunlukla ortalanmış. Ölçek `clamp()` ile akıcıdır.

## Ana sayfa
- **Hero:** Tam ekran film (fotoğraf ilk boyamada görünür), ortalanmış başlık, kısa cümle, bir buton ve bir bağlantı. Kaydırmayla film çerçeveye çekilir.
- **Cümle:** Kaydırmayla kelime kelime aydınlanır.
- **Ürünler (`Chapters.tsx`, `ProductStory.tsx`):** Başlık, fayda, buton, ardından ürünün iş akışı beş adımda anlatılır. Masaüstünde görsel sabit kalır, adımlar kaydıkça değişir; mobilde her adım kendi görseliyle akar. Pin yerine CSS `sticky` kullanılır. Bayi'nin ilk adımı temsili akış şemasıdır.
- **Hizmetler:** Akordeon liste ve eşlik eden görsel.
- **İletişim:** Siyah final, alt çizgili form alanları.

## Hareket kuralları
- GSAP kaydırma ile bağlı animasyonları, CSS hover ve focus durumlarını yönetir. Aynı öğeye iki sistem uygulanmaz.
- LCP görseli `opacity: 0` ile gizlenmez.
- Lenis tek döngüyle GSAP ticker üzerinden çalışır. `stopInertiaOnNavigate` kullanılmaz.

## Görseller
Kaynak siteden gerçek ekranlar, fotoğraflar ve filmler. Maskotlu görseller ve üçüncü taraf logoları kullanılmaz. Detay için `Zoomable` büyütme görünümü vardır.
