import { Button, Input, Table, Tag } from "antd";
import { useShowPaymentQuery } from "../../app/Api/Payments";
import { Box } from "@mui/material";
import { useState } from "react";

const UserReferalPurshase  = () => {
    const [code, setCode] = useState("");
    const [submittedCode, setSubmittedCode] = useState(""); 
  
    const { data: orders, isLoading } = useShowPaymentQuery(submittedCode);
  
    const handleSearch = () => {
      setSubmittedCode(code);
    };
  const columns = [
    {
      title: "Order ID" ,
      dataIndex: "order_id",
      key: "order_id",
    },
    {
      title:"Date",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (text) => {
        const date = new Date(text);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
        return formattedDate;
      },
    },
    {
      title:"Name",
      dataIndex: "shipping_data",
      key: "shipping_data",
      render: (value) => {
        return value?.first_name;
      },
    },
    {
      title: "Status",
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

  const rowClassName = (record, index) => {
    return index % 2 !== 0 ? "even-row" : "";
  };

  return (
    <Box sx={{ height: "100%", width: "100%" }}  className="cta">
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Input
          placeholder="Enter Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{ width: "200px" }}
        />
        <Button type="primary" onClick={handleSearch}>
          بحث
        </Button>
      </div>
      <Table
        dataSource={orders?.orders?.data}
        columns={columns}
        isLoading={isLoading}
        pagination={{ pageSize: 10 }}
        rowClassName={rowClassName}
      />
    </Box>
  );
};

export default UserReferalPurshase ;