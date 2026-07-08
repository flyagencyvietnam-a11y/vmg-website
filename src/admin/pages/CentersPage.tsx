import { ResourceTable } from "../components/ResourceTable";

export default function CentersPage() {
  return (
    <ResourceTable
      title="Hệ thống trung tâm"
      table="centers"
      orderBy="display_order"
      columns={[
        { key: "name", label: "Tên trung tâm" },
        { key: "province", label: "Tỉnh" },
        { key: "phone", label: "Điện thoại" },
        { key: "address", label: "Địa chỉ" },
      ]}
      fields={[
        { key: "name", label: "Tên trung tâm", type: "text", required: true },
        { key: "address", label: "Địa chỉ", type: "text" },
        { key: "province", label: "Tỉnh", type: "select", options: [
          { value: "Đồng Nai", label: "Đồng Nai" },
          { value: "Bình Phước", label: "Bình Phước" },
        ] },
        { key: "phone", label: "Điện thoại", type: "text" },
        { key: "hours", label: "Giờ hoạt động", type: "text" },
        { key: "lat", label: "Vĩ độ (lat)", type: "number" },
        { key: "lng", label: "Kinh độ (lng)", type: "number" },
        { key: "display_order", label: "Thứ tự (Đồng Nai trước, Bình Phước sau)", type: "number" },
      ]}
    />
  );
}
