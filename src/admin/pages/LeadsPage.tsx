import { LeadsTable } from "../components/LeadsTable";

export default function LeadsPage() {
  return (
    <LeadsTable
      title="Leads"
      table="leads"
      columns={[
        { key: "full_name", label: "Họ tên" },
        { key: "phone", label: "SĐT" },
        { key: "source", label: "Nguồn" },
        { key: "created_at", label: "Thời gian", render: (r) => new Date(r.created_at as string).toLocaleString("vi-VN") },
      ]}
      csvColumns={["full_name", "phone", "source", "quiz_answers", "status", "created_at"]}
    />
  );
}
