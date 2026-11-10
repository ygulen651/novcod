import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/JsonLd";
import { PageTransition } from "@/components/motion/PageTransition";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollEffects } from "@/components/motion/ScrollEffects";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { site } from "@/content/site";
import "lenis/dist/lenis.css";
import "./globals.css";

/* Tek aile: geometrik, kalın başlıklar ve okunaklı metin için Plus Jakarta Sans. */
const sans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

/* Etiketler, numaralar ve rakamlar için mono aile: teknoloji/veri havası */
const mono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}`, template: `%s | Novcod` },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: site.name,
    images: [{ url: "/images/og.png", width: 1200, height: 630, alt: "Novcod Software" }],
  },
  twitter: { card: "summary_large_image", site: "@novcodtr" },
};

export const viewport: Viewport = { themeColor: "#111214" };

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/images/logo-dark.png`,
  email: site.email,
  telephone: "+90-444-12-70",
  address: { "@type": "PostalAddress", addressCountry: "TR" },
  sameAs: site.social.map((item) => item.href),
};

/** Giriş animasyonları yalnızca hareket azaltma tercihi yoksa açılır. */
const motionScript = `if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.dataset.motion=''`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body>
        <a className="skip" href="#icerik">İçeriğe geç</a>
        <SmoothScroll>
          <Header />
          <main id="icerik" tabIndex={-1}>{children}</main>
          <Footer />
          <ScrollEffects />
          <PageTransition />
          <Reveal />
        </SmoothScroll>
        <JsonLd data={organization} />
      </body>
    </html>
  );
}
