import { useEffect, useRef, useState } from "react";

type Audience = "child" | "self" | "abroad" | "b2b";
type ChildAge = "3-5" | "6-11" | "12-16";
type ChildGoal = "communication" | "cambridge" | "study-abroad";
type SelfGoal = "work" | "exam" | "tesol";
type SelfFormat = "center" | "online";
type AbroadStage = "explore" | "application" | "scholarship";

type Answers = {
  audience?: Audience;
  childAge?: ChildAge;
  childGoal?: ChildGoal;
  selfGoal?: SelfGoal;
  selfFormat?: SelfFormat;
  abroadStage?: AbroadStage;
};

type Recommendation = { name: string; desc: string; overlay: string; href: string };

// Mock quiz_mapping — sẽ được thay bằng dữ liệu Supabase khi lên Lovable.
// Mỗi kết quả gồm 1 khóa chính + các khóa cross-sell liên quan.
// Phủ đủ 18 tổ hợp: child (3 tuổi x 3 mục tiêu) + self (3 mục tiêu x 2 hình thức) + abroad (3 giai đoạn).
const MOCK_MAPPING: Record<string, { primary: Recommendation; crossSell: Recommendation[] }> = {
  // ---- Con của tôi (3-5 tuổi) ----
  "child|3-5|communication": {
    primary: { name: "Kindy – E-Pioneer", desc: "Tiếng Anh mầm non, xây dựng nội dung học đầu đời cho bé 3–5 tuổi.", overlay: "from-pink-400/85 to-brand/75", href: "/ngoai-ngu" },
    crossSell: [
      { name: "Bán trú hè – Summer School", desc: "Trải nghiệm hè mỗi năm một chủ đề mới, có dã ngoại hàng tuần.", overlay: "from-amber-300/80 to-orange-400/80", href: "/ngoai-ngu" },
      { name: "Kids – E-Contender / E-Genius", desc: "Lộ trình tiếp theo khi bé lên 6–11 tuổi, đầu ra theo cấp Cambridge.", overlay: "from-pink-300/80 to-brand/70", href: "/ngoai-ngu" },
    ],
  },
  "child|3-5|cambridge": {
    primary: { name: "Kindy – E-Pioneer", desc: "Xây nền tảng tiếng Anh đầu đời trước khi bước vào lộ trình Cambridge chính thức.", overlay: "from-pink-400/85 to-brand/75", href: "/ngoai-ngu" },
    crossSell: [
      { name: "Kids – E-Contender / E-Genius", desc: "Nơi có cam kết đầu ra Cambridge Starters/Movers/Flyers khi bé lên 6–11 tuổi.", overlay: "from-pink-300/80 to-brand/70", href: "/ngoai-ngu" },
      { name: "Thi Cambridge (OSIR)", desc: "Tổ chức thi Cambridge từ Starters, mã trung tâm VN055.", overlay: "from-gold-soft/80 to-gold/80", href: "/ngoai-ngu" },
    ],
  },
  "child|3-5|study-abroad": {
    primary: { name: "Kindy – E-Pioneer", desc: "Xây nền tảng tiếng Anh đầu đời cho hành trình dài hơi sau này.", overlay: "from-pink-400/85 to-brand/75", href: "/ngoai-ngu" },
    crossSell: [
      { name: "Kids – E-Contender / E-Genius", desc: "Lộ trình tiếp theo khi bé lên 6–11 tuổi.", overlay: "from-pink-300/80 to-brand/70", href: "/ngoai-ngu" },
      { name: "Bán trú hè – Summer School", desc: "Trải nghiệm hè, làm quen môi trường học tập năng động.", overlay: "from-amber-300/80 to-orange-400/80", href: "/ngoai-ngu" },
    ],
  },

  // ---- Con của tôi (6-11 tuổi) ----
  "child|6-11|communication": {
    primary: { name: "Kids – E-Contender / E-Genius", desc: "Tiếng Anh tiểu học, phát triển giao tiếp tự nhiên song song đầu ra Cambridge.", overlay: "from-pink-400/85 to-brand/75", href: "/ngoai-ngu" },
    crossSell: [
      { name: "Bán trú hè – Summer School", desc: "Trải nghiệm hè mỗi năm một chủ đề mới, có dã ngoại hàng tuần.", overlay: "from-amber-300/80 to-orange-400/80", href: "/ngoai-ngu" },
      { name: "Teens – NextGen IELTS", desc: "Lộ trình tiếp theo khi con lên cấp 2.", overlay: "from-amber-400/85 to-orange-500/85", href: "/ngoai-ngu" },
    ],
  },
  "child|6-11|cambridge": {
    primary: { name: "Kids – E-Contender / E-Genius", desc: "Lộ trình tiểu học với đầu ra Cambridge Starters/Movers/Flyers.", overlay: "from-pink-400/85 to-brand/75", href: "/ngoai-ngu" },
    crossSell: [
      { name: "Thi Cambridge (OSIR)", desc: "Tổ chức thi Cambridge từ Starters đến PET/KET+, mã trung tâm VN055.", overlay: "from-gold-soft/80 to-gold/80", href: "/ngoai-ngu" },
      { name: "Teens – NextGen IELTS", desc: "Lộ trình tiếp theo khi con lên cấp 2, định hướng IELTS sớm.", overlay: "from-amber-400/85 to-orange-500/85", href: "/ngoai-ngu" },
    ],
  },
  "child|6-11|study-abroad": {
    primary: { name: "Kids – E-Contender / E-Genius", desc: "Xây nền tảng tiếng Anh vững chắc trước khi bước vào lộ trình định hướng du học.", overlay: "from-pink-400/85 to-brand/75", href: "/ngoai-ngu" },
    crossSell: [
      { name: "Teens – NextGen IELTS", desc: "Lộ trình tiếp theo hướng IELTS/du học khi con lên cấp 2.", overlay: "from-amber-400/85 to-orange-500/85", href: "/ngoai-ngu" },
      { name: "Bán trú hè – Summer School", desc: "Trải nghiệm hè, làm quen môi trường học tập quốc tế hóa.", overlay: "from-amber-300/80 to-orange-400/80", href: "/ngoai-ngu" },
    ],
  },

  // ---- Con của tôi (12-16 tuổi) ----
  "child|12-16|communication": {
    primary: { name: "Teens – NextGen IELTS", desc: "Lộ trình dài đến lớp 11, phát triển giao tiếp học thuật song song định hướng IELTS.", overlay: "from-amber-400/85 to-orange-500/85", href: "/ngoai-ngu" },
    crossSell: [
      { name: "Bán trú hè – Summer School", desc: "Trải nghiệm hè, tăng phản xạ giao tiếp thực tế.", overlay: "from-amber-300/80 to-orange-400/80", href: "/ngoai-ngu" },
      { name: "Du học hè – Mỹ / Úc / Canada", desc: "Trải nghiệm ngắn hạn để luyện giao tiếp trong môi trường quốc tế.", overlay: "from-sky-400/80 to-blue-500/80", href: "/du-hoc" },
    ],
  },
  "child|12-16|cambridge": {
    primary: { name: "Teens – NextGen IELTS", desc: "Lộ trình dài đến lớp 11, định hướng chứng chỉ quốc tế – cam kết đầu ra IELTS 5.5/6.5.", overlay: "from-amber-400/85 to-orange-500/85", href: "/ngoai-ngu" },
    crossSell: [
      { name: "Thi Cambridge (OSIR)", desc: "Tổ chức thi Cambridge cấp độ PET/KET+ phù hợp học sinh lớn.", overlay: "from-gold-soft/80 to-gold/80", href: "/ngoai-ngu" },
      { name: "Thi IELTS (OSIR)", desc: "Hội đồng thi IELTS chuẩn quốc tế, tư vấn lịch thi và đăng ký.", overlay: "from-gold-soft/80 to-gold/80", href: "/ngoai-ngu" },
    ],
  },
  "child|12-16|study-abroad": {
    primary: { name: "Teens – NextGen IELTS", desc: "Lộ trình dài đến lớp 11, định hướng IELTS sớm – cam kết đầu ra IELTS 5.5/6.5.", overlay: "from-amber-400/85 to-orange-500/85", href: "/ngoai-ngu" },
    crossSell: [
      { name: "Thi IELTS (OSIR)", desc: "Hội đồng thi IELTS chuẩn quốc tế, tư vấn lịch thi và đăng ký.", overlay: "from-gold-soft/80 to-gold/80", href: "/ngoai-ngu" },
      { name: "Du học dài hạn – VMP", desc: "Tư vấn ngành/trường, hồ sơ, visa cho Mỹ, Úc, Canada, Đài Loan.", overlay: "from-violet-500/85 to-plum/90", href: "/du-hoc" },
    ],
  },

  // ---- Bản thân tôi: giao tiếp công việc ----
  "self|work|center": {
    primary: { name: "Adults – ePlus", desc: "Tiếng Anh giao tiếp cấp tốc tại trung tâm, mỗi buổi một chủ đề thực tế.", overlay: "from-teal-500/85 to-cyan-600/85", href: "/ngoai-ngu" },
    crossSell: [
      { name: "Tiếng Anh Giao Tiếp (GT, online)", desc: "2 tháng, 5 cấp độ, 50% GVNN + 50% GVVN – nếu bạn muốn học online linh hoạt hơn.", overlay: "from-brand/85 to-brand/95", href: "/hoc-online" },
      { name: "ESL FlexTrack – Công sở", desc: "MOOC Corporate English: Grammar, Emails, Communication at work.", overlay: "from-sky-400/80 to-blue-500/80", href: "/hoc-online" },
    ],
  },
  "self|work|online": {
    primary: { name: "Tiếng Anh Giao Tiếp (GT)", desc: "2 tháng, 5 cấp độ, 50% GVNN + 50% GVVN – xóa rào cản sợ nói tiếng Anh.", overlay: "from-brand/85 to-brand/95", href: "/hoc-online" },
    crossSell: [
      { name: "ESL FlexTrack – Công sở", desc: "MOOC Corporate English: Grammar, Emails, Communication at work, có chứng nhận hoàn thành.", overlay: "from-sky-400/80 to-blue-500/80", href: "/hoc-online" },
      { name: "ESL FlexTrack – Ngành nghề", desc: "1-1 online, xây dựng riêng theo ngành (VD Logistics), theo nhu cầu cá nhân.", overlay: "from-sky-500/80 to-indigo-500/80", href: "/hoc-online" },
    ],
  },

  // ---- Bản thân tôi: luyện thi ----
  "self|exam|center": {
    primary: { name: "IELTS Express (tại trung tâm)", desc: "IELTS cấp tốc có cam kết đầu ra, từ 0 lên 6.0 trong 1 năm.", overlay: "from-brand/90 to-brand/95", href: "/ngoai-ngu" },
    crossSell: [
      { name: "IELTS Speaking Booster 1.5", desc: "100% GVNN, chỉ tập trung Speaking, cam kết tăng 1.0 band trong 5 buổi/tuần.", overlay: "from-rose-500/85 to-pink-600/85", href: "/ngoai-ngu" },
      { name: "VSTEP Mastery", desc: "Lộ trình 8–12 tháng tại trung tâm, xây từ A1 đến B2, có cam kết đầu ra.", overlay: "from-sky-400/80 to-blue-500/80", href: "/ngoai-ngu" },
    ],
  },
  "self|exam|online": {
    primary: { name: "IELTS Express Online", desc: "Đối tác IDP + British Council – \"học đâu thi đó\", cam kết đầu ra từng cấp.", overlay: "from-brand/90 to-brand/95", href: "/hoc-online" },
    crossSell: [
      { name: "IELTS Speaking Fast Track 1.5 (FT15)", desc: "12 tuần, 100% GVNN – tăng 1.0–1.5 band Speaking riêng biệt.", overlay: "from-rose-500/85 to-pink-600/85", href: "/hoc-online" },
      { name: "VSTEP E-PATH", desc: "Ôn luyện VSTEP online linh hoạt nếu bạn cần thêm chứng chỉ trong nước.", overlay: "from-sky-400/80 to-blue-500/80", href: "/hoc-online" },
    ],
  },

  // ---- Bản thân tôi: chứng chỉ TESOL ----
  "self|tesol|center": {
    primary: { name: "TESOL 120H / 140H (offline)", desc: "Chứng chỉ giảng dạy tiếng Anh quốc tế, do OSIR tổ chức.", overlay: "from-rose-500/85 to-pink-600/85", href: "/ngoai-ngu" },
    crossSell: [
      { name: "TESOL E-PATH", desc: "Bản online self-paced, chi phí tối ưu, mentoring hàng tháng – nếu bạn cần linh hoạt hơn.", overlay: "from-brand/85 to-brand/95", href: "/hoc-online" },
      { name: "Thi IELTS / Cambridge (OSIR)", desc: "Bổ sung chứng chỉ ngoại ngữ cá nhân song song với chứng chỉ giảng dạy.", overlay: "from-gold-soft/80 to-gold/80", href: "/ngoai-ngu" },
    ],
  },
  "self|tesol|online": {
    primary: { name: "TESOL E-PATH", desc: "Chứng chỉ TESOL 120h INTESOL, kiểm định ALAP UK – self-paced + livestream hàng tuần.", overlay: "from-brand/85 to-brand/95", href: "/hoc-online" },
    crossSell: [
      { name: "TESOL 120H / 140H (offline)", desc: "Nếu bạn muốn có phần teaching practice trực tiếp với trainer.", overlay: "from-rose-500/85 to-pink-600/85", href: "/ngoai-ngu" },
      { name: "Thi IELTS / Cambridge (OSIR)", desc: "Bổ sung chứng chỉ ngoại ngữ cá nhân song song với chứng chỉ giảng dạy.", overlay: "from-gold-soft/80 to-gold/80", href: "/ngoai-ngu" },
    ],
  },

  // ---- Tìm hiểu du học ----
  "abroad|explore": {
    primary: { name: "VMP by VMG – Tư vấn khởi đầu", desc: "Buổi tư vấn định hướng điểm đến và lộ trình du học. [Nội dung chi tiết đang chờ chị Hằng xác nhận]", overlay: "from-violet-500/85 to-plum/90", href: "/du-hoc" },
    crossSell: [
      { name: "Du học hè – Mỹ / Úc / Canada", desc: "Trải nghiệm ngắn hạn 2–4 tuần trước khi quyết định lộ trình dài hạn.", overlay: "from-sky-400/80 to-blue-500/80", href: "/du-hoc" },
      { name: "IELTS Express", desc: "Chuẩn bị nền tảng ngôn ngữ cho hồ sơ du học.", overlay: "from-brand/90 to-brand/95", href: "/ngoai-ngu" },
    ],
  },
  "abroad|application": {
    primary: { name: "Du học dài hạn – VMP", desc: "Tư vấn ngành/trường, hồ sơ nhập học, visa, luyện phỏng vấn, coaching essay. [Nội dung chi tiết đang chờ chị Hằng xác nhận]", overlay: "from-violet-500/85 to-plum/90", href: "/du-hoc" },
    crossSell: [
      { name: "IELTS Express", desc: "Chuẩn bị điểm số ngôn ngữ đáp ứng yêu cầu hồ sơ.", overlay: "from-brand/90 to-brand/95", href: "/ngoai-ngu" },
      { name: "SAT", desc: "4 cấp độ theo mục tiêu điểm, cần thiết cho hồ sơ apply Mỹ.", overlay: "from-indigo-500/80 to-violet-600/80", href: "/ngoai-ngu" },
    ],
  },
  "abroad|scholarship": {
    primary: { name: "Du học dài hạn – VMP", desc: "Đồng hành tìm học bổng, đặc biệt tại Mỹ – add-on học bổng quốc tế nhiều nhất. [Nội dung chi tiết đang chờ chị Hằng xác nhận]", overlay: "from-violet-500/85 to-plum/90", href: "/du-hoc" },
    crossSell: [
      { name: "SAT", desc: "4 cấp độ theo mục tiêu điểm – yếu tố quan trọng trong hồ sơ học bổng Mỹ.", overlay: "from-indigo-500/80 to-violet-600/80", href: "/ngoai-ngu" },
      { name: "IELTS Express", desc: "Đáp ứng điều kiện ngôn ngữ cho hồ sơ học bổng.", overlay: "from-brand/90 to-brand/95", href: "/ngoai-ngu" },
    ],
  },
};

