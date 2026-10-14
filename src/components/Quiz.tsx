import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase";
import { LeadCaptureForm } from "./LeadCaptureForm";
import { B2BLeadForm } from "./B2BLeadForm";
import { QUIZ_FALLBACK_MAPPING } from "../data/quizFallback";
import { ArrowRight } from "lucide-react";

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
type QuizResult = { primary: Recommendation; crossSell: Recommendation[] } | null;

function buildAnswerKey(a: Answers): string | null {
  if (a.audience === "child" && a.childAge && a.childGoal) return `child|${a.childAge}|${a.childGoal}`;
  if (a.audience === "self" && a.selfGoal && a.selfFormat) return `self|${a.selfGoal}|${a.selfFormat}`;
  if (a.audience === "abroad" && a.abroadStage) return `abroad|${a.abroadStage}`;
  return null;
}

async function fetchQuizResult(key: string): Promise<QuizResult> {
  const fallback = QUIZ_FALLBACK_MAPPING[key] ?? null;
  try {
  const { data: mapping, error: mappingError } = await supabase
    .from("quiz_mapping")
    .select("id, primary_product_name_override, primary_product_desc_override, products(name, description, gradient_class, cta_href)")
    .eq("answer_key", key)
    .maybeSingle();

  if (mappingError || !mapping) return fallback;

  const product = mapping.products as unknown as { name: string; description: string | null; gradient_class: string | null; cta_href: string | null } | null;
  const primary: Recommendation = {
    name: mapping.primary_product_name_override || product?.name || "Chương trình VMG",
    desc: mapping.primary_product_desc_override || product?.description || "",
    overlay: product?.gradient_class || "from-brand/90 to-brand/95",
    href: product?.cta_href || "/",
  };

  const { data: crossSellRows } = await supabase
    .from("quiz_mapping_cross_sell")
    .select("display_order, product_name_override, product_desc_override, products(name, description, gradient_class, cta_href)")
    .eq("quiz_mapping_id", mapping.id)
    .order("display_order");

  const crossSell: Recommendation[] = (crossSellRows ?? []).map((row) => {
    const p = row.products as unknown as { name: string; description: string | null; gradient_class: string | null; cta_href: string | null } | null;
    return {
      name: row.product_name_override || p?.name || "",
      desc: row.product_desc_override || p?.description || "",
      overlay: p?.gradient_class || "from-brand/90 to-brand/95",
      href: p?.cta_href || "/",
    };
  });

  return { primary, crossSell };
  } catch { return fallback; }
}

const OptionButton = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
  <button
    type="button"
    onClick={onClick}
    className="quiz-choice"
  >
    <span>{children}</span><ArrowRight aria-hidden="true" />
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

function B2BForm({ onBack, onExit }: { onBack: () => void; onExit: () => void }) {
  return (
    <div>
      <ProgressNav onBack={onBack} onExit={onExit} stepLabel="Trường học / Doanh nghiệp" />
      <p className="text-sm text-neutral-600 mb-4">
        VMG có chương trình riêng cho trường học và doanh nghiệp: đào tạo tiếng Anh in-house, hoạt động ngoại khóa.
      </p>
      <B2BLeadForm source="quiz-partnership" />
    </div>
  );
}

type Step = "audience" | "q1" | "q2" | "result" | "b2b";

