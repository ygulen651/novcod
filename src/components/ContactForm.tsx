"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { contactSubjects, site } from "@/content/site";
import { contactMailto, validateContact, type ContactErrors, type ContactValues } from "@/lib/contact";
import s from "./Contact.module.css";

type Props = { backendReady: boolean; defaultSubject?: string };
type Status = "idle" | "sending" | "sent" | "handoff" | "failed";

const FIELD_ORDER: (keyof ContactValues)[] = ["name", "subject", "phone", "email", "message"];

export function ContactForm({ backendReady, defaultSubject }: Props) {
  const [values, setValues] = useState<ContactValues>({
    name: "",
    subject: defaultSubject ?? "",
    phone: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const update = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name as keyof ContactValues]) {
      setErrors((current) => ({ ...current, [name]: undefined }));
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    const firstInvalid = FIELD_ORDER.find((key) => found[key]);
    if (firstInvalid) {
      setStatus("idle");
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    if (!backendReady) {
      window.location.href = contactMailto(site.email, values);
      setStatus("handoff");
      return;
    }

    setStatus("sending");
    const website = new FormData(event.currentTarget).get("website");
    const response = await fetch("/api/iletisim", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...values, website }),
    }).catch(() => null);

    if (response?.ok) {
      setStatus("sent");
      setValues({ name: "", subject: defaultSubject ?? "", phone: "", email: "", message: "" });
    } else {
      setStatus("failed");
    }
  };

  const fieldProps = (name: keyof ContactValues) => ({
    id: `form-${name}`,
    name,
    value: values[name],
    onChange: update,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `form-${name}-hata` : undefined,
  });

  const error = (name: keyof ContactValues) =>
    errors[name] ? (
      <p className={s.error} id={`form-${name}-hata`}>{errors[name]}</p>
    ) : null;

  return (
    <form ref={formRef} className={s.form} onSubmit={onSubmit} noValidate>
      <div className={s.field}>
        <label htmlFor="form-name">Ad Soyad</label>
        <input {...fieldProps("name")} type="text" autoComplete="name" required />
        {error("name")}
      </div>
      <div className={s.field}>
        <label htmlFor="form-subject">Konu veya ilgilenilen ürün</label>
        <select {...fieldProps("subject")} required>
          <option value="">Seçin</option>
          {contactSubjects.map((subject) => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>
        {error("subject")}
      </div>
      <div className={s.field}>
        <label htmlFor="form-phone">Telefon <span className={s.optional}>(isteğe bağlı)</span></label>
        <input {...fieldProps("phone")} type="tel" autoComplete="tel" inputMode="tel" />
        {error("phone")}
      </div>
      <div className={s.field}>
        <label htmlFor="form-email">E-posta</label>
        <input {...fieldProps("email")} type="email" autoComplete="email" inputMode="email" required />
        {error("email")}
      </div>
      <div className={`${s.field} ${s.wide}`}>
        <label htmlFor="form-message">Mesaj</label>
        <textarea {...fieldProps("message")} rows={5} required />
        {error("message")}
      </div>
      <input className={s.trap} type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className={`${s.wide} ${s.actions}`}>
        <button type="submit" className="btn btnPrimary" disabled={status === "sending"}>
          {backendReady ? (status === "sending" ? "Gönderiliyor" : "Mesajı gönder") : "E-postada hazırla"}
        </button>
        {!backendReady && (
          <p className={s.note}>Mesajınız e-posta uygulamanızda hazırlanır, göndermek için orada onaylarsınız.</p>
        )}
      </div>

      <div className={s.wide} role="status" aria-live="polite">
        {status === "handoff" && (
          <p className={s.notice}>
            E-posta uygulamanız açılmadıysa <a href={`mailto:${site.email}`}>{site.email}</a> adresine yazın ya da{" "}
            <a href={site.phoneHref}>{site.phone}</a> numarasını arayın.
          </p>
        )}
        {status === "sent" && <p className={s.notice}>Mesajınız gönderildi.</p>}
        {status === "failed" && (
          <p className={s.error}>
            Mesajınız gönderilemedi. Tekrar deneyin ya da <a href={site.phoneHref}>{site.phone}</a> numarasını arayın.
          </p>
        )}
      </div>
    </form>
  );
}
