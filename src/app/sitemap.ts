import type { MetadataRoute } from "next";
import { moduleHref, products } from "@/content/products";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    ...products.flatMap((product) => [
      product.href,
      ...product.modules.map((module) => moduleHref(product, module.slug)),
    ]),
  ];
  return paths.map((path) => ({ url: `${site.url}${path === "/" ? "" : path}` }));
}
