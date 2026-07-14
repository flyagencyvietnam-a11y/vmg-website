import { useState } from "react";
import type { NgoaiNguSection } from "../data/products";

export type SectionValue = NgoaiNguSection | "all";
type Step = "start" | "child" | "self";

function OptionBtn({
  onClick,
  active,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left rounded-2xl border-2 px-4 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 ${
        active
          ? "border-brand bg-brand text-white"
          : "border-neutral-200 bg-white text-neutral-800 hover:border-brand/60 hover:shadow-md"
      }`}
    >
      {children}
    </button>
  );
}

// Reuses the homepage Quiz's opening question ("Bạn đang tìm chương trình cho
// ai?") as a live filter instead of a lead-gen wizard - narrows the catalog
// grid below without navigating away. Defaults to "all" (today's full list).
export function SmartFilter({
  active,
  onSelect,
}: {
  active: SectionValue;
  onSelect: (v: SectionValue) => void;
}) {
  const [step, setStep] = useState<Step>("start");

  return (
    <div className="rounded-3xl bg-cream border border-black/5 p-5 md:p-6 mb-10">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold uppercase tracking-widest text-brand">Lọc nhanh</span>
        {active !== "all" && (
          <button
            onClick={() => {
              onSelect("all");
              setStep("start");
            }}
            className="text-xs font-semibold text-neutral-500 hover:text-brand"
          >
            ✕ Xem tất cả
          </button>
        )}
      </div>

      {step === "start" && (
        <div>
          <h3 className="text-base font-display font-bold mb-3">Bạn đang tìm chương trình cho ai?</h3>
          <div className="grid sm:grid-cols-3 gap-3">
            <OptionBtn onClick={() => setStep("child")}>👨‍👩‍👧 Con của tôi</OptionBtn>
            <OptionBtn onClick={() => setStep("self")}>👤 Bản thân tôi</OptionBtn>
            <OptionBtn onClick={() => onSelect("b2b")} active={active === "b2b"}>🏫 Doanh nghiệp</OptionBtn>
          </div>
        </div>
      )}

      {step === "child" && (
        <div>
          <button onClick={() => setStep("start")} className="text-xs font-semibold text-neutral-500 hover:text-brand mb-3">
            ← Quay lại
          </button>
          <h3 className="text-base font-display font-bold mb-3">Con bạn ở độ tuổi nào?</h3>
          <div className="grid sm:grid-cols-3 gap-3">
            <OptionBtn onClick={() => onSelect("mamnon")} active={active === "mamnon"}>Mầm non (3-5 tuổi)</OptionBtn>
            <OptionBtn onClick={() => onSelect("thieunhi")} active={active === "thieunhi"}>Thiếu nhi (6-11 tuổi)</OptionBtn>
            <OptionBtn onClick={() => onSelect("thieunien")} active={active === "thieunien"}>Thiếu niên (12-16 tuổi)</OptionBtn>
          </div>
        </div>
      )}

      {step === "self" && (
        <div>
          <button onClick={() => setStep("start")} className="text-xs font-semibold text-neutral-500 hover:text-brand mb-3">
            ← Quay lại
          </button>
          <h3 className="text-base font-display font-bold mb-3">Bạn muốn học gì?</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <OptionBtn onClick={() => onSelect("adult")} active={active === "adult"}>💬 Giao tiếp</OptionBtn>
            <OptionBtn onClick={() => onSelect("luyenthi")} active={active === "luyenthi"}>📝 Luyện thi & chứng chỉ</OptionBtn>
            <OptionBtn onClick={() => onSelect("tieng-trung")} active={active === "tieng-trung"}>🀄 Tiếng Trung</OptionBtn>
            <OptionBtn onClick={() => onSelect("tesol")} active={active === "tesol"}>🎓 TESOL</OptionBtn>
          </div>
        </div>
      )}
    </div>
  );
}
