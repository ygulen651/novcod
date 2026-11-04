# Novcod web sitesi

Next.js App Router, TypeScript, CSS Modules, GSAP (ScrollTrigger, SplitText), Lenis.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint && npm run typecheck
```

- İçerik: `src/content/site.ts`, `src/content/products.ts`
- Eski adres yönlendirmeleri: `redirects.json` (Next.js 308). Apache için `npm run redirects:apache`, çıktı `deploy/apache-redirects.conf`.
- Form: `.env.example` dosyasına bakın. `CONTACT_WEBHOOK_URL` yoksa form mesajı e-posta uygulamasında hazırlar.
- Kaynak envanteri: `docs/icerik-envanteri.md`. Tasarım kararları: `DESIGN.md`.
