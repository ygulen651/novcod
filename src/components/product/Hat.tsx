import Link from "next/link";
import { lineModules, moduleHref, type Product } from "@/content/products";
import s from "./Hat.module.css";

type Props = {
  product: Product;
  current?: string;
  label?: string;
};

/** Ürün hattı: modüller duraklar olarak sıralanır, her durak modül sayfasına gider. */
export function Hat({ product, current, label }: Props) {
  const stops = lineModules(product);
  return (
    <nav className={s.hat} data-hat={product.id} aria-label={label ?? `${product.shortName} modülleri`}>
      <span className={s.line} data-draw aria-hidden="true" />
      <ol className={s.stops} style={{ "--stops": stops.length } as React.CSSProperties}>
        {stops.map((module) => (
          <li key={module.slug}>
            <Link
              href={moduleHref(product, module.slug)}
              className={s.stop}
              aria-current={module.slug === current ? "page" : undefined}
            >
              <span className={s.dot} aria-hidden="true" />
              {module.stop}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

type FlowProps = { product: Product };

/** Kaynaktaki gerçek iş akışı: bağlantısız, sıralı süreç şeması. */
export function Flow({ product }: FlowProps) {
  if (!product.flow) return null;
  return (
    <div className={s.flow} data-hat={product.id}>
      <span className={s.line} data-draw aria-hidden="true" />
      <ol className={s.flowSteps} style={{ "--stops": product.flow.steps.length } as React.CSSProperties}>
        {product.flow.steps.map((step) => (
          <li key={step.label}>
            <span className={s.dot} aria-hidden="true" />
            <strong>{step.label}</strong>
            <span>{step.note}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
