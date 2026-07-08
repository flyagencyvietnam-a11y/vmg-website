import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export type FieldType = "text" | "textarea" | "number" | "select" | "checkbox" | "date" | "image";

export type FieldConfig = {
  key: string;
  label: string;
  type: FieldType;
  options?: { value: string; label: string }[];
  required?: boolean;
};

export type ColumnConfig = {
  key: string;
  label: string;
  render?: (row: Record<string, unknown>) => React.ReactNode;
};

export function ResourceTable({
  title,
  table,
  columns,
  fields,
  orderBy = "display_order",
}: {
  title: string;
  table: string;
  columns: ColumnConfig[];
  fields: FieldConfig[];
  orderBy?: string;
}) {
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from(table).select("*").order(orderBy, { ascending: true });
    setRows(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  const openNew = () => {
    setEditing({});
    setShowForm(true);
  };

  const openEdit = (row: Record<string, unknown>) => {
    setEditing(row);
    setShowForm(true);
  };

  const remove = async (row: Record<string, unknown>) => {
    if (!confirm("Xóa mục này?")) return;
    await supabase.from(table).delete().eq("id", row.id as string);
    load();
  };

  const onUploadImage = async (file: File, key: string) => {
    setUploading(true);
    const path = `${table}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("site-images").upload(path, file);
    if (!error) {
      const { data } = supabase.storage.from("site-images").getPublicUrl(path);
      setEditing((e) => ({ ...(e ?? {}), [key]: data.publicUrl }));
    }
    setUploading(false);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    const payload = { ...editing };
    delete payload.id;
    delete payload.created_at;
    delete payload.updated_at;
    if (editing.id) {
      await supabase.from(table).update(payload).eq("id", editing.id as string);
    } else {
      await supabase.from(table).insert(payload);
    }
    setShowForm(false);
    setEditing(null);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-display font-extrabold">{title}</h1>
        <button
          onClick={openNew}
          className="rounded-full bg-brand text-white px-5 py-2.5 text-sm font-bold hover:bg-brand-dark transition-colors"
        >
          + Thêm mới
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-black/5 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black/5 text-left text-neutral-500">
              {columns.map((c) => (
                <th key={c.key} className="px-4 py-3 font-semibold">{c.label}</th>
              ))}
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={columns.length + 1} className="px-4 py-6 text-center text-neutral-400">Đang tải…</td></tr>
            )}
            {!loading && rows.length === 0 && (
              <tr><td colSpan={columns.length + 1} className="px-4 py-6 text-center text-neutral-400">Chưa có dữ liệu</td></tr>
            )}
            {rows.map((row) => (
              <tr key={row.id as string} className="border-b border-black/5 last:border-0 hover:bg-neutral-50">
                {columns.map((c) => (
                  <td key={c.key} className="px-4 py-3 align-top max-w-xs truncate">
                    {c.render ? c.render(row) : String(row[c.key] ?? "")}
                  </td>
                ))}
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <button onClick={() => openEdit(row)} className="text-brand font-semibold mr-3 hover:underline">Sửa</button>
                  <button onClick={() => remove(row)} className="text-neutral-400 font-semibold hover:text-brand hover:underline">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && editing && (
        <div className="fixed inset-0 bg-black/40 z-50 grid place-items-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-display font-bold mb-4">{editing.id ? "Chỉnh sửa" : "Thêm mới"}</h2>
            <form onSubmit={onSubmit} className="grid gap-3">
              {fields.map((f) => (
                <label key={f.key} className="grid gap-1 text-sm">
                  <span className="font-semibold text-neutral-700">{f.label}</span>
                  {f.type === "textarea" && (
                    <textarea
                      value={(editing[f.key] as string) ?? ""}
                      onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })}
                      required={f.required}
                      rows={3}
                      className="rounded-xl border border-neutral-200 px-3 py-2"
                    />
                  )}
                  {f.type === "select" && (
                    <select
                      value={(editing[f.key] as string) ?? ""}
                      onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })}
                      required={f.required}
                      className="rounded-xl border border-neutral-200 px-3 py-2"
                    >
                      <option value="">-- Chọn --</option>
                      {f.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  )}
                  {f.type === "checkbox" && (
                    <input
                      type="checkbox"
                      checked={Boolean(editing[f.key])}
                      onChange={(e) => setEditing({ ...editing, [f.key]: e.target.checked })}
                      className="w-4 h-4"
                    />
                  )}
                  {f.type === "image" && (
                    <div className="grid gap-2">
                      {Boolean(editing[f.key]) && (
                        <img src={editing[f.key] as string} alt="" className="h-24 w-24 object-cover rounded-lg border border-neutral-200" />
                      )}
                      <input
                        type="file" accept="image/*"
                        onChange={(e) => { const file = e.target.files?.[0]; if (file) onUploadImage(file, f.key); }}
                        className="text-xs"
                      />
                      {uploading && <span className="text-xs text-neutral-400">Đang tải ảnh lên…</span>}
                    </div>
                  )}
                  {(f.type === "text" || f.type === "number" || f.type === "date") && (
                    <input
                      type={f.type}
                      value={(editing[f.key] as string | number) ?? ""}
                      onChange={(e) => setEditing({ ...editing, [f.key]: f.type === "number" ? Number(e.target.value) : e.target.value })}
                      required={f.required}
                      className="rounded-xl border border-neutral-200 px-3 py-2"
                    />
                  )}
                </label>
              ))}
              <div className="mt-2 flex gap-2 justify-end">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm font-semibold text-neutral-500 hover:bg-neutral-100 rounded-xl">
                  Hủy
                </button>
                <button type="submit" className="px-5 py-2 text-sm font-bold text-white bg-brand rounded-xl hover:bg-brand-dark">
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
