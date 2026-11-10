import type { Metadata } from "next";
import { ContactSection } from "@/components/ContactSection";
import { Benefits } from "@/components/home/Benefits";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { Process } from "@/components/home/Process";
import { Products } from "@/components/home/Products";
import { Proof } from "@/components/home/Proof";
import { Services } from "@/components/home/Services";
import { Story } from "@/components/home/Story";
import { Work } from "@/components/home/Work";
import { site } from "@/content/site";
import s from "./page.module.css";

export const metadata: Metadata = {
  title: { absolute: "Novcod Yazılım Teknolojileri | İşletme, Restoran ve Bayi Yazılımları" },
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div className={s.page} data-tone="light">
      <Hero />
      {/* Koyu bölümler tek bir yuvarlak panelde art arda akar. */}
      <div className={`panel ${s.dark}`} data-tone="dark">
        <Benefits />
        <Products />
        <Services />
      </div>
      <Work />
      <Story />
      <Proof />
      <Process />
      <Faq />
      <ContactSection />
    </div>
  );
}
