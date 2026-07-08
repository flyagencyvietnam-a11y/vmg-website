import { useState } from "react";

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

// Mock quiz_mapping — sẽ được thay bằng dữ liệu Supabase khi lên Lovable
const MOCK_MAPPING: Record<string, { name: string; desc: string }> = {
  "child|3-5|communication": { name: "VMG Kids – Mầm non", desc: "Làm quen tiếng Anh qua trò chơi, âm nhạc, phản xạ tự nhiên cho bé 3–5 tuổi." },
  "child|6-11|cambridge": { name: "VMG Kids – Cambridge Track", desc: "Lộ trình luyện thi Cambridge Starters–Movers–Flyers cho thiếu nhi." },
  "child|12-16|study-abroad": { name: "VMG Teens – Du học Foundation", desc: "Chuẩn bị nền tảng tiếng Anh học thuật cho lộ trình du học cấp 3." },
  "self|exam|center": { name: "IELTS Programs tại trung tâm", desc: "Luyện thi IELTS 0–7.5+ với giáo viên tại trung tâm VMG." },
  "self|exam|online": { name: "IELTS Express Online", desc: "Luyện thi IELTS trực tuyến linh hoạt thời gian." },
  "self|tesol|center": { name: "VMG TESOL", desc: "Chứng chỉ giảng dạy tiếng Anh quốc tế TESOL." },
  "abroad|explore": { name: "VMP by VMG – Tư vấn khởi đầu", desc: "Buổi tư vấn định hướng điểm đến và lộ trình du học." },
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

  return (
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

          {step === "result" && (() => {
            const key = buildAnswerKey(answers);
            const match = key ? MOCK_MAPPING[key] : null;
            return (
              <div>
                <ProgressNav onBack={() => setStep("q2")} onExit={reset} stepLabel="Kết quả gợi ý" />
                <div className="rounded-2xl bg-white border border-neutral-200 p-5 md:p-6">
                  <div className="text-xs font-bold text-brand mb-2">✓ Gợi ý dành cho bạn</div>
                  <h4 className="text-xl md:text-2xl font-display font-extrabold">
                    {match?.name ?? "VMG có nhiều chương trình phù hợp"}
                  </h4>
                  <p className="mt-2 text-sm text-neutral-600">
                    {match?.desc ?? "Để lại thông tin để được tư vấn cụ thể theo nhu cầu của bạn."}
                  </p>
                  <form className="mt-5 grid gap-3" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <input placeholder="Họ và tên" className="rounded-xl border border-neutral-200 px-4 py-3 text-sm" />
                      <input placeholder="Số điện thoại" className="rounded-xl border border-neutral-200 px-4 py-3 text-sm" />
                    </div>
                    <label className="flex items-start gap-2 text-xs text-neutral-500">
                      <input type="checkbox" className="mt-0.5" />
                      Tôi đồng ý với <a href="#" className="underline text-brand">Chính sách bảo mật và xử lý dữ liệu cá nhân</a>
                    </label>
                    <button className="rounded-full bg-brand text-white px-6 py-3 text-sm font-bold w-fit">Nhận tư vấn miễn phí</button>
                  </form>
                </div>
              </div>
            );
          })()}
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
  );
}
