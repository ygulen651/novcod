import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/JsonLd";
import { PageTransition } from "@/components/motion/PageTransition";
import { ScrollEffects } from "@/components/motion/ScrollEffects";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { site } from "@/content/site";
import "lenis/dist/lenis.css";
import "./globals.css";

const sans = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
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

export const viewport: Viewport = { themeColor: "#000000" };

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

const introScript = `if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.dataset.intro=''`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={sans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>
        <a className="skip" href="#icerik">İçeriğe geç</a>
        <SmoothScroll>
          <Header />
          <main id="icerik" tabIndex={-1}>{children}</main>
          <Footer />
          <ScrollEffects />
          <PageTransition />
        </SmoothScroll>
        <JsonLd data={organization} />
      </body>
    </html>
  );
}
