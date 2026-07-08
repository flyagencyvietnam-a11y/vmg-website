import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

function toCsv(rows: Record<string, unknown>[], columns: string[]): string {
  const escape = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const header = columns.join(",");
  const body = rows.map((r) => columns.map((c) => escape(typeof r[c] === "object" ? JSON.stringify(r[c]) : r[c])).join(",")).join("\n");
  return `${header}\n${body}`;
}

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

  useEffect(() => {
    supabase.from(table).select("*").order("created_at", { ascending: false }).then(({ data }) => {
      setRows(data ?? []);
      setLoading(false);
    });
  }, [table]);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from(table).update({ status }).eq("id", id);
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-display font-extrabold">{title}</h1>
        <button
          onClick={() => downloadCsv(`${table}.csv`, toCsv(rows, csvColumns))}
          className="rounded-full border-2 border-brand text-brand px-5 py-2.5 text-sm font-bold hover:bg-brand hover:text-white transition-colors"
        >
          Xuất CSV
        </button>
      </div>
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
            {!loading && rows.length === 0 && <tr><td colSpan={columns.length + 1} className="px-4 py-6 text-center text-neutral-400">Chưa có dữ liệu</td></tr>}
            {rows.map((row) => (
              <tr key={row.id as string} className="border-b border-black/5 last:border-0 hover:bg-neutral-50">
                {columns.map((c) => (
                  <td key={c.key} className="px-4 py-3 align-top max-w-xs truncate">{c.render ? c.render(row) : String(row[c.key] ?? "")}</td>
                ))}
                <td className="px-4 py-3">
                  <select
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