function buildAnswerKey(a: Answers): string | null {
  if (a.audience === "child" && a.childAge && a.childGoal) return `child|${a.childAge}|${a.childGoal}`;
  if (a.audience === "self" && a.selfGoal && a.selfFormat) return `self|${a.selfGoal}|${a.selfFormat}`;
  if (a.audience === "abroad" && a.abroadStage) return `abroad|${a.abroadStage}`;
  return null;
}

const OptionButton = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
  <button
    type="button"
    onClick={onClick}
    className="text-left rounded-2xl border-2 border-neutral-200 bg-white px-5 py-4 text-sm font-semibold text-neutral-800 transition-all hover:-translate-y-0.5 hover:border-brand/60 hover:shadow-md"
  >
    {children}
  </button>
);

function ProgressNav({ onBack, onExit, stepLabel }: { onBack?: () => void; onExit: () => void; stepLabel: string }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-2">
        {onBack && (
          <button onClick={onBack} className="text-xs font-semibold text-neutral-500 hover:text-brand">
            ← Quay lại
          </button>
        )}
        <span className="text-xs font-medium text-neutral-500">{stepLabel}</span>
      </div>
      <button onClick={onExit} className="text-xs font-semibold text-neutral-500 hover:text-brand">
        ✕ Thoát
      </button>
    </div>
  );
}

