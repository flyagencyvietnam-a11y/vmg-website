import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import { LEGACY_NEWS } from "../data/legacyNews";

export default function TinTuc() {
  const { slug } = useParams();
  const article = LEGACY_NEWS.find((item) => item.slug === slug);
  useDocumentMeta(article ? `${article.title} | VMG` : "Tin tức & sự kiện | VMG", article?.paragraphs[0] ?? "Các hoạt động, sự kiện và câu chuyện học tập tại hệ thống giáo dục và đào tạo Việt Mỹ VMG.");
  return <div className="min-h-screen flex flex-col"><Header /><main className="flex-1">
    {slug ? article ? <article className="container-vmg max-w-4xl py-12 md:py-20">
      <a href="/tin-tuc" className="text-sm font-bold text-brand">← Tin tức &amp; sự kiện</a>
      <p className="mt-8 text-xs font-bold uppercase tracking-widest text-brand">{article.category}</p>
      <h1 className="mt-3 text-3xl md:text-5xl font-display font-extrabold leading-tight">{article.title}</h1>
      <p className="mt-5 text-sm text-neutral-500">Đăng ngày <time dateTime={article.created_at}>{new Intl.DateTimeFormat("vi-VN").format(new Date(article.created_at))}</time></p>
      <img src={article.image_url} alt={article.title} className="mt-8 w-full rounded-3xl" />
      <div className="mt-8 space-y-5 text-base leading-8 text-neutral-700">{article.paragraphs.map((text) => <p key={text}>{text}</p>)}</div>
      <a href={article.source} target="_blank" rel="noreferrer" className="mt-8 inline-block text-sm font-bold text-brand underline">Xem bài viết gốc trên website VMG ↗</a>
    </article> : <section className="container-vmg py-20"><h1 className="text-3xl font-bold">Không tìm thấy bài viết</h1><a href="/tin-tuc" className="mt-6 inline-block text-brand">Về trang tin tức →</a></section> : <>
      <section className="bg-cream py-14 md:py-20"><div className="container-vmg"><p className="text-xs font-bold uppercase tracking-widest text-brand">Tin tức &amp; sự kiện</p><h1 className="mt-3 text-3xl md:text-5xl font-display font-extrabold">Những dấu ấn trên hành trình VMG</h1><p className="mt-5 max-w-2xl leading-7 text-neutral-600">Cùng nhìn lại các hoạt động kết nối, những cột mốc phát triển và thành quả học tập đã được VMG ghi nhận.</p></div></section>
      <section className="container-vmg py-14 md:py-20"><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{LEGACY_NEWS.map((item) => <a key={item.id} href={`/tin-tuc/${item.slug}`} className="group overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm hover:shadow-lg transition">
        <img src={item.image_url} alt={item.title} className="w-full aspect-[16/10] object-cover" loading="lazy" /><div className="p-6"><p className="text-xs font-bold text-brand">{item.category}</p><h2 className="mt-3 text-xl font-display font-bold">{item.title}</h2><p className="mt-3 text-sm text-neutral-600 leading-6 line-clamp-3">{item.paragraphs[0]}</p><time className="mt-5 block text-xs text-neutral-500" dateTime={item.created_at}>{new Intl.DateTimeFormat("vi-VN").format(new Date(item.created_at))}</time></div>
      </a>)}</div></section>
    </>}
  </main><Footer /></div>;
}
