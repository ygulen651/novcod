import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ModulePage } from "@/components/product/ModulePage";
import { getProduct, moduleHref } from "@/content/products";

const product = getProduct("bayi");

type Props = { params: Promise<{ modul: string }> };

export const dynamicParams = false;

export const generateStaticParams = () => product.modules.map((item) => ({ modul: item.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { modul } = await params;
  const entry = product.modules.find((item) => item.slug === modul);
  if (!entry) return {};
  const url = moduleHref(product, entry.slug);
  return {
    title: entry.seoTitle,
    description: entry.seoDescription,
    alternates: { canonical: url },
    openGraph: { title: entry.seoTitle, description: entry.seoDescription, url },
  };
}

export default async function Page({ params }: Props) {
  const { modul } = await params;
  const entry = product.modules.find((item) => item.slug === modul);
  if (!entry) notFound();
  return <ModulePage product={product} module={entry} />;
}
