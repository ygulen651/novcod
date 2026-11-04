import type { Metadata } from "next";
import { ContactSection } from "@/components/ContactSection";
import { About } from "@/components/home/About";
import { Chapters } from "@/components/home/Chapters";
import { Hero } from "@/components/home/Hero";
import { HomeReady } from "@/components/home/HomeReady";
import { Services } from "@/components/home/Services";
import { Statement } from "@/components/home/Statement";
import { Videos } from "@/components/home/Videos";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: "Novcod Yazılım Teknolojileri | İşletme, Restoran ve Bayi Yazılımları" },
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Statement />
      <Chapters />
      <Videos />
      <Services />
      <About />
      <ContactSection />
      <HomeReady />
    </>
  );
}
