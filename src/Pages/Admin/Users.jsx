import { useState } from "react";
import { Box } from "@mui/material";
import { Table } from "antd";
import { useShowAllAdminUsersQuery } from "../../app/Api/Users";
import { Link } from "react-router-dom";

const UserDetails = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: ReviewData, isLoading } = useShowAllAdminUsersQuery(currentPage);
  const pageSize = 10;

  const columns = [
    { title: "Image", dataIndex: "image", key: "image",render:(data)=><img src={data} alt="" style={{ width: 45, height: 45, objectFit: "cover", borderRadius: "50px" }}/>, width: 100 },
    { title: "Customer Name", dataIndex: "name", key: "name", width: 150 },
    { title: "Email", dataIndex: "email", key: "email", width: 150 },
    { title: "Phone", dataIndex: "phone", key: "phone", width: 100 },
    { title: "Gender", dataIndex: "gender", key: "gender", width: 100 },
  ];
  const rowClassName = (record, index) => {
    return index % 2 !== 0 ? "even-row" : "";
  };
  return (
    <Box sx={{ height: 500, width: "100%" }}  className="cta">
            <div style={{padding:10,marginBottom:20}}>
      <Link
      to={'/dashboard/admin/control/UserSearch'}
      className="banner-button"
      >
        Search User
      </Link>      
      </div>
      <Table
        dataSource={ReviewData?.user?.data || []}
        columns={columns}
        rowKey="id"
        rowClassName={rowClassName}
        loading={isLoading}
        pagination={{
          total: ReviewData?.user?.total || 0,
          current: currentPage,
          pageSize: pageSize,
          onChange: (page) => setCurrentPage(page),
        }}
      />
    </Box>
  );
};

export default UserDetails;
