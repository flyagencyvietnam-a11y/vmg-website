import { ResourceTable } from "../components/ResourceTable";

export default function NewsPage() {
  return (
    <ResourceTable
      title="Tin tức & sự kiện"
      table="news"
      orderBy="created_at"
      columns={[
        { key: "title", label: "Tiêu đề" },
        { key: "category", label: "Danh mục" },
        { key: "status", label: "Trạng thái", render: (r) => (r.status === "published" ? "Đã đăng" : "Nháp") },
      ]}
      fields={[
        { key: "title", label: "Tiêu đề", type: "text", required: true },
        { key: "slug", label: "Slug (URL)", type: "text", required: true },
        { key: "category", label: "Danh mục", type: "text" },
        { key: "content", label: "Nội dung", type: "textarea" },
        { key: "image_url", label: "Ảnh đại diện", type: "image" },
        { key: "status", label: "Trạng thái", type: "select", options: [
          { value: "draft", label: "Nháp" },
          { value: "published", label: "Đã đăng" },
        ] },
      ]}
    />
  );
}
