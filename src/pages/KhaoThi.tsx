import { Award, CheckCircle2, ChevronRight, ClipboardCheck, Headphones, Languages, MapPin } from "lucide-react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { LeadCaptureForm } from "../components/LeadCaptureForm";
import { useDocumentMeta } from "../lib/useDocumentMeta";

type JourneyStep = {
  title: string;
  description: string;
};

const IELTS_JOURNEY: JourneyStep[] = [
  {
    title: "Chọn nhu cầu thi",
    description: "Chọn đăng ký thi IELTS chính thức hoặc IELTS Mocktest để kiểm tra năng lực trước kỳ thi thật.",
  },
  {
    title: "Để lại thông tin",
    description: "Gửi thông tin liên hệ để đội ngũ VMG tư vấn lịch thi, hồ sơ và lệ phí đang áp dụng.",
  },
  {
    title: "Hoàn tất đăng ký",
    description: "Xác nhận phương án phù hợp và hoàn thiện thủ tục theo hướng dẫn của đơn vị tổ chức kỳ thi.",
  },
  {
    title: "Dự thi & nhận kết quả",
    description: "Tham dự kỳ thi và nhận kết quả theo quy trình chính thức của đơn vị tổ chức.",
  },
];

const CAMBRIDGE_JOURNEY: JourneyStep[] = [
  {
    title: "Xác định cấp độ thi",
    description: "Phụ huynh hoặc thí sinh chọn kỳ thi Cambridge phù hợp, từ Starters đến PET/KET+.",
  },
  {
    title: "Đăng ký tư vấn",
    description: "Gửi thông tin để VMG hỗ trợ kiểm tra cấp độ, lịch thi, hồ sơ và lệ phí đang áp dụng.",
  },
  {
    title: "Hoàn thiện hồ sơ",
    description: "Xác nhận kỳ thi và hoàn tất thủ tục theo hướng dẫn của trung tâm khảo thí ủy quyền VN055.",
  },
  {
    title: "Dự thi & nhận kết quả",
    description: "Tham dự kỳ thi Cambridge và nhận kết quả theo quy trình chính thức của Cambridge English.",
  },
];

