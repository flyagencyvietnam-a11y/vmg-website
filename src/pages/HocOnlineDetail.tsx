import { useParams, Navigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { LeadCaptureForm } from "../components/LeadCaptureForm";
import { findProduct, isPublished, FORMAT_LABEL } from "../data/products";
import { useDocumentMeta } from "../lib/useDocumentMeta";

function InfoRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="py-4 border-b border-black/5 grid sm:grid-cols-[160px_1fr] gap-1 sm:gap-4">
      <div className="text-xs font-bold uppercase tracking-widest text-neutral-400">{label}</div>
      <div className="text-sm text-neutral-800">{value}</div>
    </div>
  );
}

export default function HocOnlineDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? findProduct(slug) : undefined;
  const hero = product?.hero;

  useDocumentMeta(
    hero ? hero.metaTitle : product ? `${product.name} | VMG` : "Không tìm thấy chương trình | VMG",
    hero ? hero.metaDescription : product ? product.desc : "Chương trình không tồn tại."
  );

  // Gated products (e.g. Tiếng Trung/HSK pilot hold) must not be reachable even by direct URL guess.
  if (!product || !isPublished(product)) return <Navigate to="/hoc-online" replace />;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* ---- Hero ---- */}
        <section className={`bg-gradient-to-br ${product.overlay} text-white`}>
          <div className="container-vmg py-14 md:py-20">
            <a href="/ngoai-ngu" className="text-xs font-semibold text-white/80 hover:text-white">← Tất cả chương trình</a>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {product.tag && (
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-white/20 backdrop-blur px-2.5 py-1 rounded-full">
                  {product.tag}
                </span>
              )}
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-white/20 backdrop-blur px-2.5 py-1 rounded-full">
                {FORMAT_LABEL[product.format]}
              </span>
            </div>
            <h1 className="mt-3 text-3xl md:text-5xl font-display font-extrabold max-w-2xl">
              {hero?.h1 || product.name}
            </h1>
            <p className="mt-4 text-white/90 max-w-2xl">{hero?.subheadline || product.desc}</p>
            {hero?.ctaPrimary && (
              <a href="#dang-ky" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white text-brand px-6 py-3 text-sm font-bold hover:bg-cream transition-colors w-fit">
                {hero.ctaPrimary} →
              </a>
            )}
          </div>
        </section>

        <div className="container-vmg py-12 md:py-16">
          <div className="grid lg:grid-cols-[1fr_360px] gap-10">
            <div>
              {/* ---- Pain points ---- */}
              {hero && (hero.painParagraph || hero.painPoints) && (
                <div className="pb-10 border-b border-black/5">
                  <h2 className="text-xl font-display font-extrabold">Vấn đề bạn đang gặp</h2>
                  {hero.painIntro && <p className="mt-2 text-sm text-neutral-600">{hero.painIntro}</p>}
                  {hero.painParagraph && <p className="mt-3 text-sm text-neutral-700 leading-relaxed">{hero.painParagraph}</p>}
                  {hero.painPoints && (
                    <ul className="mt-3 space-y-2">
                      {hero.painPoints.map((p, i) => (
                        <li key={i} className="flex gap-2 text-sm text-neutral-700">
                          <span className="text-brand">•</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* ---- Solution ---- */}
              {hero && (hero.solutionParagraph || hero.solutionPoints) && (
                <div className="py-10 border-b border-black/5">
                  <h2 className="text-xl font-display font-extrabold">Giải pháp</h2>
                  {hero.solutionIntro && <p className="mt-2 text-sm font-semibold text-brand">{hero.solutionIntro}</p>}
                  {hero.solutionParagraph && <p className="mt-3 text-sm text-neutral-700 leading-relaxed">{hero.solutionParagraph}</p>}
                  {hero.solutionPoints && (
                    <ol className="mt-3 space-y-2">
                      {hero.solutionPoints.map((p, i) => (
                        <li key={i} className="flex gap-2.5 text-sm text-neutral-700">
                          <span className="flex-none w-5 h-5 rounded-full bg-brand/10 text-brand text-xs font-bold grid place-items-center mt-0.5">{i + 1}</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ol>
                  )}
                  {hero.solutionCaveat && (
                    <div className="mt-4 rounded-xl bg-cream/70 border border-black/5 p-4 text-xs text-neutral-600 leading-relaxed">
                      {hero.solutionCaveat}
                    </div>
                  )}
                </div>
              )}

              {/* ---- Info table ---- */}
              <div className="py-10 border-b border-black/5">
                <h2 className="text-xl font-display font-extrabold mb-2">Thông tin khóa học</h2>
                <InfoRow label="Hình thức" value={FORMAT_LABEL[product.format]} />
                <InfoRow label="Đối tượng" value={product.audience} />
                <InfoRow label="Thời lượng" value={product.duration} />
                <InfoRow label="Giáo viên" value={product.teachers} />
                <InfoRow label="Sĩ số" value={product.classSize} />
                <InfoRow label="Điều kiện đầu vào" value={product.entryRequirement} />
                <InfoRow label="Cam kết đầu ra" value={product.commitment} />
                <div className="py-4 grid sm:grid-cols-[160px_1fr] gap-1 sm:gap-4">
                  <div className="text-xs font-bold uppercase tracking-widest text-neutral-400">Học phí</div>
                  <div className="text-sm text-neutral-800">Liên hệ để nhận báo giá và ưu đãi hiện hành →</div>
                </div>
                {!product.audience && !product.duration && !product.commitment && (
                  <p className="py-4 text-sm text-neutral-500">
                    Thông tin chi tiết (thời lượng, cam kết đầu ra) đang được cập nhật - để lại thông tin để VMG tư vấn cụ thể.
                  </p>
                )}
              </div>

              {/* ---- Next steps ---- */}
              {hero?.nextSteps && hero.nextSteps.length > 0 && (
                <div className="py-10 border-b border-black/5">
                  <h2 className="text-xl font-display font-extrabold">Lộ trình tiếp theo</h2>
                  <div className="mt-4 grid sm:grid-cols-2 gap-3">
                    {hero.nextSteps.map((s, i) => (
                      <div key={i} className="rounded-xl border border-black/10 bg-cream/60 p-4">
                        <div className="font-display font-bold text-sm">{s.label}</div>
                        <div className="mt-1 text-xs text-neutral-500">{s.note}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ---- FAQ ---- */}
              {hero && hero.faq.length > 0 && (
                <div className="py-10 border-b border-black/5">
                  <h2 className="text-xl font-display font-extrabold">Câu hỏi thường gặp</h2>
                  <div className="mt-4 space-y-4">
                    {hero.faq.map((f, i) => (
                      <div key={i}>
                        <div className="font-semibold text-sm text-neutral-900">{f.q}</div>
                        <p className="mt-1 text-sm text-neutral-600 leading-relaxed">{f.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ---- Testimonial placeholder ---- */}
              {hero?.testimonialPending && (
                <div className="py-10">
                  <div className="rounded-2xl border border-dashed border-black/15 bg-cream/60 p-6 text-center text-sm text-neutral-500">
                    [Vị trí testimonial: chờ UGC thật — không tự viết]
                  </div>
                </div>
              )}
            </div>

            <div id="dang-ky" className="scroll-mt-24">
              {hero?.ctaFinal && (
                <p className="mb-4 text-sm font-semibold text-neutral-800">{hero.ctaFinal}</p>
              )}
              <LeadCaptureForm
                source="hoc-online-detail"
                extra={{ product_code: product.code, product_slug: product.slug }}
                title={`Đăng ký tư vấn ${product.name}`}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
