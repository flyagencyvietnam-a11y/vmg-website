import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { LeadCaptureForm } from "../components/LeadCaptureForm";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import { COMPANY } from "../data/company";

export default function LienHe() {
  useDocumentMeta(
    "Liên hệ VMG | Việt Nam",
    "Liên hệ Hệ thống giáo dục và đào tạo Việt Mỹ VMG - để lại thông tin để được tư vấn chương trình phù hợp."
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="container-vmg py-14 md:py-20">
          <span className="text-xs font-bold uppercase tracking-widest text-brand">Liên hệ</span>
          <h1 className="mt-3 text-3xl md:text-5xl font-display font-extrabold max-w-2xl">
            Để lại thông tin, VMG sẽ liên hệ tư vấn
          </h1>
        </section>

        <section className="container-vmg pb-16 md:pb-24 grid lg:grid-cols-[1fr_400px] gap-10">
          <div className="max-w-xl">
            <LeadCaptureForm source="lien-he" title="Thông tin liên hệ" />
          </div>

          <div className="rounded-3xl bg-cream border border-black/5 p-6 md:p-7">
            <h2 className="font-display font-bold text-lg mb-4">Thông tin VMG</h2>
            <ul className="space-y-3 text-sm text-neutral-600">
              <li><span className="block font-bold text-neutral-900">Trụ sở chính</span>{COMPANY.headquarters}</li>
              <li><span className="block font-bold text-neutral-900">Văn phòng đại diện</span>{COMPANY.office}</li>
              <li><a className="text-brand font-bold" href={COMPANY.hotlineHref}>Hotline: {COMPANY.hotline}</a></li>
              <li><a href={COMPANY.mobileHref}>{COMPANY.mobile}</a></li>
              <li><a className="text-brand" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></li>
              <li className="flex flex-wrap gap-4"><a href={COMPANY.zalo} target="_blank" rel="noreferrer" className="underline">Zalo</a><a href={COMPANY.messenger} target="_blank" rel="noreferrer" className="underline">Messenger</a><a href={COMPANY.facebook} target="_blank" rel="noreferrer" className="underline">Facebook</a></li>
              <li><a href="/he-thong-trung-tam" className="font-bold text-brand">Tìm trung tâm &amp; chỉ đường →</a></li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
