import React, { useState } from 'react';
import { Table, Button, Space, Tag, DatePicker } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useLazyShowAllCommissionQuery } from "../../app/Api/Payments";
import logo from '../../assets/Img/logo.jpg';

const AllComission = () => {
  const { i18n } = useTranslation();
  const [dateRange, setDateRange] = useState([null, null]);
  const [fetchPendingOrders, { data: PendingOrders, isLoading }] = useLazyShowAllCommissionQuery();

  const code = document.cookie.split('; ').find(row => row.startsWith('code='))?.split('=')[1];
  const SalesId = document.cookie.split('; ').find(row => row.startsWith('SalesId='))?.split('=')[1];
    console.log(PendingOrders?.pendingCommissions    )
  const handleSearch = () => {
    const [fromDate, toDate] = dateRange;
    if (fromDate && toDate) {
      fetchPendingOrders({
        salesId: SalesId,
        from: fromDate.format('YYYY-MM-DD'),
        to: toDate.format('YYYY-MM-DD')
      });
    }
  };

  React.useEffect(() => {
    // Load initial data
    fetchPendingOrders({ salesId: SalesId, from: '', to: '' });
  }, [SalesId, fetchPendingOrders]);

  const columns = [
    {
      title: i18n.language === "EN" ? "name(الاسم)" : "تاريخ",
      dataIndex: "sales",
      key: "sales",
      render: (text) => {
        return text?.name;
      },
    },
    {
      title: i18n.language === "EN" ? "Request Date(تاريخ الطلب)" : "تاريخ",
      dataIndex: "withdraw_date",
      key: "withdraw_date",
      render: (text) => {
        const date = new Date(text);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
        return formattedDate;
      },
    },
    {
      title: i18n.language === "EN" ? "Commission(العموله)" : "تاريخ",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: i18n.language === "EN" ? "Status(الحاله)" : "الحاله",
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
  ];

  return (
    <div style={{ padding: "20px" }} className="cta">
      {/* Date Picker for searching */}
      <Space style={{ marginBottom: 20 }}>
        <DatePicker.RangePicker
          value={dateRange}
          onChange={(dates) => setDateRange(dates)}
          format="YYYY-MM-DD"
          placeholder={[i18n.language === "EN" ? "From Date" : "من تاريخ", i18n.language === "EN" ? "To Date" : "إلى تاريخ"]}
        />
        <Button type="primary" onClick={handleSearch}>
          {i18n.language === "EN" ? "Search" : "بحث"}
        </Button>
      </Space>

      {/* Table */}
      <Table
        dataSource={PendingOrders?.pendingCommissions}
        columns={columns}
        loading={isLoading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default AllComission;