export function Quiz() {
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState<Step>("audience");
  const [result, setResult] = useState<QuizResult>(null);
  const [resultLoading, setResultLoading] = useState(false);
  const reset = () => { setAnswers({}); setStep("audience"); setResult(null); };
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (step !== "result") return;
    const key = buildAnswerKey(answers);
    if (!key) { setResult(null); return; }
    setResultLoading(true);
    let active = true;
    fetchQuizResult(key).then((r) => {
      if (!active) return;
      setResult(r);
      setResultLoading(false);
    });
    resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    return () => { active = false; };
  }, [step, answers]);

  return (
    <>
    <section id="quiz" className="quiz-section-band relative overflow-hidden py-14 md:py-20 scroll-mt-24">
      <div className="container-vmg relative">
      <div className="quiz-composition">
        <div className="quiz-intro">
          <span className="home-eyebrow">Bắt đầu từ bạn</span>
          <h2>Một lựa chọn đúng.<br /><span>Mở nhiều cơ hội.</span></h2>
          <p>Vài câu hỏi nhỏ để tìm chương trình phù hợp với độ tuổi và mục tiêu của bạn.</p>
          <a href="#chuong-trinh" className="home-text-link">Xem toàn bộ chương trình <ArrowRight aria-hidden="true" /></a>
        </div>
        <div className="quiz-panel" aria-live="polite">
          <div className="quiz-panel-top">
            <span>{step === "audience" ? "01 / Chọn nhu cầu" : step === "result" ? "Lộ trình của bạn" : "Cùng tìm hiểu thêm"}</span>
            {step !== "audience" && (
              <button onClick={reset} className="hidden md:inline text-xs font-semibold text-neutral-500 hover:text-brand">
                Bắt đầu lại
              </button>
            )}
          </div>

          {step === "audience" && (
            <div>
              <h3 className="text-lg md:text-xl font-display font-bold mb-4">Bạn đang tìm chương trình học cho ai?</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <OptionButton onClick={() => { setAnswers({ audience: "child" }); setStep("q1"); }}>Con của tôi</OptionButton>
                <OptionButton onClick={() => { setAnswers({ audience: "self" }); setStep("q1"); }}>Bản thân tôi</OptionButton>
                <OptionButton onClick={() => { setAnswers({ audience: "abroad" }); setStep("q1"); }}>Tìm hiểu du học</OptionButton>
                <OptionButton onClick={() => { setAnswers({ audience: "b2b" }); setStep("b2b"); }}>Trường học / Doanh nghiệp</OptionButton>
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
                <OptionButton onClick={() => { setAnswers((a) => ({ ...a, childGoal: "communication" })); setStep("result"); }}>Giao tiếp tự tin</OptionButton>
                <OptionButton onClick={() => { setAnswers((a) => ({ ...a, childGoal: "cambridge" })); setStep("result"); }}>Cambridge / Quốc tế</OptionButton>
                <OptionButton onClick={() => { setAnswers((a) => ({ ...a, childGoal: "study-abroad" })); setStep("result"); }}>Nền tảng du học</OptionButton>
              </div>
            </div>
          )}

          {step === "q1" && answers.audience === "self" && (
            <div>
              <ProgressNav onBack={() => setStep("audience")} onExit={reset} stepLabel="Bước 2/3" />
              <h3 className="text-lg md:text-xl font-display font-bold mb-4">Mục tiêu học tập của bạn?</h3>
              <div className="grid sm:grid-cols-3 gap-3">
                <OptionButton onClick={() => { setAnswers((a) => ({ ...a, selfGoal: "work" })); setStep("q2"); }}>Giao tiếp công việc</OptionButton>
                <OptionButton onClick={() => { setAnswers((a) => ({ ...a, selfGoal: "exam" })); setStep("q2"); }}>IELTS/TOEIC/VSTEP</OptionButton>
                <OptionButton onClick={() => { setAnswers((a) => ({ ...a, selfGoal: "tesol" })); setStep("q2"); }}>Chứng chỉ TESOL</OptionButton>
              </div>
            </div>
          )}
          {step === "q2" && answers.audience === "self" && (
            <div>
              <ProgressNav onBack={() => setStep("q1")} onExit={reset} stepLabel="Bước 3/3" />
              <h3 className="text-lg md:text-xl font-display font-bold mb-4">Bạn muốn học theo hình thức nào?</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <OptionButton onClick={() => { setAnswers((a) => ({ ...a, selfFormat: "center" as SelfFormat })); setStep("result"); }}>Tại trung tâm</OptionButton>
                <OptionButton onClick={() => { setAnswers((a) => ({ ...a, selfFormat: "online" as SelfFormat })); setStep("result"); }}>Học online</OptionButton>
              </div>
            </div>
          )}

          {step === "q1" && answers.audience === "abroad" && (
            <div>
              <ProgressNav onBack={() => setStep("audience")} onExit={reset} stepLabel="Bước 2/2" />
              <h3 className="text-lg md:text-xl font-display font-bold mb-4">Bạn đang ở giai đoạn nào?</h3>
              <div className="grid sm:grid-cols-3 gap-3">
                {([
                  ["explore", "Mới tìm hiểu"],
                  ["application", "Cần làm hồ sơ"],
                  ["scholarship", "Tìm học bổng"],
                ] as [AbroadStage, string][]).map(([v, label]) => (
                  <OptionButton key={v} onClick={() => { setAnswers((a) => ({ ...a, abroadStage: v })); setStep("result"); }}>{label}</OptionButton>
                ))}
              </div>
            </div>
          )}

          {step === "b2b" && <B2BForm onBack={() => setStep("audience")} onExit={reset} />}

          {step === "result" && (
            <div>
              <ProgressNav onBack={() => setStep(answers.audience === "abroad" ? "q1" : "q2")} onExit={reset} stepLabel="Hoàn tất" />
              <div className="rounded-2xl border border-dashed border-brand/30 bg-white p-6 text-center">
                <div className="text-2xl">✓</div>
                <p className="mt-2 text-sm font-semibold text-neutral-800">Đã tìm thấy gợi ý phù hợp cho bạn!</p>
                <p className="mt-1 text-xs text-neutral-500">Xem chi tiết chương trình được đề xuất ở phần bên dưới ↓</p>
              </div>
            </div>
          )}
        </div>

      </div>
      </div>
    </section>

    {step === "result" && (
      <section ref={resultRef} id="quiz-ket-qua" className="container-vmg pb-16 md:pb-24 scroll-mt-24">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand">Gợi ý dành riêng cho bạn</span>
          <h2 className="mt-3 text-2xl md:text-3xl font-display font-extrabold">
            Dựa trên câu trả lời của bạn, VMG đề xuất các chương trình sau
          </h2>
        </div>

        <div className="mt-8 max-w-4xl mx-auto">
          {resultLoading && (
            <div className="rounded-3xl bg-cream border border-black/5 p-6 md:p-7 text-center text-sm text-neutral-500">
              Đang tìm chương trình phù hợp…
            </div>
          )}

          {!resultLoading && result && (
            <>
              <a href={result.primary.href} aria-label={`Xem chi tiết ${result.primary.name}`} className="group relative block min-h-[200px] overflow-hidden rounded-3xl shadow-md transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30">
                <div className={`absolute inset-0 bg-gradient-to-br ${result.primary.overlay}`} />
                <div className="relative h-full flex flex-col p-6 md:p-7 text-white">
                  <span className="inline-block w-fit text-[10px] font-bold uppercase tracking-widest bg-white/20 backdrop-blur px-2.5 py-1 rounded-full">
                    Phù hợp nhất với bạn
                  </span>
                  <h4 className="mt-3 text-xl md:text-2xl font-display font-extrabold">{result.primary.name}</h4>
                  <p className="mt-2 text-sm text-white/90 max-w-2xl">{result.primary.desc}</p>
                  <span className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-semibold underline">
                    Xem chi tiết chương trình này →
                  </span>
                </div>
              </a>

              {result.crossSell.length > 0 && (
                <>
                  <div className="mt-4 text-sm font-semibold text-neutral-500">Có thể bạn cũng quan tâm</div>
                  <div className="mt-3 grid sm:grid-cols-2 gap-4">
                    {result.crossSell.map((c) => (
                      <a href={c.href} aria-label={`Xem chi tiết ${c.name}`} key={c.name} className="group relative block min-h-[140px] overflow-hidden rounded-2xl shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30">
                        <div className={`absolute inset-0 bg-gradient-to-br ${c.overlay}`} />
                        <div className="relative h-full flex flex-col p-5 text-white">
                          <h5 className="font-display font-bold">{c.name}</h5>
                          <p className="mt-1 text-xs text-white/85 flex-1">{c.desc}</p>
                          <span className="mt-3 inline-flex w-fit items-center gap-1 text-xs font-semibold underline">
                            Xem chi tiết →
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {!resultLoading && !result && (
            <div className="rounded-3xl bg-cream border border-black/5 p-6 md:p-7">
              <div className="text-xs font-bold text-brand mb-2">✓ Gợi ý dành cho bạn</div>
              <h4 className="text-xl md:text-2xl font-display font-extrabold">VMG có nhiều chương trình phù hợp</h4>
              <p className="mt-2 text-sm text-neutral-600">Để lại thông tin để được tư vấn cụ thể theo nhu cầu của bạn.</p>
            </div>
          )}

          <div className="mt-6"><LeadCaptureForm key={buildAnswerKey(answers)} source="quiz" extra={answers} title="Để lại thông tin, VMG sẽ liên hệ tư vấn chi tiết:" /></div>
        </div>
      </section>
    )}
    </>
  );
}
