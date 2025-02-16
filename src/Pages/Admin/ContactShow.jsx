import { useState } from "react";
import { Box } from "@mui/material";
import { Table } from "antd";
import { useShowAllAdminContactQuery } from "../../app/Api/Contact";
import { Link } from "react-router-dom";

const ContactShow = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: ContactData, isLoading } = useShowAllAdminContactQuery(currentPage);
  const pageSize = 10;

  const columns = [
    { title: "Customer Name", dataIndex: "name", key: "name", width: 150 },
    { title: "Email", dataIndex: "email", key: "email", width: 100 },
    { title: "Message", dataIndex: "message", key: "message", width: 400 },
  ];
  const rowClassName = (record, index) => {
    return index % 2 !== 0 ? "even-row" : "";
  };
  
  return (
    <Box sx={{ height: 500, width: "100%" }}  className="cta">
            <div style={{padding:0,marginBottom:20}}>
      <Link
      to={'/dashboard/admin/control/ContactSearch'}
      className="banner-button"
      >
        Search Contact
      </Link>      
      </div>
      <Table
        dataSource={ContactData?.contact?.data || []}
        columns={columns}
        rowKey="id"
        rowClassName={rowClassName}
        loading={isLoading}
        pagination={{
          total: ContactData?.contact?.total || 0,
          current: currentPage,
          pageSize: pageSize,
          onChange: (page) => setCurrentPage(page),
        }}
      />
    </Box>
  );
};

export default ContactShow;
