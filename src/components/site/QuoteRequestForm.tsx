import { useState, type FormEvent } from "react";
import { z } from "zod";
import { useLang, type Lang } from "@/i18n";
import { services } from "@/content/services";
import { industries } from "@/content/industries";
import { siteConfig, whatsappLink } from "@/config/site";
import { SetupNotice } from "./blocks";

const t = {
  name: { id: "Nama lengkap", en: "Full name" },
  company: { id: "Nama perusahaan", en: "Company name" },
  email: { id: "Email", en: "Email" },
  phone: { id: "Telepon / WhatsApp", en: "Phone / WhatsApp" },
  industry: { id: "Industri", en: "Industry" },
  services: { id: "Layanan yang dibutuhkan", en: "Services required" },
  location: { id: "Lokasi proyek", en: "Project location" },
  start: { id: "Perkiraan tanggal mulai", en: "Preferred start date" },
  desc: { id: "Deskripsi proyek & lingkup pekerjaan", en: "Project description & scope of work" },
  consent: { id: "Saya setuju data saya digunakan untuk menanggapi permintaan ini sesuai Kebijakan Privasi.", en: "I agree my data is used to respond to this inquiry in line with the Privacy Policy." },
  submit: { id: "Kirim Permintaan", en: "Submit Request" },
  select: { id: "Pilih…", en: "Select…" },
  required: { id: "Wajib diisi", en: "Required" },
  invalidEmail: { id: "Format email tidak valid", en: "Invalid email format" },
  pickService: { id: "Pilih minimal satu layanan", en: "Select at least one service" },
  minDesc: { id: "Minimal 20 karakter", en: "At least 20 characters" },
  consentReq: { id: "Persetujuan diperlukan", en: "Consent is required" },
  noBackend: {
    id: "Penyimpanan permintaan belum diaktifkan dan email perusahaan belum dikonfigurasi, sehingga permintaan Anda belum dapat dikirim. Silakan hubungi kami melalui kanal lain setelah tersedia.",
    en: "Inquiry storage is not yet enabled and the company email is not configured, so your request cannot be sent yet. Please contact us through another channel once available.",
  },
  mailto: { id: "Aplikasi email Anda dibuka dengan permintaan yang sudah terisi. Silakan kirim email tersebut.", en: "Your email app has opened with the prefilled request. Please send that email." },
};

function schema(lang: Lang) {
  const r = t.required[lang];
  return z.object({
    name: z.string().trim().min(2, r).max(100),
    company: z.string().trim().min(2, r).max(150),
    email: z.string().trim().email(t.invalidEmail[lang]).max(255),
    phone: z.string().trim().min(6, r).max(30),
    industry: z.string().min(1, r),
    services: z.array(z.string()).min(1, t.pickService[lang]),
    location: z.string().trim().max(150).optional(),
    start: z.string().optional(),
    desc: z.string().trim().min(20, t.minDesc[lang]).max(3000),
    consent: z.literal(true, { errorMap: () => ({ message: t.consentReq[lang] }) }),
  });
}

export function QuoteRequestForm({ defaultService }: { defaultService?: string }) {
  const lang = useLang();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "noBackend" | "mailto">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("website")) return; // honeypot
    const data = {
      name: fd.get("name"), company: fd.get("company"), email: fd.get("email"), phone: fd.get("phone"),
      industry: fd.get("industry"), services: fd.getAll("services"), location: fd.get("location") || undefined,
      start: fd.get("start") || undefined, desc: fd.get("desc"), consent: fd.get("consent") === "on",
    };
    const res = schema(lang).safeParse(data);
    if (!res.success) {
      const errs: Record<string, string> = {};
      res.error.issues.forEach((i) => (errs[String(i.path[0])] ??= i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    if (siteConfig.contactEmail) {
      const v = res.data;
      const body = `Name: ${v.name}\nCompany: ${v.company}\nEmail: ${v.email}\nPhone: ${v.phone}\nIndustry: ${v.industry}\nServices: ${v.services.join(", ")}\nLocation: ${v.location ?? "-"}\nStart: ${v.start ?? "-"}\nLanguage: ${lang}\n\n${v.desc}`;
      window.location.href = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent("Quotation Request – " + v.company)}&body=${encodeURIComponent(body)}`;
      setStatus("mailto");
    } else setStatus("noBackend");
  }

  const L = ({ k, children }: { k: keyof typeof t; children?: React.ReactNode }) => (
    <label htmlFor={k} className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-primary">{t[k][lang]}{children}</label>
  );
  const Err = ({ k }: { k: string }) => errors[k] ? <p id={`${k}-err`} className="mt-1 text-xs text-destructive">{errors[k]}</p> : null;
  const aria = (k: string) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-err` : undefined });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 md:grid-cols-2">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div><L k="name" /><input id="name" name="name" className="field" autoComplete="name" {...aria("name")} /><Err k="name" /></div>
      <div><L k="company" /><input id="company" name="company" className="field" autoComplete="organization" {...aria("company")} /><Err k="company" /></div>
      <div><L k="email" /><input id="email" name="email" type="email" className="field" autoComplete="email" {...aria("email")} /><Err k="email" /></div>
      <div><L k="phone" /><input id="phone" name="phone" type="tel" className="field" autoComplete="tel" {...aria("phone")} /><Err k="phone" /></div>
      <div><L k="industry" />
        <select id="industry" name="industry" className="field" defaultValue="" {...aria("industry")}>
          <option value="" disabled>{t.select[lang]}</option>
          {industries.map((i) => <option key={i.key} value={i.name.en}>{i.name[lang]}</option>)}
          <option value="Other">{lang === "id" ? "Lainnya" : "Other"}</option>
        </select><Err k="industry" /></div>
      <div><L k="location" /><input id="location" name="location" className="field" /></div>
      <fieldset className="md:col-span-2" {...aria("services")}>
        <legend className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">{t.services[lang]}</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {services.map((s) => (
            <label key={s.slug} className="flex items-center gap-3 border border-input px-3 py-2.5 text-sm has-[:checked]:border-accent has-[:checked]:bg-muted">
              <input type="checkbox" name="services" value={s.title.en} defaultChecked={defaultService === s.slug} className="accent-[var(--accent)]" />{s.title[lang]}
            </label>
          ))}
        </div><Err k="services" />
      </fieldset>
      <div><L k="start" /><input id="start" name="start" type="date" className="field" /></div>
      <div className="md:col-span-2"><L k="desc" /><textarea id="desc" name="desc" rows={6} className="field" {...aria("desc")} /><Err k="desc" /></div>
      <div className="md:col-span-2">
        <label className="flex items-start gap-3 text-sm text-muted-foreground"><input type="checkbox" name="consent" className="mt-1" {...aria("consent")} />{t.consent[lang]}</label>
        <Err k="consent" />
      </div>
      <div className="md:col-span-2 flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-accent">{t.submit[lang]}</button>
        {whatsappLink(lang) && <a href={whatsappLink(lang)!} target="_blank" rel="noopener noreferrer" className="btn btn-outline">WhatsApp</a>}
      </div>
      <div className="md:col-span-2" aria-live="polite">
        {status === "noBackend" && <SetupNotice>{t.noBackend[lang]}</SetupNotice>}
        {status === "mailto" && <p className="text-sm text-primary">{t.mailto[lang]}</p>}
      </div>
    </form>
  );
}
