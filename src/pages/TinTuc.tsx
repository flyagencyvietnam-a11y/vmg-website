import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import { LEGACY_NEWS } from "../data/legacyNews";
import "../styles/news.css";

const bodies = import.meta.glob<{ default: { html: string } }>("../data/news/*.json");
const dateLabel = (date: string) => new Intl.DateTimeFormat("vi-VN").format(new Date(date));
const normalize = (text: string) => text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
const categories = [...new Set(LEGACY_NEWS.map(item => item.category))];
const pageSize = 12;

function ArticleBody({ id, cover }: { id: string; cover: string | null }) {
  const [content, setContent] = useState<{ id: string; html: string } | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let active = true;
    setFailed(false);
    const load = bodies[`../data/news/${id}.json`];
    if (!load) { setFailed(true); return; }
    load().then(module => { if (active) setContent({ id, html: module.default.html }); })
      .catch(() => { if (active) setFailed(true); });
    return () => { active = false; };
  }, [id]);
  if (failed) return <p role="alert" className="py-10">Chưa tải được bài viết. <button className="text-brand underline" onClick={() => window.location.reload()}>Thử lại</button></p>;
  if (content?.id !== id) return <p role="status" className="py-10 text-neutral-500">Đang tải bài viết…</p>;
  // HTML is generated locally by the importer's explicit tag/attribute allowlist.
  return <>{cover && !content.html.includes(cover) && <img src={cover} alt="" className="mb-8 w-full rounded-xl" />}<div className="news-body" dangerouslySetInnerHTML={{ __html: content.html }} /></>;
}

export default function TinTuc() {
  const { slug } = useParams();
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);
  const [params, setParams] = useSearchParams();
  const query = params.get("q") || "";
  const category = params.get("category") || "";
  const filtered = LEGACY_NEWS.filter(item => (!category || item.category === category) && normalize(`${item.title} ${item.paragraphs[0]}`).includes(normalize(query)));
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(pages, Math.max(1, Math.floor(Number(params.get("page"))) || 1));
  const article = LEGACY_NEWS.find(item => item.slug === slug);
  function update(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value); else next.delete(key);
    if (key !== "page") next.delete("page");
    setParams(next, { replace: key === "q" });
  }
  useDocumentMeta(article ? `${article.title} | VMG` : "Tin tức & sự kiện | VMG", article?.paragraphs[0]?.slice(0, 180) ?? "Các hoạt động, sự kiện và câu chuyện học tập tại hệ thống giáo dục và đào tạo Việt Mỹ VMG.");
  return <div className="min-h-screen flex flex-col"><Header /><main className="flex-1">
    {slug ? article ? <article className="container-vmg news-article py-12 md:py-20">
      <Link to="/tin-tuc" className="text-sm font-medium text-brand">← Tin tức &amp; sự kiện</Link>
      <header className="news-article-header">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand">{article.category}</p>
        <h1>{article.title}</h1>
        <p className="mt-5 text-sm text-neutral-500">Đăng ngày <time dateTime={article.created_at}>{dateLabel(article.created_at)}</time></p>
      </header>
      <aside className="news-archive-note">Bài viết lưu trữ theo thời điểm đăng. Lịch sự kiện, học phí và ưu đãi trong bài có thể không còn áp dụng. <Link to="/lien-he">Liên hệ VMG</Link> để được tư vấn thông tin hiện tại.</aside>
      <ArticleBody key={article.id} id={article.legacyId} cover={article.image_url} />
      <footer className="mt-12 border-t border-neutral-200 pt-6"><Link className="font-medium text-brand" to="/tin-tuc">← Khám phá thêm tin tức VMG</Link></footer>
    </article> : <section className="container-vmg py-20"><h1 className="text-3xl font-bold">Không tìm thấy bài viết</h1><Link to="/tin-tuc" className="mt-6 inline-block text-brand">Về trang tin tức →</Link></section> : <>
      <section className="bg-cream py-14 md:py-20"><div className="container-vmg"><p className="text-xs font-semibold uppercase tracking-widest text-brand">Tin tức &amp; sự kiện</p><h1 className="mt-3 max-w-3xl text-4xl md:text-6xl font-display font-semibold leading-tight">Những dấu ấn trên hành trình VMG</h1><p className="mt-5 max-w-2xl leading-7 text-neutral-600">Cùng nhìn lại các hoạt động kết nối, những cột mốc phát triển và thành quả học tập đã được VMG ghi nhận.</p></div></section>
      <section className="container-vmg py-10 md:py-14" aria-label="Danh sách bài viết">
        <div className="mb-8 grid gap-4 md:grid-cols-[1fr_280px]">
          <label className="text-sm font-medium">Tìm bài viết<input type="search" value={query} onChange={e => update("q", e.target.value)} placeholder="Nhập tiêu đề hoặc từ khóa…" className="mt-2 block w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 font-normal focus:outline-brand" /></label>
          <label className="text-sm font-medium">Chuyên mục<select value={category} onChange={e => update("category", e.target.value)} className="mt-2 block w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 font-normal focus:outline-brand"><option value="">Tất cả chuyên mục</option>{categories.map(item => <option key={item}>{item}</option>)}</select></label>
        </div>
        <p className="mb-6 text-sm text-neutral-500" role="status">{filtered.length} bài viết{pages > 1 && ` · Trang ${currentPage}/${pages}`}</p>
        <div className="grid gap-x-7 gap-y-10 md:grid-cols-2 lg:grid-cols-3">{filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize).map(item => <Link key={item.id} to={`/tin-tuc/${item.slug}`} className="group min-w-0">
          {item.image_url && <div className="overflow-hidden rounded-2xl bg-cream"><img src={item.image_url} alt="" className="w-full aspect-[16/10] object-cover transition duration-500 group-hover:scale-105" loading="lazy" /></div>}
          <div className="pt-5"><p className="text-xs font-semibold text-brand">{item.category}</p><h2 className="mt-3 text-xl font-display font-semibold leading-snug group-hover:text-brand">{item.title}</h2><p className="mt-3 text-sm text-neutral-600 leading-6 line-clamp-3">{item.paragraphs[0]}</p><time className="mt-4 block text-xs text-neutral-500" dateTime={item.created_at}>{dateLabel(item.created_at)}</time></div>
        </Link>)}</div>
        {!filtered.length && <p className="py-12 text-neutral-600">Không có bài viết phù hợp. Bạn thử từ khóa khác nhé.</p>}
        {pages > 1 && <nav className="mt-12 flex flex-wrap justify-center gap-2" aria-label="Phân trang tin tức">{Array.from({ length: pages }, (_, i) => i + 1).map(page => <button key={page} type="button" aria-label={`Trang ${page}`} aria-current={page === currentPage ? "page" : undefined} onClick={() => { update("page", String(page)); window.scrollTo({ top: 0, behavior: "smooth" }); }} className={`h-11 min-w-11 rounded-full border px-3 text-sm ${page === currentPage ? "border-brand bg-brand text-white" : "border-neutral-200 hover:border-brand"}`}>{page}</button>)}</nav>}
      </section>
    </>}
  </main><Footer /></div>;
}
