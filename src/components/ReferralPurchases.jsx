import { Table, Tag } from "antd";
import TitleSection from "../Shared/TitleSection";
import { useTranslation } from "react-i18next";
import { useShowPaymentQuery } from "../app/Api/Payments";
import { useShowSingleUserQuery } from "../app/Api/Users";

const ReferralPurchases  = () => {
  const { i18n } = useTranslation();
  const { data: SingleUser} = useShowSingleUserQuery();
  const { data: orders , isLoading} = useShowPaymentQuery(SingleUser?.user?.code);

  const columns = [
    {
      title: i18n.language === "EN" ? "Order ID" : "معرف الطلب",
      dataIndex: "order_id",
      key: "order_id",
    },
    {
      title: i18n.language === "EN" ? "Date" : "التاريخ",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (text) => {
        const date = new Date(text);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
        return formattedDate;
      },
    },
    {
      title: i18n.language === "EN" ? "Name" : "الاسم",
      dataIndex: "shipping_data",
      key: "shipping_data",
      render: (value) => {
        return( value?.first_name + ' '+  value?.last_name);
      },
    },
    {
      title: i18n.language === "EN" ? "Status" : "الحاله",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "blue";
        if (status === "paid") color = "green";
        if (status === "pending") color = "orange";
        if (status === "failed") color = "red";

        return <Tag color={color}>{status}</Tag>;
      },
    }
  ];

  

  return (
    <div style={{ padding: "20px" }}>
      <TitleSection title={i18n.language === "EN" ? "Referral Purchases " : "مشتريات الإحالة"} />
      <Table
        dataSource={orders?.orders?.data}
        columns={columns}
        isLoading={isLoading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default ReferralPurchases ;