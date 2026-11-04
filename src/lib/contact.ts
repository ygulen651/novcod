export type ContactValues = {
  name: string;
  subject: string;
  phone: string;
  email: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(v: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  if (v.name.trim().length < 2) errors.name = "Adınızı ve soyadınızı yazın.";
  if (!v.subject) errors.subject = "İlgilendiğiniz konuyu seçin.";
  const digits = v.phone.replace(/\D/g, "");
  if (v.phone.trim() && digits.length < 7) errors.phone = "Telefon numarasını alan koduyla birlikte yazın.";
  if (!EMAIL.test(v.email.trim())) errors.email = "Geçerli bir e-posta adresi yazın. Örnek: ad@firma.com";
  if (v.message.trim().length < 10) errors.message = "Mesajınızı en az 10 karakterle yazın.";
  return errors;
}

export function contactMailto(to: string, v: ContactValues) {
  const body = [`Ad Soyad: ${v.name}`, `Telefon: ${v.phone || "-"}`, `E-posta: ${v.email}`, "", v.message].join("\n");
  return `mailto:${to}?subject=${encodeURIComponent(`Web sitesi: ${v.subject}`)}&body=${encodeURIComponent(body)}`;
}
