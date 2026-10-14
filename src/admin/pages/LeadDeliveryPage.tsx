import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
type Row = { id: string; request_id: string; channel: string; state: string; attempts: number; last_error: string | null; created_at: string };
export default function LeadDeliveryPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [error, setError] = useState("");
  const [revision, setRevision] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    Promise.resolve(supabase.from("vmg_lead_deliveries").select("id,request_id,channel,state,attempts,last_error,created_at").neq("state", "delivered").order("created_at").limit(100)).then(({ data, error: failure }) => {
      if (!active) return;
      if (failure) setError("Chưa tải được hàng đợi. Kiểm tra kết nối và quyền truy cập.");
      else setRows((data ?? []) as Row[]);
      setLoading(false);
    }).catch(() => { if (active) { setError("Chưa kết nối được backend."); setLoading(false); } });
    return () => { active = false; };
  }, [revision]);
  async function retry(id: string) {
    setSaving(true);
    try {
      const { data, error: failure } = await supabase.rpc("vmg_retry_delivery", { p_id: id });
      if (failure || data !== true) throw failure;
      setRevision(value => value + 1);
    } catch { setError("Chưa đưa được yêu cầu vào hàng đợi gửi lại."); }
    finally { setSaving(false); }
  }
  return <div>
    <h1 className="text-2xl font-bold">Chuyển lead & thông báo</h1>
    <p className="mt-3 text-sm text-neutral-600">Tối đa 100 yêu cầu chưa chuyển xong, ưu tiên yêu cầu cũ nhất. Khi webhook chưa được cấu hình, yêu cầu giữ trạng thái pending.</p>
    <button onClick={() => setRevision(value => value + 1)} disabled={loading || saving} className="my-4 text-brand underline">Tải lại</button>
    {error && <p role="alert" className="mb-4 text-brand">{error}</p>}
    {loading ? <p>Đang tải…</p> : !error && <div className="overflow-auto rounded-xl bg-white"><table className="w-full text-sm"><thead><tr>{["Mã yêu cầu", "Kênh", "Trạng thái", "Số lần thử", "Lỗi", "Thao tác"].map(label => <th className="p-3 text-left" key={label}>{label}</th>)}</tr></thead><tbody>
      {!rows.length && <tr><td colSpan={6} className="p-4">Không có yêu cầu chờ chuyển.</td></tr>}
      {rows.map(row => <tr key={row.id} className="border-t border-neutral-100"><td className="p-3">{row.request_id}</td><td className="p-3">{row.channel}</td><td className="p-3">{row.state}</td><td className="p-3">{row.attempts}</td><td className="p-3">{row.last_error || "—"}</td><td className="p-3">{row.state === "failed" && <button disabled={saving} onClick={() => retry(row.id)} className="text-brand underline">Gửi lại</button>}</td></tr>)}
    </tbody></table></div>}
  </div>;
}
