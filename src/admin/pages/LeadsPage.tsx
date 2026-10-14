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
        { key: "owner_team", label: "Nhóm tiếp nhận" },
        { key: "created_at", label: "Thời gian", render: (r) => new Date(r.created_at as string).toLocaleString("vi-VN") },
      ]}
      csvColumns={["id", "request_id", "full_name", "phone", "source", "owner_team", "quiz_answers", "attribution", "consent_given", "consent_at", "consent_version", "status", "created_at"]}
    />
  );
}
