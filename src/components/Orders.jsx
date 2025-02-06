import { Table, Button, Space, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import TitleSection from "../Shared/TitleSection";
import { useTranslation } from "react-i18next";
import { useShowPaymentQuery } from "../app/Api/Payments";
import { useShowSingleUserQuery } from "../app/Api/Users";

const Orders = () => {
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
      title: i18n.language === "EN" ? "Payment Method" : "طريقة الدفع",
      dataIndex: "payment_method",
      key: "payment_method",
    },
    {
      title: i18n.language === "EN" ? "Total" : "الاجمالي",
      dataIndex: "before_discount",
      key: "before_discount",
      render: (value) => {
        return value / 100;
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
    },
    {
      title: i18n.language === "EN" ? "Actions" : "الاجراء",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            className="banner-button"
            onClick={() => handleViewOrder(record)}
          ></Button>
        </Space>
      ),
    },
  ];

  const handleViewOrder = (order) => {
    console.log("View order details for:", order.order_id);
    generatePDF(order);
  };

  const generatePDF = (order) => {
    const { items, shipping_data, payment_method, before_discount, status, order_id, updated_at, discount } = order;
    
    const isArabic = i18n.language!=="EN";
    const textAlign = isArabic ? "right" : "left";
    const direction = isArabic ? "rtl" : "ltr";
  
    let htmlContent = `
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: "Tahoma", "Arial", "Cairo", sans-serif; direction: ${direction}; text-align: ${textAlign}; }
            .invoice-container { padding: 20px; max-width: 800px; margin: auto; border: 1px solid #ccc; border-radius: 10px; }
            h1 { text-align: center; color: #4CAF50; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { padding: 8px; border: 1px solid #ddd; }
            th { background-color: #f2f2f2; }
            .total { font-size: 18px; font-weight: bold; color: #333; }
            .btn-print { padding: 10px 20px; font-size: 16px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer; }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <h1>${isArabic ? "فاتورة" : "Invoice"}</h1>
            <p><strong>${isArabic ? "معرف الطلب:" : "Order ID:"}</strong> ${order_id}</p>
            <p><strong>${isArabic ? "التاريخ:" : "Date:"}</strong> ${updated_at}</p>
  
            <h3>${isArabic ? "عنوان الشحن:" : "Shipping Address:"}</h3>
            <p><strong>${isArabic ? "الاسم:" : "Name:"}</strong> ${shipping_data.first_name} ${shipping_data.last_name}</p>
            <p><strong>${isArabic ? "العنوان:" : "Address:"}</strong> ${shipping_data.street}, ${shipping_data.city}, ${shipping_data.state}, ${shipping_data.country}</p>
            <p><strong>${isArabic ? "الهاتف:" : "Phone:"}</strong> ${shipping_data.phone_number}</p>
            <p><strong>${isArabic ? "البريد الإلكتروني:" : "Email:"}</strong> ${shipping_data.email}</p>
  
            <h3>${isArabic ? "طريقة الدفع:" : "Payment Method:"}</h3>
            <p>${payment_method}</p>
  
            <h3>${isArabic ? "الحالة:" : "Status:"}</h3>
            <p>${status}</p>
  
            <h3>${isArabic ? "العناصر:" : "Items:"}</h3>
            <table>
              <tr>
                <th>${isArabic ? "اسم المنتج" : "Product Name"}</th>
                <th>${isArabic ? "الوصف" : "Description"}</th>
                <th>${isArabic ? "اللون" : "Color"}</th>
                <th>${isArabic ? "الحجم" : "Size"}</th>
                <th>${isArabic ? "السعر الفردي" : "Unit Price"}</th>
                <th>${isArabic ? "الكمية" : "Quantity"}</th>
                <th>${isArabic ? "الإجمالي" : "Total"}</th>
              </tr>
              ${items.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.description}</td>
                  <td>${item.color}</td>
                  <td>${item.size}</td>
                  <td>${(item.amount_cents / 100).toFixed(2)} EGP</td>
                  <td>${item.quantity}</td>
                  <td>${((item.amount_cents / 100) * item.quantity).toFixed(2)} EGP</td>
                </tr>
              `).join('')}
            </table>
  
            <h3 class="total">${isArabic ? "الإجمالي (قبل الخصم):" : "Total (Before Discount):"} <span>${before_discount / 100} EGP</span></h3>
            <h3 class="total">${isArabic ? "الإجمالي (بعد الخصم):" : "Total (After Discount):"} <span>${(before_discount / 100 - discount / 100)} EGP</span></h3>
  
            <div style="text-align: center; margin-top: 20px;">
              <button class="btn-print" onclick="window.print();">${isArabic ? "طباعة الفاتورة" : "Print Invoice"}</button>
            </div>
          </div>
        </body>
      </html>
    `;
  
    const newWindow = window.open();
    newWindow.document.write(htmlContent);
    newWindow.document.close();
    newWindow.print();
  };
  

  return (
    <div style={{ padding: "20px" }}>
      <TitleSection title={i18n.language === "EN" ? "My Orders" : "طلباتي"} />
      <Table
        dataSource={orders?.orders?.data}
        columns={columns}
        isLoading={isLoading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default Orders;
