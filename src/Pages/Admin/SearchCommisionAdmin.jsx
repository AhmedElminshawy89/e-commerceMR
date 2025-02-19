import { Table, Button, Space, Tag, DatePicker, Select, Form, message } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useSearchCommissionReqMutation, useUpdateCommissionReqMutation } from "../../app/Api/Payments";
import { useState } from "react";
import { Box } from "@mui/material";

const { RangePicker } = DatePicker;

const SearchCommisionAdmin = () => {
  const { i18n } = useTranslation();
  const [searchParams, setSearchParams] = useState({ status: '', from: '', to: '' });
  const [searchCommissionReq, { data: Commission, isLoading, refetch }] = useSearchCommissionReqMutation(); // Updated to use search mutation properly
  const [updateCommission, { isLoading: loadingUpdate }] = useUpdateCommissionReqMutation();
  const res = document.cookie.split('; ').find(row => row.startsWith('res='))?.split('=')[1];
  const IsAvailable = res === 'Moderator';

  const handleSearch = (values) => {
    const { status, dates } = values;
    const from = dates ? dates[0].format('YYYY-MM-DD') : '';
    const to = dates ? dates[1].format('YYYY-MM-DD') : '';
    setSearchParams({ status, from, to });

    searchCommissionReq({ status, from, to });
  };

  const columns = [
    {
      title: i18n.language === "EN" ? "name" : "تاريخ",
      dataIndex: "sales",
      key: "sales",
      render: (text) => {
        return text?.name;
      },
    },
    {
      title: i18n.language === "EN" ? "Request Date" : "تاريخ",
      dataIndex: "withdraw_date",
      key: "withdraw_date",
      render: (text) => {
        const date = new Date(text);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
        return formattedDate;
      },
    },
    {
      title: i18n.language === "EN" ? "Commission" : "تاريخ",
      dataIndex: "amount",
      key: "amount",
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
      title: "Actions",
      key: "actions",
      render: (_, record) =>
        IsAvailable || record.status === 'paid' ? null : (
          <Button
            onClick={() => handleUpdateCommission(record.id)}
            style={{ color: "green", marginRight: 10 }}
            loading={loadingUpdate}
          >
            Accept the request
          </Button>
        ),
    },
  ];

  const handleUpdateCommission = async (id) => {
    try {
      const response = await updateCommission(id);
      if (response?.data) {
        refetch();
        message.success("Commission updated successfully");
      }
    } catch (error) {
      console.error("Error updating commission:", error);
    }
  };

  return (
    <Box style={{ padding: "20px" }} className="cta">
      <Form onFinish={handleSearch} layout="inline" style={{marginBottom:'20px'}}>
        <Form.Item name="status" label={i18n.language === "EN" ? "Status" : "الحالة"}>
          <Select
            defaultValue=""
            style={{ width: 120 }}
            options={[
              { value: 'all', label: i18n.language === "EN" ? "All" : "الكل" },
              { value: 'pending', label: i18n.language === "EN" ? "Pending" : "معلق" },
              { value: 'paid', label: i18n.language === "EN" ? "Paid" : "مدفوع" },
            ]}
          />
        </Form.Item>
        <Form.Item name="dates" label={i18n.language === "EN" ? "Date Range" : "تاريخ"}>
          <RangePicker />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {i18n.language === "EN" ? "Search" : "بحث"}
          </Button>
        </Form.Item>
      </Form>

      <Table
        dataSource={Commission?.commissions || []}
        columns={columns}
        loading={isLoading}
        
      />
    </Box>
  );
};

export default SearchCommisionAdmin;
