import { Table, Button, Space, Tag, message } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import logo from '../../assets/Img/logo.jpg';
import { useSaveWithDrawCommissionMutation, useShowCalcCommissionQuery } from "../../app/Api/Payments";

const CalculateCommission = () => {
  const { i18n } = useTranslation();
  const SalesId = document.cookie.split('; ').find(row => row.startsWith('SalesId='))?.split('=')[1];
  const { data: commission , isLoading} = useShowCalcCommissionQuery(SalesId);
  const [saveDraw , {isLoading:loadingDraw}] = useSaveWithDrawCommissionMutation()
  
  const handleSaveDraw = async () => {
    try {
      message.loading({ content: 'جارِ معالجة الطلب...', key: 'loading' });
      const res = await saveDraw(SalesId).unwrap();
  
      if (res.error) {
        message.error({ content: 'فشل في تقديم الطلب', key: 'loading' });
        return;
      }
  
      message.success({ content: 'تم تقديم الطلب بنجاح', key: 'loading' });
      window.location.reload();
    } catch (error) {
      message.error({ content: 'فشل في تقديم الطلب', key: 'loading' });
    }
  };
  
  
  
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
      dataIndex: "amount_cents",
      key: "amount_cents",
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

    const generatePDF = (order, currency = "EGP") => {
      const { items, shipping_data, payment_method, before_discount, status, order_id, updated_at, discount } = order;
      
      const isArabic = i18n.language !== "EN";
      const textAlign = isArabic ? "right" : "left";
      const direction = isArabic ? "rtl" : "ltr";
      const formatCurrency = (value) => new Intl.NumberFormat(i18n.language, { style: "currency", currency }).format(value);
    
      let htmlContent = `
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
              body {
                font-family: "Tahoma", "Arial", "Cairo", sans-serif;
                direction: ${direction};
                text-align: ${textAlign};
                background-color: #f9f9f9;
                padding: 20px;
              }
              .invoice-container {
                max-width: 800px;
                margin: auto;
                background: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
              }
              .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 2px solid #eee;
                padding-bottom: 15px;
                margin-bottom: 20px;
              }
              .header img {
                max-width: 80px;
                height: auto;
                border-radius: 50%;
              }
              .invoice-title {
                font-size: 22px;
                color: #333;
                margin: 0;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
              }
              th, td {
                padding: 12px;
                border-bottom: 1px solid #ddd;
              }
              th {
                background-color: #f5f5f5;
                color: #333;
              }
              .total {
                font-size: 18px;
                font-weight: bold;
                margin-top: 20px;
              }
              .btn-print {
                padding: 12px 20px;
                font-size: 16px;
                background-color: #007bff;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                display: block;
                margin: 20px auto;
              }
            </style>
          </head>
          <body>
            <div class="invoice-container">
              <div class="header">
                <img src="${logo}" alt="Company Logo">
                <h1 class="invoice-title">${isArabic ? "فاتورة" : "Invoice"}</h1>
              </div>
    
              <p><strong>${isArabic ? "رقم الطلب:" : "Order ID:"}</strong> ${order_id}</p>
              <p><strong>${isArabic ? "التاريخ:" : "Date:"}</strong> ${new Date(updated_at).toLocaleDateString()}</p>
    
              <h3>${isArabic ? "عنوان الشحن:" : "Shipping Address:"}</h3>
              <p><strong>${isArabic ? "الاسم:" : "Name:"}</strong> ${shipping_data.first_name} ${shipping_data.last_name}</p>
              <p><strong>${isArabic ? "العنوان:" : "Address:"}</strong> ${shipping_data.street}, ${shipping_data.city}, ${shipping_data.state}, ${shipping_data.country}</p>
              <p><strong>${isArabic ? "الهاتف:" : "Phone:"}</strong> ${shipping_data.phone_number}</p>
              <p><strong>${isArabic ? "البريد الإلكتروني:" : "Email:"}</strong> ${shipping_data.email}</p>
    
              <p><strong>${isArabic ? "طريقة الدفع:" : "Payment Method:"}</strong> ${payment_method}</p>
              <p><strong>${isArabic ? "الحالة:" : "Status:"}</strong> ${status}</p>
    
              <h3>${isArabic ? "العناصر:" : "Items:"}</h3>
              <table>
                <tr>
                  <th>${isArabic ? "اسم المنتج" : "Product Name"}</th>
                  <th>${isArabic ? "السعر الفردي" : "Unit Price"}</th>
                  <th>${isArabic ? "الكمية" : "Quantity"}</th>
                  <th>${isArabic ? "الإجمالي" : "Total"}</th>
                </tr>
                ${items.map(item => `
                  <tr>
                    <td>${item.name}</td>
                    <td>${formatCurrency(item.amount_cents)}</td>
                    <td>${item.quantity}</td>
                    <td>${formatCurrency(item.amount_cents * item.quantity)}</td>
                  </tr>
                `).join('')}
              </table>
    
              <h3 class="total">${isArabic ? "الإجمالي (بعد الخصم):" : "Total:"} ${formatCurrency(before_discount - discount)}</h3>
    
              <button class="btn-print" onclick="window.print();">${isArabic ? "طباعة الفاتورة" : "Print Invoice"}</button>
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
    <div style={{ padding: "20px" }} className="cta">
      <Table
        dataSource={commission?.data?.orders}
        columns={columns}
        isLoading={isLoading}
        pagination={{ pageSize: 5 }}
      />
      {commission?.data?.orders?.length !== 0 && (
        <>        
        <div style={{display:'flex',justifyContent:'start',alignItems:'start',flexDirection:'column'}}>
            <span style={{display:'flex',justifyContent:'center',alignItems:'start',flexDirection:'row',gap:'5px'}}><h3>Total(الاجمالي)</h3>: {commission?.data?.totalSales} EG(جنيه)</span>
            <br/>
            <span style={{display:'flex',justifyContent:'center',alignItems:'start',flexDirection:'row',gap:'5px'}}><h3>Commission(العموله)</h3>: {commission?.data?.commission} EG(جنيه)</span>
        </div>
        <div style={{display:'flex',justifyContent:'end',alignItems:'end',flexDirection:'row',gap:'5px'}}>
            <Button onClick={handleSaveDraw} type="primary">
            
            {loadingDraw ? '...':'Submit a withdrawal request(تقديم علي طلب السحب)'}
            </Button>
        </div>
        </>
      )}
    </div>
  );
};

export default CalculateCommission;