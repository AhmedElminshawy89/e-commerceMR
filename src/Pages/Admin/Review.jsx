import { useState } from "react";
import { Box } from "@mui/material";
import { Table } from "antd";
import { useShowAllAdminReviewQuery } from "../../app/Api/Review";

const Reviews = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: ReviewData, isLoading } = useShowAllAdminReviewQuery(currentPage);
  const pageSize = 10;

  const columns = [
    { title: "Customer Name", dataIndex: "user", key: "user.name",render: (user) => user?.name, width: 150 },
    { title: "Product Name", dataIndex: "product", key: "product.name_en",render: (product) => product?.name_en, width: 150 },
    { title: "Rating", dataIndex: "rating", key: "rating", width: 100 },
    { title: "Review", dataIndex: "comment", key: "comment", width: 300 },
  ];
  const rowClassName = (record, index) => {
    return index % 2 !== 0 ? "even-row" : "";
  };
  return (
    <Box sx={{ height: 500, width: "100%" }}  className="cta">
      <Table
        dataSource={ReviewData?.data?.review?.data || []}
        columns={columns}
        rowKey="id"
        rowClassName={rowClassName}
        loading={isLoading}
        pagination={{
          total: ReviewData?.data?.review?.total || 0,
          current: currentPage,
          pageSize: pageSize,
          onChange: (page) => setCurrentPage(page),
        }}
      />
    </Box>
  );
};

export default Reviews;
