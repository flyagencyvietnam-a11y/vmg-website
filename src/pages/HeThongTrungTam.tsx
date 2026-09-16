import { useEffect, useState } from "react";
import { MapPin, ArrowUpRight } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import { CENTERS } from "../data/centers";
import { COMPANY } from "../data/company";
import { supabase } from "../lib/supabase";

type DirectoryCenter = (typeof CENTERS)[number] & { phone?: string; hours?: string };

export default function HeThongTrungTam() {
  useDocumentMeta("Hệ thống 10 trung tâm VMG | Địa chỉ & chỉ đường", "Tìm trung tâm VMG tại Biên Hòa, Long Khánh, Long Thành, Nhơn Trạch, Xuân Lộc, Trảng Bom và Bình Phước. Xem địa chỉ, bản đồ và liên hệ tư vấn.");
  const [centers, setCenters] = useState<DirectoryCenter[]>(CENTERS);
  const [area, setArea] = useState("Tất cả");
  const [selectedId, setSelectedId] = useState(CENTERS[0].id);
  const selected = centers.find((center) => center.id === selectedId) ?? centers[0];
  const visible = centers.filter((center) => area === "Tất cả" || center.area === area);
  useEffect(() => {
    // Keep the existing CMS workflow; the verified snapshot also works without the backend.
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 6000);
    let active = true;
    async function loadCenters() {
      try {
        const { data, error } = await supabase.from("centers").select("id,name,address,province,phone,hours").order("display_order").abortSignal(controller.signal);
        if (!active || error || !data?.length || data.some((row) => !row.name?.trim() || !row.address?.trim())) return;
        const records: DirectoryCenter[] = data.map((row) => {
          const known = CENTERS.find((center) => center.name === row.name || center.address === row.address);
          return { id: known?.id ?? row.id, name: row.name, address: row.address, area: known?.area ?? row.province ?? "Khu vực khác", label: known?.label ?? "VMG", image: known && known.address === row.address ? known.image : null, facebook: known?.facebook ?? COMPANY.facebook, map: known && known.address === row.address ? known.map : "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("VMG " + row.address), phone: row.phone || undefined, hours: row.hours || undefined };
        });
        setCenters(records);
      } catch { /* The sourced directory remains available during network failures. */ }
      finally { window.clearTimeout(timeout); }
    }
    void loadCenters();
    return () => { active = false; controller.abort(); window.clearTimeout(timeout); };
  }, []);
  return <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1">
      <section className="bg-cream py-14 md:py-20">
        <div className="container-vmg">
          <span className="text-xs font-bold uppercase tracking-widest text-brand">Hệ thống trung tâm</span>
          <h1 className="mt-3 max-w-3xl text-3xl font-display font-extrabold md:text-5xl">Chọn một trung tâm gần bạn</h1>
          <p className="mt-5 max-w-2xl text-neutral-600 leading-7">{centers.length} chi nhánh trong hệ thống VMG. Tìm địa chỉ thuận tiện để bắt đầu hành trình học tập của bạn.</p>
          <a href={COMPANY.hotlineHref} className="mt-6 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-bold text-white">Hotline tư vấn: {COMPANY.hotline}</a>
        </div>
      </section>
      <section className="container-vmg py-12 md:py-16">
        <label htmlFor="center-area" className="block text-sm font-bold">Lọc theo khu vực</label>
        <select id="center-area" value={area} onChange={(event) => { const next = event.target.value; setArea(next); setSelectedId(centers.find((center) => next === "Tất cả" || center.area === next)!.id); }} className="mt-3 w-full max-w-sm rounded-xl border border-neutral-200 bg-white px-4 py-3">
          {["Tất cả", ...new Set(centers.map((center) => center.area))].map((name) => <option key={name}>{name}</option>)}
        </select>
        <p className="mt-4 text-sm text-neutral-500" aria-live="polite">{visible.length} trung tâm phù hợp</p>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_1fr] items-start">
          <aside id="ban-do" className="overflow-hidden rounded-3xl border border-neutral-200 bg-cream lg:sticky lg:top-28 lg:col-start-2 lg:row-start-1">
            <div className="p-6" aria-live="polite"><MapPin className="h-6 w-6 text-brand" /><h2 className="mt-3 text-xl font-display font-bold">{selected.name} · {selected.label}</h2><p className="mt-2 text-sm leading-6 text-neutral-600">{selected.address}</p></div>
            <iframe key={selected.id} title={"Bản đồ " + selected.name + " – " + selected.label} src={"https://www.google.com/maps?q=" + encodeURIComponent("VMG " + selected.address) + "&output=embed"} className="h-[320px] w-full border-0 md:h-[400px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            <div className="p-6 text-sm leading-6 text-neutral-600">Liên hệ <a className="font-bold text-brand" href={COMPANY.hotlineHref}>{COMPANY.hotline}</a> để được hỗ trợ về lịch học và giờ tiếp đón tại từng trung tâm.</div>
          </aside>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-start-1 lg:row-start-1">
            {visible.map((center) => <article key={center.id} className={"overflow-hidden rounded-2xl border bg-white " + (selectedId === center.id ? "border-brand shadow-md" : "border-neutral-200")}>
              {center.image && <img src={center.image} alt={"Trung tâm VMG " + center.label} className="aspect-[16/10] w-full object-cover" loading="lazy" />}
              <div className="p-5">
                <p className="text-xs font-bold text-brand">{center.area}</p>
                <h2 className="mt-2 font-display text-lg font-extrabold">{center.name} · {center.label}</h2>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{center.address}</p>
                {center.phone && <a href={"tel:" + center.phone.replace(/[^+\d]/g, "")} className="mt-2 block text-sm font-bold text-brand">{center.phone}</a>}
                {center.hours && <p className="mt-2 text-sm text-neutral-500">{center.hours}</p>}
                <div className="mt-5 flex flex-wrap gap-4 text-sm font-bold">
                  <button onClick={() => { setSelectedId(center.id); if (window.innerWidth < 1024) document.getElementById("ban-do")?.scrollIntoView({ behavior: "smooth", block: "center" }); }} aria-pressed={selectedId === center.id} className="text-brand underline underline-offset-4">Xem bản đồ</button>
                  <a href={center.map} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-brand">Chỉ đường <ArrowUpRight className="h-4 w-4" /></a>
                  <a href={center.facebook} target="_blank" rel="noreferrer" className="text-neutral-600 hover:text-brand">Fanpage</a>
                </div>
              </div>
            </article>)}
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>;
}
