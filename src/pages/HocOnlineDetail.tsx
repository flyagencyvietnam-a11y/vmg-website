import { useParams, Navigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { LeadCaptureForm } from "../components/LeadCaptureForm";
import { B2BLeadForm } from "../components/B2BLeadForm";
import { findProduct, isPublished, FORMAT_LABEL } from "../data/products";
import { getProductPageContent } from "../data/productPageContent";
import { getProductSupplementalPhotos } from "../data/vmgPhotoLibrary";
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
  const content = slug ? getProductPageContent(slug) : undefined;
  const supplementalPhotos = product ? getProductSupplementalPhotos(product.code) : [];

  useDocumentMeta(
    content?.metaTitle || hero?.metaTitle || (product ? `${product.name} | VMG` : "Không tìm thấy chương trình | VMG"),
    content?.metaDescription || hero?.metaDescription || (product ? product.desc : "Chương trình không tồn tại.")
  );

  // Gated products (e.g. Tiếng Trung/HSK pilot hold) must not be reachable even by direct URL guess.
  if (!product || !isPublished(product)) return <Navigate to="/hoc-online" replace />;

  const verifiedFaq = content?.faq.filter((item) => !item.a.startsWith("[CẦN XÁC NHẬN")) ?? [];
  const structuredData = content
    ? {
        "@context": "https://schema.org",
        "@type": "Course",
        name: product.name,
        description: content.metaDescription,
        provider: {
          "@type": "Organization",
          name: "Viet My Group (VMG)",
          url: "https://vmgenglish.edu.vn",
        },
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: FORMAT_LABEL[product.format],
        },
      }
    : null;
  const catalogHref = product.section === "tesol"
    ? "/huong-nghiep"
    : product.section === "b2b"
      ? "/truong-hoc-doanh-nghiep"
      : product.format === "online"
        ? "/hoc-online"
        : "/ngoai-ngu";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {structuredData && (
          <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        )}
        {verifiedFaq.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: verifiedFaq.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            })}
          </script>
        )}
        {/* ---- Hero ---- */}
        <section className={`bg-gradient-to-br ${product.overlay} text-white`}>
          <div className="container-vmg py-14 md:py-20">
            <a href={catalogHref} className="text-xs font-semibold text-white/80 hover:text-white">← Tất cả chương trình</a>
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
              {content?.hook || hero?.h1 || product.name}
            </h1>
            <p className="mt-4 text-white/90 max-w-2xl text-base md:text-lg">{content?.subheadline || hero?.subheadline || product.desc}</p>
            {(content?.ctaPrimary || hero?.ctaPrimary) && (
              <a href="#dang-ky" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white text-brand px-6 py-3 text-sm font-bold hover:bg-cream transition-colors w-fit">
                {content?.ctaPrimary || hero?.ctaPrimary} →
              </a>
            )}
          </div>
        </section>

        <div className="container-vmg py-12 md:py-16">
          <div className="grid lg:grid-cols-[1fr_360px] gap-10">
            <div>
              {content && (
                <>
                  <section className="pb-10 border-b border-black/5">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">{product.name}</p>
                    <h2 className="mt-2 text-2xl font-display font-extrabold">{content.introTitle}</h2>
                    <p className="mt-4 text-sm md:text-base text-neutral-700 leading-relaxed">{content.intro}</p>
                  </section>

                  {supplementalPhotos.length > 0 && (
                    <section className="py-10 border-b border-black/5">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">Hình ảnh từ VMG</p>
                          <h2 className="mt-2 text-2xl font-display font-extrabold">Một góc trải nghiệm chương trình</h2>
                        </div>
                        <span className="hidden text-xs text-neutral-400 sm:block">Ảnh tư liệu VMG</span>
                      </div>
                      <div className={`mt-6 grid gap-4 ${supplementalPhotos.length > 1 ? "sm:grid-cols-2" : ""}`}>
                        {supplementalPhotos.map((photo) => (
                          <figure key={photo.src} className="overflow-hidden rounded-3xl border border-black/5 bg-cream">
                            <img
                              src={photo.src}
                              alt={photo.alt}
                              className="aspect-[16/9] w-full object-cover"
                              style={{ objectPosition: photo.position ?? "center" }}
                              loading="lazy"
                            />
                            <figcaption className="px-5 py-3 text-xs leading-5 text-neutral-500">{photo.caption}</figcaption>
                          </figure>
                        ))}
                      </div>
                    </section>
                  )}

                  <section className="py-10 border-b border-black/5 grid md:grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-xl font-display font-extrabold">Khóa học phù hợp với ai?</h2>
                      <ul className="mt-4 space-y-3">
                        {content.suitableFor.map((item) => (
                          <li key={item} className="flex gap-3 text-sm text-neutral-700 leading-relaxed">
                            <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-brand/10 text-xs font-bold text-brand">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h2 className="text-xl font-display font-extrabold">Bạn sẽ đạt được gì?</h2>
                      <ul className="mt-4 space-y-3">
                        {content.outcomes.map((item) => (
                          <li key={item} className="flex gap-3 text-sm text-neutral-700 leading-relaxed">
                            <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-gold/10 text-xs font-bold text-gold">→</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>

                  <section className="py-10 border-b border-black/5">
                    <h2 className="text-2xl font-display font-extrabold">{content.journeyTitle || "Lộ trình khóa học"}</h2>
                    <p className="mt-2 text-sm text-neutral-600">Từng chặng được sắp xếp để người học biết rõ mình đang học gì và bước tiếp theo là gì.</p>
                    <ol className="mt-6 grid sm:grid-cols-2 gap-4">
                      {content.journey.map((step, index) => (
                        <li key={step.title} className="rounded-2xl border border-black/10 bg-cream/50 p-5">
                          <div className="text-xs font-bold uppercase tracking-widest text-brand">Chặng {index + 1}</div>
                          <h3 className="mt-2 font-display font-bold text-neutral-900">{step.title}</h3>
                          <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{step.description}</p>
                        </li>
                      ))}
                    </ol>
                  </section>

                  <section className="py-10 border-b border-black/5">
                    <h2 className="text-xl font-display font-extrabold">Điểm nổi bật của chương trình</h2>
                    <div className="mt-4 grid sm:grid-cols-3 gap-3">
                      {content.highlights.map((item) => (
                        <div key={item} className="rounded-2xl bg-brand/5 p-4 text-sm font-medium text-neutral-700 leading-relaxed">{item}</div>
                      ))}
                    </div>
                  </section>
                </>
              )}

              {/* ---- Pain points ---- */}
              {!content && hero && (hero.painParagraph || hero.painPoints) && (
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
              {!content && hero && (hero.solutionParagraph || hero.solutionPoints) && (
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

              {content && (
                <section className="py-10 border-b border-black/5">
                  <h2 className="text-2xl font-display font-extrabold">Bắt đầu như thế nào?</h2>
                  <ol className="mt-6 space-y-4">
                    {content.startSteps.map((step, index) => (
                      <li key={step.title} className="flex gap-4">
                        <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-brand text-sm font-bold text-white">{index + 1}</span>
                        <div>
                          <h3 className="font-display font-bold text-neutral-900">{step.title}</h3>
                          <p className="mt-1 text-sm text-neutral-600 leading-relaxed">{step.description}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {/* ---- Next steps ---- */}
              {!content && hero?.nextSteps && hero.nextSteps.length > 0 && (
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
              {((content && content.faq.length > 0) || (!content && hero && hero.faq.length > 0)) && (
                <div className="py-10 border-b border-black/5">
                  <h2 className="text-xl font-display font-extrabold">Câu hỏi thường gặp</h2>
                  <div className="mt-4 space-y-4">
                    {(content?.faq || hero?.faq || []).map((f, i) => (
                      <div key={i}>
                        <div className="font-semibold text-sm text-neutral-900">{f.q}</div>
                        <p className="mt-1 text-sm text-neutral-600 leading-relaxed">{f.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ---- Testimonial placeholder ---- */}
              {!content && hero?.testimonialPending && (
                <div className="py-10">
                  <div className="rounded-2xl border border-dashed border-black/15 bg-cream/60 p-6 text-center text-sm text-neutral-500">
                    [Vị trí testimonial: chờ UGC thật — không tự viết]
                  </div>
                </div>
              )}
            </div>

            <div id="dang-ky" className="scroll-mt-24 lg:sticky lg:top-24 lg:self-start">
              {(content?.ctaFinal || hero?.ctaFinal) && (
                <p className="mb-4 text-sm font-semibold text-neutral-800 leading-relaxed">{content?.ctaFinal || hero?.ctaFinal}</p>
              )}
              {content?.notice && <div className="mb-4 rounded-xl border border-gold/25 bg-cream p-4 text-xs text-neutral-700 leading-relaxed">{content.notice}</div>}
              {product.ageGroup === "b2b" ? (
                <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 text-sm font-semibold text-neutral-700">{content?.ctaPrimary || "Gửi yêu cầu hợp tác"}</div>
                  <B2BLeadForm />
                </div>
              ) : (
                <LeadCaptureForm
                  source="hoc-online-detail"
                  extra={{ product_code: product.code, product_slug: product.slug }}
                  title={content ? content.ctaPrimary : `Đăng ký tư vấn ${product.name}`}
                  submitLabel="Nhận tư vấn miễn phí"
                />
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
