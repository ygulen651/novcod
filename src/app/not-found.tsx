import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/content/products";
import s from "@/components/product/Product.module.css";

export const metadata: Metadata = { title: "Sayfa bulunamadı", robots: { index: false } };

export default function NotFound() {
  return (
    <section className={`wrap ${s.notFound}`}>
      <h1>Bu sayfa bulunamadı.</h1>
      <p>Adres değişmiş olabilir. Aradığınız ürüne buradan ulaşabilirsiniz.</p>
      <ul>
        {products.map((product) => (
          <li key={product.id}><Link href={product.href} className="textLink">{product.name}</Link></li>
        ))}
        <li><Link href="/" className="textLink">Ana sayfa</Link></li>
      </ul>
    </section>
  );
}