function Journey({ steps, tone }: { steps: JourneyStep[]; tone: "brand" | "plum" }) {
  const color = tone === "brand" ? "bg-brand text-white" : "bg-plum text-white";

  return (
    <ol className="mt-7 grid gap-4 sm:grid-cols-2">
      {steps.map((step, index) => (
        <li key={step.title} className="relative rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
          <span className={`grid h-9 w-9 place-items-center rounded-full text-sm font-extrabold ${color}`}>
            {index + 1}
          </span>
          <h3 className="mt-4 font-display text-base font-extrabold">{step.title}</h3>
          <p className="mt-2 text-sm leading-6 text-neutral-600">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}

export default function KhaoThi() {
  useDocumentMeta(
    "Khảo thí IELTS & Cambridge tại VMG | VN055",
    "Đăng ký tư vấn thi IELTS, IELTS Mocktest và thi Cambridge từ Starters đến PET/KET+ tại VMG, trung tâm khảo thí ủy quyền Cambridge VN055."
  );

  return (
    <div className="min-h-screen bg-[#fffdf9] flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="hero-surface relative isolate overflow-hidden">
          <div className="hero-orb hero-orb-one" aria-hidden="true" />
          <div className="hero-orb hero-orb-two" aria-hidden="true" />
          <div className="container-vmg py-16 md:py-24">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-[.2em] text-brand">Khảo thí VMG</span>
              <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight md:text-6xl">
                Chọn đúng kỳ thi.<br />
                <span className="text-brand">Theo đúng hành trình.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-600 md:text-lg">
                Khảo thí được tách thành hai nhóm riêng: thi IELTS và thi Cambridge. Mỗi nhóm có quy trình tư vấn, đăng ký và hỗ trợ phù hợp với thí sinh.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#thi-ielts" className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand/20 hover:bg-brand-dark">
                  Thi IELTS <ChevronRight className="h-4 w-4" />
                </a>
                <a href="#thi-cambridge" className="inline-flex items-center gap-2 rounded-full border-2 border-plum bg-white px-6 py-3 text-sm font-bold text-plum hover:bg-plum hover:text-white">
                  Thi Cambridge <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-black/5 bg-white">
          <div className="container-vmg grid gap-5 py-8 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <ClipboardCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              <div><strong className="text-sm">Hai hành trình độc lập</strong><p className="mt-1 text-xs leading-5 text-neutral-500">Không lẫn giữa khóa học và dịch vụ đăng ký thi.</p></div>
            </div>
            <div className="flex items-start gap-3">
              <Languages className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              <div><strong className="text-sm">Đối tác IELTS</strong><p className="mt-1 text-xs leading-5 text-neutral-500">IDP Platinum Partner và British Council.</p></div>
            </div>
            <div className="flex items-start gap-3">
              <Award className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              <div><strong className="text-sm">Cambridge English</strong><p className="mt-1 text-xs leading-5 text-neutral-500">Đối tác khảo thí ủy quyền, mã trung tâm VN055.</p></div>
            </div>
          </div>
        </section>

        <section id="thi-ielts" className="scroll-mt-24 py-16 md:py-24">
          <div className="container-vmg">
            <div className="grid gap-10 lg:grid-cols-[1fr_390px] lg:items-start">
              <div>
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand text-white"><Headphones className="h-6 w-6" /></span>
                  <div><span className="text-xs font-bold uppercase tracking-widest text-brand">Nhóm 01</span><h2 className="font-display text-3xl font-extrabold md:text-4xl">Thi IELTS</h2></div>
                </div>
                <p className="mt-5 max-w-2xl leading-7 text-neutral-600">
                  Dành cho thí sinh cần hỗ trợ đăng ký thi IELTS chính thức hoặc muốn tham gia IELTS Mocktest trước kỳ thi thật. VMG là đối tác của cả IDP và British Council.
                </p>
                <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold">
                  <span className="rounded-full bg-brand/10 px-3 py-2 text-brand">Thi IELTS</span>
                  <span className="rounded-full bg-brand/10 px-3 py-2 text-brand">IELTS Mocktest</span>
                  <span className="rounded-full bg-brand/10 px-3 py-2 text-brand">IDP + British Council</span>
                </div>
                <Journey steps={IELTS_JOURNEY} tone="brand" />
              </div>
              <div id="dang-ky-ielts" className="scroll-mt-24 lg:sticky lg:top-24">
                <LeadCaptureForm
                  source="khao_thi_ielts"
                  extra={{ exam_group: "ielts" }}
                  title="Nhận tư vấn thi IELTS"
                  submitLabel="Đăng ký tư vấn IELTS"
                />
                <p className="mt-3 px-2 text-xs leading-5 text-neutral-500">Lịch thi và lệ phí sẽ được tư vấn theo thông tin chính thức đang áp dụng.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="thi-cambridge" className="scroll-mt-24 bg-cream py-16 md:py-24">
          <div className="container-vmg">
            <div className="grid gap-10 lg:grid-cols-[1fr_390px] lg:items-start">
              <div>
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-plum text-white"><Award className="h-6 w-6" /></span>
                  <div><span className="text-xs font-bold uppercase tracking-widest text-plum">Nhóm 02</span><h2 className="font-display text-3xl font-extrabold md:text-4xl">Thi Cambridge</h2></div>
                </div>
                <p className="mt-5 max-w-2xl leading-7 text-neutral-600">
                  Dành cho phụ huynh và thí sinh cần đăng ký các kỳ thi Cambridge English từ Starters đến PET/KET+. VMG là đối tác khảo thí ủy quyền Cambridge English, mã trung tâm VN055.
                </p>
                <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold">
                  <span className="rounded-full bg-plum/10 px-3 py-2 text-plum">Starters</span>
                  <span className="rounded-full bg-plum/10 px-3 py-2 text-plum">Movers</span>
                  <span className="rounded-full bg-plum/10 px-3 py-2 text-plum">Flyers</span>
                  <span className="rounded-full bg-plum/10 px-3 py-2 text-plum">PET/KET+</span>
                  <span className="rounded-full bg-plum/10 px-3 py-2 text-plum">VN055</span>
                </div>
                <Journey steps={CAMBRIDGE_JOURNEY} tone="plum" />
              </div>
              <div id="dang-ky-cambridge" className="scroll-mt-24 lg:sticky lg:top-24">
                <LeadCaptureForm
                  source="khao_thi_cambridge"
                  extra={{ exam_group: "cambridge" }}
                  title="Nhận tư vấn thi Cambridge"
                  submitLabel="Đăng ký tư vấn Cambridge"
                />
                <p className="mt-3 px-2 text-xs leading-5 text-neutral-500">Lịch thi, hồ sơ và lệ phí sẽ được tư vấn theo thông tin chính thức đang áp dụng.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-12">
          <div className="container-vmg flex flex-col items-start justify-between gap-5 rounded-3xl border border-black/5 p-7 md:flex-row md:items-center">
            <div className="flex gap-3"><MapPin className="mt-1 h-5 w-5 shrink-0 text-brand" /><div><h2 className="font-display text-xl font-extrabold">Chưa biết nên bắt đầu từ đâu?</h2><p className="mt-1 text-sm text-neutral-600">Để lại thông tin ở đúng nhóm kỳ thi phía trên để được hướng dẫn theo nhu cầu của bạn.</p></div></div>
            <a href="#thi-ielts" className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-brand">Chọn nhóm kỳ thi <CheckCircle2 className="h-4 w-4" /></a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
