import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import { COMPANY, TEACHERS } from "../data/company";

export default function DoiNguGiaoVien() {
  useDocumentMeta("Đội ngũ giáo viên | VMG", "Tìm hiểu đội ngũ giáo viên VMG, nền tảng chuyên môn và tỷ lệ giáo viên nước ngoài theo từng chương trình.");
  return <div className="min-h-screen flex flex-col"><Header /><main className="flex-1">
    <section className="bg-cream py-14 md:py-20"><div className="container-vmg grid gap-10 lg:grid-cols-2 items-center">
      <div><p className="text-xs uppercase tracking-widest font-bold text-brand">Đội ngũ giáo viên</p><h1 className="mt-3 font-display text-3xl md:text-5xl font-extrabold">Con người làm nên chất lượng giáo dục</h1><p className="mt-6 text-neutral-600 leading-7">VMG coi giáo viên là nhân tố cốt lõi của chất lượng đào tạo. Quy trình tuyển dụng và đào tạo được chú trọng để xây dựng đội ngũ giáo viên trong và ngoài nước có chuyên môn, sáng tạo và tâm huyết.</p></div>
      <figure><img src="/legacy/team-bien-hoa.jpg" alt="Ảnh tập thể tại trung tâm VMG Biên Hòa" className="w-full aspect-[4/3] rounded-3xl object-cover" /><figcaption className="mt-3 text-xs text-neutral-500">Hình ảnh tại trung tâm VMG Biên Hòa.</figcaption></figure>
    </div></section>
    <section className="container-vmg py-12"><div className="grid gap-5 md:grid-cols-2">
      <a href="/hoc-online/ielts-speaking-fast-track" className="rounded-3xl bg-brand p-7 text-white"><p className="text-4xl font-display font-extrabold">100% GVNN</p><h2 className="mt-3 font-bold">IELTS Speaking Fast Track 1.5</h2><p className="mt-2 text-sm text-white/80">Luyện Speaking cùng giáo viên nước ngoài.</p></a>
      <div className="rounded-3xl bg-cream p-7"><p className="text-4xl font-display font-extrabold text-brand">50% + 50%</p><h2 className="mt-3 font-bold">Tiếng Anh Giao Tiếp online</h2><p className="mt-2 text-sm text-neutral-600">50% giáo viên nước ngoài và 50% giáo viên Việt Nam.</p></div>
    </div></section>
    <section className="container-vmg pb-16 md:pb-24"><h2 className="text-2xl md:text-3xl font-display font-extrabold">Hồ sơ giảng viên</h2><p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-500">Các hồ sơ được VMG giới thiệu trên website. Giáo viên phụ trách được bố trí theo lớp và lịch học; vui lòng liên hệ tư vấn để biết thông tin lớp bạn quan tâm.</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{TEACHERS.map((teacher) => <article key={teacher.name} className="rounded-3xl border border-neutral-200 p-6 bg-white">
        <div aria-hidden="true" className="grid h-14 w-14 place-items-center rounded-2xl bg-brand/10 text-brand font-display text-lg font-bold">{teacher.name.split(" ").map((part) => part[0]).slice(0,2).join("")}</div>
        <h3 className="mt-5 font-display text-lg font-bold">{teacher.name}</h3><p className="mt-3 text-sm text-neutral-600">Quốc tịch: {teacher.nationality}</p><p className="mt-2 text-sm text-neutral-600">{teacher.qualification}</p>
      </article>)}</div>
      <a href={COMPANY.source} target="_blank" rel="noreferrer" className="mt-6 inline-block text-xs text-neutral-500 underline">Hồ sơ theo trang giới thiệu VMG</a>
    </section>
  </main><Footer /></div>;
}
