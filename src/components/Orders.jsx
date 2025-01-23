import { Table, Button, Space, Tag } from "antd";
import { useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import TitleSection from "../Shared/TitleSection";

const Orders = () => {
  const [orders] = useState([
    {
      key: "1",
      orderId: "12345",
      date: "2025-01-21",
      total: "$100",
      status: "Delivered",
    },
    {
      key: "2",
      orderId: "12346",
      date: "2025-01-20",
      total: "$50",
      status: "Processing",
    },
    {
      key: "3",
      orderId: "12347",
      date: "2025-01-19",
      total: "$150",
      status: "Canceled",
    },
  ]);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "blue";
        if (status === "Delivered") color = "green";
        if (status === "Processing") color = "orange";
        if (status === "Canceled") color = "red";

        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            className="banner-button"
            onClick={() => handleViewOrder(record.orderId)}
          >
          </Button>
        </Space>
      ),
    },
  ];

  const handleViewOrder = (orderId) => {
    console.log("View order details for:", orderId);
  };

  return (
    <div style={{ padding: "20px" }}>
    <TitleSection title='My Orders'/>
      <Table
        dataSource={orders}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default Orders;
