import { Table, Button, Tag, Select } from "antd";
import { useTranslation } from "react-i18next";
import { useShowPendingOrdersQuery, useUpdateCommissionReqMutation } from "../../app/Api/Payments";
import { useShowAllSalesQuery } from "../../app/Api/Admin";
import { useState } from "react";

const AllCommissionToSales = () => {
  const { i18n } = useTranslation();
  const { data: sales } = useShowAllSalesQuery();
  const [selectedSalesId, setSelectedSalesId] = useState(null);
  const [triggerSearch, setTriggerSearch] = useState(false);
  const { data: PendingOrders, isLoading } = useShowPendingOrdersQuery(selectedSalesId, {
    skip: !triggerSearch, 
  });

  const handleSelectChange = (value) => {
    setSelectedSalesId(value);
  };

  const handleSearchClick = () => {
    setTriggerSearch(true);
    setTimeout(() => {
      setTriggerSearch(false);
    }, 500); 
  };
  const [updateCommission , {isLoading:loadingUpdate}] = useUpdateCommissionReqMutation()
const res = document.cookie.split('; ').find(row => row.startsWith('res='))?.split('=')[1];
  const IsAvailable = res==='Moderator'
  const columns = [
    {
      title: i18n.language === "EN" ? "name" : "تاريخ",
      dataIndex: "sales",
      key: "sales",
      render: (text) => text?.name,
    },
    {
      title: i18n.language === "EN" ? "Request Date" : "تاريخ",
      dataIndex: "withdraw_date",
      key: "withdraw_date",
      render: (text) => {
        const date = new Date(text);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
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
            <>
              <Button
                onClick={() => handleUpdateCommission(record.id)} 
                style={{ color: "green", marginRight: 10 }}
                loading={loadingUpdate}
              >
                Accept the request
              </Button>
            </>
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
    <div style={{ padding: "20px" }} className="cta">
      <div>
        <Select
          placeholder="Select Sales"
          onChange={handleSelectChange}
          style={{ width: 200 }}
        >
          {sales?.admin?.map((sale) => (
            <Select.Option key={sale.id} value={sale.id}>
              {sale.name}
            </Select.Option>
          ))}
        </Select>
        <Button
          type="primary"
          style={{ marginBottom: "20px", marginLeft: "10px" }}
          onClick={handleSearchClick} 
        >
          Search
        </Button>
      </div>

      <Table
        dataSource={PendingOrders?.commissions}
        columns={columns}
        loading={isLoading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default AllCommissionToSales;
