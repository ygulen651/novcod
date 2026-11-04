import type { Metadata } from "next";
import { ProductPage } from "@/components/product/ProductPage";
import { getProduct } from "@/content/products";

const product = getProduct("siparis");

export const metadata: Metadata = {
  title: product.seoTitle,
  description: product.seoDescription,
  alternates: { canonical: product.href },
  openGraph: { title: product.seoTitle, description: product.seoDescription, url: product.href },
};

export default function Page() {
  return <ProductPage product={product} />;
}
