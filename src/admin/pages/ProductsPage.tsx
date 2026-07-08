import { ResourceTable } from "../components/ResourceTable";

export default function ProductsPage() {
  return (
    <ResourceTable
      title="Sản phẩm"
      table="products"
      orderBy="display_order"
      columns={[
        { key: "code", label: "Mã" },
        { key: "name", label: "Tên sản phẩm" },
        { key: "category", label: "Nhóm" },
        { key: "price_current", label: "Giá hiện tại", render: (r) => r.price_current ? `${Number(r.price_current).toLocaleString("vi-VN")}đ` : "—" },
        { key: "is_published", label: "Hiển thị", render: (r) => (r.is_published ? "✓" : "—") },
      ]}
      fields={[
        { key: "code", label: "Mã sản phẩm", type: "text", required: true },
        { key: "name", label: "Tên sản phẩm", type: "text", required: true },
        { key: "slug", label: "Slug (URL)", type: "text", required: true },
        { key: "description", label: "Mô tả", type: "textarea" },
        { key: "target_audience", label: "Đối tượng", type: "text" },
        { key: "category", label: "Nhóm", type: "select", required: true, options: [
          { value: "ngoai_ngu", label: "Ngoại ngữ" },
          { value: "du_hoc", label: "Du học" },
          { value: "hoc_online", label: "Học online" },
          { value: "khac", label: "Khác" },
        ] },
        { key: "format", label: "Hình thức", type: "select", options: [
          { value: "offline", label: "Offline" },
          { value: "online", label: "Online" },
          { value: "hybrid", label: "Hybrid" },
        ] },
        { key: "price_list", label: "Giá niêm yết (đ)", type: "number" },
        { key: "price_current", label: "Giá hiện tại (đ)", type: "number" },
        { key: "promo_expiry", label: "Hạn khuyến mãi", type: "date" },
        { key: "commitment_note", label: "Cam kết đầu ra", type: "textarea" },
        { key: "cta_label", label: "Nhãn CTA", type: "text" },
        { key: "cta_href", label: "Link CTA", type: "text" },
        { key: "display_order", label: "Thứ tự hiển thị", type: "number" },
        { key: "is_published", label: "Hiển thị công khai", type: "checkbox" },
      ]}
    />
  );
}
