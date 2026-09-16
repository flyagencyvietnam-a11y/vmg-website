import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useDocumentMeta } from "../lib/useDocumentMeta";

export default function TuyenDung() {
  useDocumentMeta("Tuyển dụng | Cùng phát triển tại VMG", "Khám phá môi trường làm việc, đào tạo và phát triển chuyên môn tại VMG. Xem các vị trí trên cổng tuyển dụng chính thức.");
  return <div className="min-h-screen flex flex-col"><Header /><main className="flex-1">
    <section className="bg-cream py-16 md:py-24"><div className="container-vmg grid gap-10 lg:grid-cols-2 items-center"><div><p className="text-xs font-bold uppercase tracking-widest text-brand">Sự nghiệp tại VMG</p><h1 className="mt-3 text-3xl md:text-5xl font-display font-extrabold">Cùng tạo nên giá trị giáo dục</h1><p className="mt-6 leading-7 text-neutral-600">Một môi trường nơi mỗi thành viên được quan tâm, tôn trọng và hỗ trợ; được tin tưởng để đóng góp ý tưởng và phát triển năng lực.</p><a href="https://vmgenglish.edu.vn/tim-kiem-cong-viec.html" target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-full bg-brand px-6 py-3 font-bold text-sm text-white">Xem vị trí trên cổng tuyển dụng VMG ↗</a></div><img src="/legacy/lhu-career-fair.jpg" alt="VMG kết nối sinh viên tại LHU Career Fair 2026" className="w-full aspect-[4/3] object-cover rounded-3xl" /></div></section>
    <section className="container-vmg py-16"><h2 className="text-3xl font-display font-extrabold">Không gian để học hỏi và đóng góp</h2><div className="mt-8 grid gap-5 md:grid-cols-3">{[
      ["Chuyên nghiệp & chuyên môn hóa", "VMG xây dựng môi trường chuyên nghiệp, ứng dụng công nghệ trong vận hành và đào tạo."],
      ["Sáng tạo & trách nhiệm", "Tôn trọng, trao quyền và ghi nhận đóng góp của mỗi thành viên trong công việc."],
      ["Đào tạo & phát triển", "Các hoạt động đào tạo, hướng dẫn và phát triển chuyên môn đồng hành cùng đội ngũ."],
    ].map(([title, text]) => <article key={title} className="rounded-3xl bg-cream p-7"><h3 className="text-xl font-display font-bold">{title}</h3><p className="mt-4 text-sm leading-7 text-neutral-600">{text}</p></article>)}</div><p className="mt-8 text-sm text-neutral-500">Yêu cầu, chế độ và thời hạn ứng tuyển được nêu trong từng thông báo tuyển dụng. Xem thông tin vị trí trước khi gửi hồ sơ.</p></section>
  </main><Footer /></div>;
}
