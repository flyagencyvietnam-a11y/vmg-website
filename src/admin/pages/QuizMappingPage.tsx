import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Product = { id: string; code: string; name: string };
type CrossSell = { id?: string; product_id: string; display_order: number };
type QuizMappingRow = {
  id: string;
  answer_key: string;
  branch: string;
  primary_product_id: string | null;
  primary_product_name_override: string | null;
};

export default function QuizMappingPage() {
  const [rows, setRows] = useState<QuizMappingRow[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [crossSellByMapping, setCrossSellByMapping] = useState<Record<string, CrossSell[]>>({});
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrimary, setEditPrimary] = useState<string>("");
  const [editCrossSell, setEditCrossSell] = useState<CrossSell[]>([]);

  const load = async () => {
    setLoading(true);
    const [{ data: mapping }, { data: prods }, { data: crossSell }] = await Promise.all([
      supabase.from("quiz_mapping").select("*").order("answer_key"),
      supabase.from("products").select("id, code, name").order("name"),
      supabase.from("quiz_mapping_cross_sell").select("*").order("display_order"),
    ]);
    setRows(mapping ?? []);
    setProducts(prods ?? []);
    const grouped: Record<string, CrossSell[]> = {};
    (crossSell ?? []).forEach((c) => {
      const key = c.quiz_mapping_id as string;
      grouped[key] = grouped[key] ?? [];
      grouped[key].push({ id: c.id, product_id: c.product_id, display_order: c.display_order });
    });
    setCrossSellByMapping(grouped);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const productName = (id: string | null) => products.find((p) => p.id === id)?.name ?? "—";

  const openEdit = (row: QuizMappingRow) => {
    setEditingId(row.id);
    setEditPrimary(row.primary_product_id ?? "");
    setEditCrossSell(crossSellByMapping[row.id] ?? []);
  };

  const save = async () => {
    if (!editingId) return;
    await supabase.from("quiz_mapping").update({ primary_product_id: editPrimary || null }).eq("id", editingId);
    await supabase.from("quiz_mapping_cross_sell").delete().eq("quiz_mapping_id", editingId);
    const toInsert = editCrossSell.filter((c) => c.product_id).map((c, i) => ({
      quiz_mapping_id: editingId, product_id: c.product_id, display_order: i + 1,
    }));
    if (toInsert.length) await supabase.from("quiz_mapping_cross_sell").insert(toInsert);
    setEditingId(null);
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-display font-extrabold mb-1">Quiz mapping</h1>
      <p className="text-sm text-neutral-500 mb-5">
        Ánh xạ câu trả lời quiz trang chủ sang chương trình gợi ý (1 khóa chính + tối đa 2 cross-sell).
      </p>

      <div className="bg-white rounded-2xl border border-black/5 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black/5 text-left text-neutral-500">
              <th className="px-4 py-3 font-semibold">Answer key</th>
              <th className="px-4 py-3 font-semibold">Nhánh</th>
              <th className="px-4 py-3 font-semibold">Khóa chính</th>
              <th className="px-4 py-3 font-semibold">Cross-sell</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={5} className="px-4 py-6 text-center text-neutral-400">Đang tải…</td></tr>}
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-black/5 last:border-0 hover:bg-neutral-50">
                <td className="px-4 py-3 font-mono text-xs">{row.answer_key}</td>
                <td className="px-4 py-3">{row.branch}</td>
                <td className="px-4 py-3">{productName(row.primary_product_id)}</td>
                <td className="px-4 py-3 text-xs text-neutral-500">
                  {(crossSellByMapping[row.id] ?? []).map((c) => productName(c.product_id)).join(", ") || "—"}
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => openEdit(row)} className="text-brand font-semibold hover:underline">Sửa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingId && (
        <div className="fixed inset-0 bg-black/40 z-50 grid place-items-center p-4" onClick={() => setEditingId(null)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-display font-bold mb-4">Sửa gợi ý</h2>
            <label className="grid gap-1 text-sm mb-4">
              <span className="font-semibold text-neutral-700">Khóa chính</span>
              <select value={editPrimary} onChange={(e) => setEditPrimary(e.target.value)} className="rounded-xl border border-neutral-200 px-3 py-2">
                <option value="">-- Chọn sản phẩm --</option>
                {products.map((p) => <option key={p.id} value={p.id}>{p.code} — {p.name}</option>)}
              </select>
            </label>

            <div className="text-sm font-semibold text-neutral-700 mb-2">Cross-sell</div>
            <div className="grid gap-2 mb-3">
              {editCrossSell.map((c, i) => (
                <div key={i} className="flex gap-2">
                  <select
                    value={c.product_id}
                    onChange={(e) => setEditCrossSell((arr) => arr.map((x, xi) => xi === i ? { ...x, product_id: e.target.value } : x))}
                    className="flex-1 rounded-xl border border-neutral-200 px-3 py-2 text-sm"
                  >
                    <option value="">-- Chọn sản phẩm --</option>
                    {products.map((p) => <option key={p.id} value={p.id}>{p.code} — {p.name}</option>)}
                  </select>
                  <button
                    type="button"
                    onClick={() => setEditCrossSell((arr) => arr.filter((_, xi) => xi !== i))}
                    className="text-xs text-neutral-400 hover:text-brand"
                  >
                    Xóa
                  </button>
                </div>
              ))}
              {editCrossSell.length < 3 && (
                <button
                  type="button"
                  onClick={() => setEditCrossSell((arr) => [...arr, { product_id: "", display_order: arr.length + 1 }])}
                  className="text-xs font-semibold text-brand hover:underline w-fit"
                >
                  + Thêm cross-sell
                </button>
              )}
            </div>

            <div className="flex gap-2 justify-end">
              <button onClick={() => setEditingId(null)} className="px-4 py-2 text-sm font-semibold text-neutral-500 hover:bg-neutral-100 rounded-xl">Hủy</button>
              <button onClick={save} className="px-5 py-2 text-sm font-bold text-white bg-brand rounded-xl hover:bg-brand-dark">Lưu</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
