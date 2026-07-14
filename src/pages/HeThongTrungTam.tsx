import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { supabase } from "../lib/supabase";
import { useDocumentMeta } from "../lib/useDocumentMeta";

type Center = {
  id: string;
  name: string;
  address: string | null;
  province: string | null;
  phone: string | null;
  hours: string | null;
};

export default function HeThongTrungTam() {
  useDocumentMeta(
    "Hệ thống trung tâm VMG | Đồng Nai",
    "Hệ thống trung tâm VMG tại tỉnh Đồng Nai - địa chỉ, điện thoại và giờ hoạt động."
  );

  const [centers, setCenters] = useState<Center[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    supabase
      .from("centers")
      .select("id, name, address, province, phone, hours")
      .order("display_order")
      .then(({ data, error }) => {
        if (error) setError(true);
        setCenters(data ?? []);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="container-vmg py-14 md:py-20">
          <span className="text-xs font-bold uppercase tracking-widest text-brand">Hệ thống trung tâm</span>
          <h1 className="mt-3 text-3xl md:text-5xl font-display font-extrabold max-w-2xl">
            Hệ thống trung tâm tại tỉnh Đồng Nai
          </h1>
        </section>

        <section className="container-vmg pb-16 md:pb-24">
          {centers === null && !error && (
            <div className="text-sm text-neutral-500">Đang tải danh sách trung tâm…</div>
          )}

          {error && (
            <div className="rounded-2xl border border-dashed border-black/15 bg-cream/60 p-6 text-sm text-neutral-500">
              Không tải được danh sách trung tâm, vui lòng thử lại sau.
            </div>
          )}

          {centers && centers.length === 0 && !error && (
            <div className="rounded-2xl border border-dashed border-black/15 bg-cream/60 p-6 text-sm text-neutral-500">
              Chưa có dữ liệu trung tâm - vui lòng cập nhật trong trang quản trị (Admin &gt; Trung tâm).
            </div>
          )}

          {centers && centers.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {centers.map((c) => (
                <div key={c.id} className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
                  {c.province && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand">{c.province}</span>
                  )}
                  <h3 className="mt-1 font-display font-bold text-lg">{c.name}</h3>
                  {c.address && <p className="mt-2 text-sm text-neutral-600">{c.address}</p>}
                  {c.phone && <p className="mt-1 text-sm text-neutral-600">☎ {c.phone}</p>}
                  {c.hours && <p className="mt-1 text-xs text-neutral-400">{c.hours}</p>}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
