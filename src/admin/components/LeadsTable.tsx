import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

import { toCsv } from "../../lib/csv";

function downloadCsv(filename: string, csv: string) {
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function LeadsTable({
  title, table, columns, csvColumns,
}: {
  title: string;
  table: string;
  columns: { key: string; label: string; render?: (r: Record<string, unknown>) => React.ReactNode }[];
  csvColumns: string[];
}) {
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    setRows([]);
    async function load() {
      const records: Record<string, unknown>[] = [];
      try {
        for (let offset = 0; ; offset += 500) {
          const { data, error: failure } = await supabase.from(table).select("*").order("created_at", { ascending: false }).order("id").range(offset, offset + 499);
          if (failure) throw failure;
          if (!active) return;
          records.push(...(data ?? []));
          if (!data || data.length < 500) break;
        }
        if (active) setRows(records);
      } catch {
        if (active) setError("Chưa tải được dữ liệu. Vui lòng kiểm tra kết nối và quyền quản trị rồi thử lại.");
      } finally { if (active) setLoading(false); }
    }
    void load();
    return () => { active = false; };
  }, [table, revision]);

  const updateStatus = async (id: string, status: string) => {
    setSavingId(id);
    setError(null);
    try {
      const { data, error: failure } = await supabase.from(table).update({ status }).eq("id", id).select("id,status").single();
      if (failure || !data) throw failure;
      setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status: data.status } : r)));
    } catch { setError("Chưa lưu được trạng thái. Dữ liệu trên màn hình chưa được cập nhật."); }
    finally { setSavingId(null); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-display font-extrabold">{title}</h1>
        <button
          disabled={loading || !!error || !rows.length}
          onClick={() => downloadCsv(`${table}.csv`, toCsv(rows, csvColumns))}
          className="rounded-full border-2 border-brand text-brand px-5 py-2.5 text-sm font-bold hover:bg-brand hover:text-white transition-colors disabled:opacity-50"
        >
          Xuất CSV
        </button>
      </div>
      {error && <p role="alert" className="mb-4 text-sm text-brand">{error} <button className="underline" onClick={() => setRevision(value => value + 1)}>Tải lại</button></p>}
      <div className="bg-white rounded-2xl border border-black/5 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black/5 text-left text-neutral-500">
              {columns.map((c) => <th key={c.key} className="px-4 py-3 font-semibold">{c.label}</th>)}
              <th className="px-4 py-3 font-semibold">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={columns.length + 1} className="px-4 py-6 text-center text-neutral-400">Đang tải…</td></tr>}
            {!loading && !error && rows.length === 0 && <tr><td colSpan={columns.length + 1} className="px-4 py-6 text-center text-neutral-400">Chưa có dữ liệu</td></tr>}
            {rows.map((row) => (
              <tr key={row.id as string} className="border-b border-black/5 last:border-0 hover:bg-neutral-50">
                {columns.map((c) => (
                  <td key={c.key} className="px-4 py-3 align-top max-w-xs truncate">{c.render ? c.render(row) : String(row[c.key] ?? "")}</td>
                ))}
                <td className="px-4 py-3">
                  <select
                    disabled={savingId !== null}
                    value={row.status as string}
                    onChange={(e) => updateStatus(row.id as string, e.target.value)}
                    className="rounded-lg border border-neutral-200 px-2 py-1 text-xs"
                  >
                    <option value="new">Mới</option>
                    <option value="contacted">Đã liên hệ</option>
                    <option value="converted">Đã chuyển đổi</option>
                    <option value="closed">Đóng</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
