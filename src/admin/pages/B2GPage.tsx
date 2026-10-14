import { LeadsTable } from "../components/LeadsTable";

export default function B2GPage() {
  return (
    <LeadsTable
      title="Trường học & Doanh nghiệp (B2G/B2B)"
      table="b2g_inquiries"
      columns={[
        { key: "organization", label: "Trường / Công ty" },
        { key: "contact_name", label: "Người liên hệ" },
        { key: "phone", label: "SĐT" },
        { key: "owner_team", label: "Nhóm tiếp nhận" },
        { key: "created_at", label: "Thời gian", render: (r) => new Date(r.created_at as string).toLocaleString("vi-VN") },
      ]}
      csvColumns={["id", "request_id", "organization", "contact_name", "phone", "need_notes", "source", "owner_team", "attribution", "consent_given", "consent_at", "consent_version", "status", "created_at"]}
    />
  );
}
