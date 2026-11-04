"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { products } from "@/content/products";
import { site } from "@/content/site";
import { useScrollApi } from "@/components/motion/SmoothScroll";
import { Chevron, CloseIcon, MenuIcon } from "@/components/Icons";
import { AnchorLink } from "./AnchorLink";
import s from "./Header.module.css";

export function Header() {
  const pathname = usePathname();
  const { lock, unlock } = useScrollApi();
  const [compact, setCompact] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!productsOpen) return;
    const onPointer = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) setProductsOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProductsOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [productsOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (menuOpen && !dialog.open) {
      dialog.showModal();
      lock();
    } else if (!menuOpen && dialog.open) {
      dialog.close();
    }
  }, [menuOpen, lock]);

  const closeAll = () => {
    setProductsOpen(false);
    setMenuOpen(false);
  };

  return (
    <header className={s.header} data-compact={compact || undefined}>
      <div className={`wrap ${s.bar}`}>
        <Link href="/" className={s.logo} aria-label="Novcod ana sayfa" onClick={closeAll}>
          <Image src="/images/logo-light.png" alt="" width={1000} height={258} priority sizes="130px" />
        </Link>

        <nav className={s.nav} aria-label="Ana menü">
          <div
            className={s.dropdown}
            ref={dropdownRef}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setProductsOpen(false);
            }}
          >
            <button
              ref={triggerRef}
              type="button"
              className={s.navLink}
              aria-expanded={productsOpen}
              aria-controls="urunler-menu"
              onClick={() => setProductsOpen((open) => !open)}
            >
              Yazılımlarımız <Chevron />
            </button>
            <div id="urunler-menu" className={s.panel} data-open={productsOpen || undefined}>
              <ul>
                {products.map((product) => (
                  <li key={product.id} data-hat={product.id}>
                    <Link
                      href={product.href}
                      className={s.panelLink}
                      aria-current={pathname.startsWith(product.href) ? "page" : undefined}
                      tabIndex={productsOpen ? undefined : -1}
                      onClick={closeAll}
                    >
                      <span className={s.panelDot} aria-hidden="true" />
                      <span>
                        <strong>{product.name}</strong>
                        <small>{product.menuNote}</small>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <AnchorLink id="hizmetler" className={s.navLink}>Hizmetlerimiz</AnchorLink>
          <AnchorLink id="hakkimizda" className={s.navLink}>Hakkımızda</AnchorLink>
          <AnchorLink id="iletisim" className={s.navLink}>İletişim</AnchorLink>
        </nav>

        <AnchorLink id="iletisim" className={s.cta}>Projenizi konuşalım</AnchorLink>

        <button
          type="button"
          className={s.menuButton}
          aria-label="Menüyü aç"
          aria-haspopup="dialog"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <MenuIcon />
        </button>
      </div>

      <dialog
        ref={dialogRef}
        className={s.sheet}
        aria-label="Menü"
        data-lenis-prevent
        onClose={() => {
          setMenuOpen(false);
          unlock();
        }}
      >
        <span className={s.layerA} aria-hidden="true" />
        <span className={s.layerB} aria-hidden="true" />
        <div className={s.sheetTop}>
          <Link href="/" className={s.logo} aria-label="Novcod ana sayfa" onClick={closeAll}>
            <Image src="/images/logo-light.png" alt="" width={1000} height={258} sizes="130px" />
          </Link>
          <button type="button" className={s.menuButton} aria-label="Menüyü kapat" onClick={() => setMenuOpen(false)}>
            <CloseIcon />
          </button>
        </div>
        <nav aria-label="Mobil menü" className={s.sheetNav}>
          <p className={s.sheetLabel}>Yazılımlarımız</p>
          <ul className={s.sheetProducts}>
            {products.map((product) => (
              <li key={product.id} data-hat={product.id}>
                <Link href={product.href} onClick={closeAll}>
                  <span className={s.panelDot} aria-hidden="true" />
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
          <ul className={s.sheetLinks}>
            <li><AnchorLink id="hizmetler" onNavigate={closeAll}>Hizmetlerimiz</AnchorLink></li>
            <li><AnchorLink id="hakkimizda" onNavigate={closeAll}>Hakkımızda</AnchorLink></li>
            <li><AnchorLink id="iletisim" onNavigate={closeAll}>İletişim</AnchorLink></li>
          </ul>
        </nav>
        <div className={s.sheetFoot}>
          <AnchorLink id="iletisim" className="btn btnPrimary" onNavigate={closeAll}>Projenizi konuşalım</AnchorLink>
          <a href={site.phoneHref} className="btn btnGhost">{site.phone}</a>
        </div>
      </dialog>
    </header>
  );
}
