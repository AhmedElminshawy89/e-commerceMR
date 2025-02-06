import { useState } from "react";
import { Box } from "@mui/material";
import { Table } from "antd";
import { useShowAllAdminSubscribeQuery } from "../../app/Api/Contact";

const SubscribeShow = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: ContactData, isLoading } = useShowAllAdminSubscribeQuery(currentPage);
  const pageSize = 10;

  const columns = [
{ title: "Email", dataIndex: "email", key: "email"},
  ];
  const rowClassName = (record, index) => {
    return index % 2 !== 0 ? "even-row" : "";
  };
  return (
    <Box sx={{ height: 500, width: "100%" }}  className="cta">
      <Table
        dataSource={ContactData?.subscribe?.data || []}
        columns={columns}
        rowKey="id"
        rowClassName={rowClassName}
        loading={isLoading}
        pagination={{
          total: ContactData?.subscribe?.total || 0,
          current: currentPage,
          pageSize: pageSize,
          onChange: (page) => setCurrentPage(page),
        }}
      />
    </Box>
  );
};

export default SubscribeShow;
