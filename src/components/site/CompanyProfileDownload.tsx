import { Link } from "@tanstack/react-router";
import { Download, FileText } from "lucide-react";
import { ui, useLang } from "@/i18n";
import { siteConfig } from "@/config/site";
import { SetupNotice } from "./blocks";
import hero from "@/assets/hero.jpg";

export function CompanyProfileDownload() {
  const lang = useLang();
  const pdf = siteConfig.companyProfilePdf;
  return (
    <div className="grid gap-10 md:grid-cols-12 md:items-center">
      <div className="relative md:col-span-5">
        <div className="relative mx-auto aspect-[3/4] max-w-xs overflow-hidden bg-navy shadow-2xl">
          <img src={hero} alt="" loading="lazy" width={1920} height={1088} className="h-1/2 w-full object-cover" />
          <div className="p-6 text-on-dark">
            <p className="font-display text-lg font-extrabold">PT. NAFAZ <span className="text-accent">SANDBLASTING</span> INDONESIA</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-on-dark-muted">Company Profile</p>
            <FileText className="mt-6 h-6 w-6 text-accent" aria-hidden />
          </div>
        </div>
      </div>
      <div className="md:col-span-7">
        <p className="eyebrow">Company Profile</p>
        <h2 className="mt-4 text-3xl font-extrabold text-primary md:text-5xl">{lang === "id" ? "Kenali PT. NAFAZ SANDBLASTING INDONESIA Lebih Dekat" : "Learn More About PT. NAFAZ SANDBLASTING INDONESIA"}</h2>
        <p className="mt-5 text-lg text-muted-foreground">
          {lang === "id"
            ? "Company profile memuat ringkasan layanan, kapabilitas, pendekatan K3 dan mutu, serta informasi perusahaan untuk kebutuhan evaluasi vendor."
            : "The company profile summarises our services, capabilities, HSE and quality approach, and company information for vendor evaluation."}
        </p>
        {siteConfig.companyProfileUpdated && <p className="mt-2 text-sm text-muted-foreground">{lang === "id" ? "Diperbarui" : "Updated"}: {siteConfig.companyProfileUpdated}</p>}
        <div className="mt-8 flex flex-wrap gap-3">
          {pdf ? <a href={pdf} download className="btn btn-navy"><Download className="h-4 w-4" />{ui.cta.download[lang]}</a> : null}
          <Link to="/$lang/contact" params={{ lang }} className="btn btn-outline">{ui.cta.contactTeam[lang]}</Link>
        </div>
        {!pdf && (
          <div className="mt-6"><SetupNotice>{lang === "id" ? "Dokumen company profile resmi belum diunggah. Administrator perlu mengunggah PDF resmi agar tombol unduh aktif." : "The official company profile PDF has not been uploaded yet. An administrator must upload the official document to enable downloads."}</SetupNotice></div>
        )}
      </div>
    </div>
  );
}