export function Quiz() {
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState<"audience" | "q1" | "q2" | "result" | "b2b">("audience");
  const reset = () => { setAnswers({}); setStep("audience"); };
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (step === "result") {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step]);

  return (
    <>
    <section id="quiz" className="container-vmg py-14 md:py-20">
      <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
        <div className="rounded-3xl bg-cream border border-black/5 p-6 md:p-10 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand">Cá nhân hóa 60 giây</span>
              <h2 className="mt-2 text-2xl md:text-3xl font-display font-extrabold">
                Tìm đúng chương trình VMG cho bạn
              </h2>
            </div>
            {step !== "audience" && (
              <button onClick={reset} className="hidden md:inline text-xs font-semibold text-neutral-500 hover:text-brand">
                ✕ Bắt đầu lại
              </button>
            )}
          </div>

          {step === "audience" && (
            <div>
              <h3 className="text-lg md:text-xl font-display font-bold mb-4">Bạn đang tìm chương trình học cho ai?</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <OptionButton onClick={() => { setAnswers({ audience: "child" }); setStep("q1"); }}>👨‍👩‍👧 Con của tôi</OptionButton>
                <OptionButton onClick={() => { setAnswers({ audience: "self" }); setStep("q1"); }}>👤 Bản thân tôi</OptionButton>
                <OptionButton onClick={() => { setAnswers({ audience: "abroad" }); setStep("q1"); }}>✈️ Tìm hiểu du học</OptionButton>
                <OptionButton onClick={() => { setAnswers({ audience: "b2b" }); setStep("b2b"); }}>🏫 Trường học / Doanh nghiệp</OptionButton>
              </div>
            </div>
          )}

          {step === "q1" && answers.audience === "child" && (
            <div>
              <ProgressNav onBack={() => setStep("audience")} onExit={reset} stepLabel="Bước 2/3" />
              <h3 className="text-lg md:text-xl font-display font-bold mb-4">Con của bạn đang ở độ tuổi nào?</h3>
              <div className="grid sm:grid-cols-3 gap-3">
                {(["3-5", "6-11", "12-16"] as ChildAge[]).map((v) => (
                  <OptionButton key={v} onClick={() => { setAnswers((a) => ({ ...a, childAge: v })); setStep("q2"); }}>{v} tuổi</OptionButton>
                ))}
              </div>
            </div>
          )}
          {step === "q2" && answers.audience === "child" && (
            <div>
              <ProgressNav onBack={() => setStep("q1")} onExit={reset} stepLabel="Bước 3/3" />
              <h3 className="text-lg md:text-xl font-display font-bold mb-4">Mục tiêu chính của gia đình là gì?</h3>
              <div className="grid sm:grid-cols-3 gap-3">
                <OptionButton onClick={() => { setAnswers((a) => ({ ...a, childGoal: "communication" })); setStep("result"); }}>💬 Giao tiếp tự tin</OptionButton>
                <OptionButton onClick={() => { setAnswers((a) => ({ ...a, childGoal: "cambridge" })); setStep("result"); }}>🏅 Cambridge / Quốc tế</OptionButton>
                <OptionButton onClick={() => { setAnswers((a) => ({ ...a, childGoal: "study-abroad" })); setStep("result"); }}>🌍 Nền tảng du học</OptionButton>
              </div>
            </div>
          )}

          {step === "q1" && answers.audience === "self" && (
            <div>
              <ProgressNav onBack={() => setStep("audience")} onExit={reset} stepLabel="Bước 2/3" />
              <h3 className="text-lg md:text-xl font-display font-bold mb-4">Mục tiêu học tập của bạn?</h3>
              <div className="grid sm:grid-cols-3 gap-3">
                <OptionButton onClick={() => { setAnswers((a) => ({ ...a, selfGoal: "work" })); setStep("q2"); }}>💼 Giao tiếp công việc</OptionButton>
                <OptionButton onClick={() => { setAnswers((a) => ({ ...a, selfGoal: "exam" })); setStep("q2"); }}>📝 IELTS/TOEIC/VSTEP</OptionButton>
                <OptionButton onClick={() => { setAnswers((a) => ({ ...a, selfGoal: "tesol" })); setStep("q2"); }}>🎓 Chứng chỉ TESOL</OptionButton>
              </div>
            </div>
          )}
          {step === "q2" && answers.audience === "self" && (
            <div>
              <ProgressNav onBack={() => setStep("q1")} onExit={reset} stepLabel="Bước 3/3" />
              <h3 className="text-lg md:text-xl font-display font-bold mb-4">Bạn muốn học theo hình thức nào?</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <OptionButton onClick={() => { setAnswers((a) => ({ ...a, selfFormat: "center" as SelfFormat })); setStep("result"); }}>🏫 Tại trung tâm</OptionButton>
                <OptionButton onClick={() => { setAnswers((a) => ({ ...a, selfFormat: "online" as SelfFormat })); setStep("result"); }}>💻 Học online</OptionButton>
              </div>
            </div>
          )}

          {step === "q1" && answers.audience === "abroad" && (
            <div>
              <ProgressNav onBack={() => setStep("audience")} onExit={reset} stepLabel="Bước 2/2" />
              <h3 className="text-lg md:text-xl font-display font-bold mb-4">Bạn đang ở giai đoạn nào?</h3>
              <div className="grid sm:grid-cols-3 gap-3">
                {([
                  ["explore", "🔎 Mới tìm hiểu"],
                  ["application", "📁 Cần làm hồ sơ"],
                  ["scholarship", "🏆 Tìm học bổng"],
                ] as [AbroadStage, string][]).map(([v, label]) => (
                  <OptionButton key={v} onClick={() => { setAnswers((a) => ({ ...a, abroadStage: v })); setStep("result"); }}>{label}</OptionButton>
                ))}
              </div>
            </div>
          )}

          {step === "b2b" && (
            <div>
              <ProgressNav onBack={() => setStep("audience")} onExit={reset} stepLabel="Trường học / Doanh nghiệp" />
              <p className="text-sm text-neutral-600 mb-4">
                VMG có chương trình riêng cho trường học và doanh nghiệp: đào tạo tiếng Anh in-house, hoạt động ngoại khóa.
              </p>
              <form className="grid gap-3" onSubmit={(e) => e.preventDefault()}>
                <input placeholder="Tên trường / công ty" className="rounded-xl border border-neutral-200 px-4 py-3 text-sm" />
                <div className="grid sm:grid-cols-2 gap-3">
                  <input placeholder="Người liên hệ" className="rounded-xl border border-neutral-200 px-4 py-3 text-sm" />
                  <input placeholder="Số điện thoại" className="rounded-xl border border-neutral-200 px-4 py-3 text-sm" />
                </div>
                <label className="flex items-start gap-2 text-xs text-neutral-500">
                  <input type="checkbox" className="mt-0.5" />
                  Tôi đồng ý với <a href="#" className="underline text-brand">Chính sách bảo mật và xử lý dữ liệu cá nhân</a>
                </label>
                <button className="rounded-full bg-brand text-white px-6 py-3 text-sm font-bold w-fit">Gửi yêu cầu hợp tác</button>
              </form>
            </div>
          )}

          {step === "result" && (
            <div>
              <ProgressNav onBack={() => setStep("q2")} onExit={reset} stepLabel="Hoàn tất" />
              <div className="rounded-2xl border border-dashed border-brand/30 bg-white p-6 text-center">
                <div className="text-2xl">✓</div>
                <p className="mt-2 text-sm font-semibold text-neutral-800">Đã tìm thấy gợi ý phù hợp cho bạn!</p>
                <p className="mt-1 text-xs text-neutral-500">Xem chi tiết chương trình được đề xuất ở phần bên dưới ↓</p>
              </div>
            </div>
          )}
        </div>

        <aside className="rounded-3xl bg-white border border-black/5 p-6 shadow-sm lg:sticky lg:top-24">
          <div className="text-xs font-bold uppercase tracking-widest text-gold">Không muốn làm quiz?</div>
          <h3 className="mt-2 text-lg font-display font-extrabold leading-snug">Xem trực tiếp toàn bộ chương trình</h3>
          <p className="mt-2 text-sm text-neutral-500">
            Duyệt qua tất cả lộ trình VMG từ mầm non, thiếu niên đến người lớn – IELTS, du học, hướng nghiệp.
          </p>
          <a href="#chuong-trinh" className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand text-white px-4 py-2.5 text-sm font-semibold hover:bg-brand-dark transition-colors">
            Xem toàn bộ chương trình →
          </a>
        </aside>
      </div>
    </section>

    {step === "result" && (() => {
      const key = buildAnswerKey(answers);
      const match = key ? MOCK_MAPPING[key] : null;
      return (
        <section ref={resultRef} id="quiz-ket-qua" className="container-vmg pb-16 md:pb-24 scroll-mt-24">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-brand">Gợi ý dành riêng cho bạn</span>
            <h2 className="mt-3 text-2xl md:text-3xl font-display font-extrabold">
              Dựa trên câu trả lời của bạn, VMG đề xuất các chương trình sau
            </h2>
          </div>

          <div className="mt-8 max-w-4xl mx-auto">
            {match ? (
              <>
                <div className="relative rounded-3xl overflow-hidden shadow-md min-h-[200px]">
                  <div className={`absolute inset-0 bg-gradient-to-br ${match.primary.overlay}`} />
                  <div className="relative h-full flex flex-col p-6 md:p-7 text-white">
                    <span className="inline-block w-fit text-[10px] font-bold uppercase tracking-widest bg-white/20 backdrop-blur px-2.5 py-1 rounded-full">
                      Phù hợp nhất với bạn
                    </span>
                    <h4 className="mt-3 text-xl md:text-2xl font-display font-extrabold">{match.primary.name}</h4>
                    <p className="mt-2 text-sm text-white/90 max-w-2xl">{match.primary.desc}</p>
                    <a href={match.primary.href} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold underline w-fit">
                      Xem chi tiết chương trình này →
                    </a>
                  </div>
                </div>

                <div className="mt-4 text-sm font-semibold text-neutral-500">Có thể bạn cũng quan tâm</div>
                <div className="mt-3 grid sm:grid-cols-2 gap-4">
                  {match.crossSell.map((c) => (
                    <div key={c.name} className="relative rounded-2xl overflow-hidden shadow-sm min-h-[140px]">
                      <div className={`absolute inset-0 bg-gradient-to-br ${c.overlay}`} />
                      <div className="relative h-full flex flex-col p-5 text-white">
                        <h5 className="font-display font-bold">{c.name}</h5>
                        <p className="mt-1 text-xs text-white/85 flex-1">{c.desc}</p>
                        <a href={c.href} className="mt-3 inline-flex items-center gap-1 text-xs font-semibold underline w-fit">
                          Xem chi tiết →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="rounded-3xl bg-cream border border-black/5 p-6 md:p-7">
                <div className="text-xs font-bold text-brand mb-2">✓ Gợi ý dành cho bạn</div>
                <h4 className="text-xl md:text-2xl font-display font-extrabold">VMG có nhiều chương trình phù hợp</h4>
                <p className="mt-2 text-sm text-neutral-600">Để lại thông tin để được tư vấn cụ thể theo nhu cầu của bạn.</p>
              </div>
            )}

            <div className="mt-6 rounded-3xl bg-white border border-neutral-200 p-6 md:p-7 shadow-sm">
              <div className="text-sm font-semibold text-neutral-700 mb-3">Để lại thông tin, VMG sẽ liên hệ tư vấn chi tiết:</div>
              <form className="grid sm:grid-cols-2 gap-3" onSubmit={(e) => e.preventDefault()}>
                <input placeholder="Họ và tên" className="rounded-xl border border-neutral-200 px-4 py-3 text-sm" />
                <input placeholder="Số điện thoại" className="rounded-xl border border-neutral-200 px-4 py-3 text-sm" />
                <label className="sm:col-span-2 flex items-start gap-2 text-xs text-neutral-500">
                  <input type="checkbox" className="mt-0.5" />
                  Tôi đồng ý với <a href="#" className="underline text-brand">Chính sách bảo mật và xử lý dữ liệu cá nhân</a>
                </label>
                <button className="sm:col-span-2 rounded-full bg-brand text-white px-6 py-3 text-sm font-bold w-fit">Nhận tư vấn miễn phí</button>
              </form>
            </div>
          </div>
        </section>
      );
    })()}
    </>
  );
}
