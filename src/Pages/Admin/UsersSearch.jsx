import { useState } from "react";
import { Box, Button } from "@mui/material";
import { Table, Input } from "antd";
import { useShowAllAdminUsersSearchQuery } from "../../app/Api/Users";

const UserSearch = () => {
  const [searchParams, setSearchParams] = useState({ phone: "", name_en: "" });
  const [triggerSearch, setTriggerSearch] = useState(false);

  const { data: searchedData, isLoading: isSearchLoading } = useShowAllAdminUsersSearchQuery(searchParams, {
    skip: !triggerSearch, 
  });

  const columns = [
    { title: "Image", dataIndex: "image", key: "image", render: (data) => <img src={data} alt="" style={{ width: 45, height: 45, objectFit: "cover", borderRadius: "50px" }} />, width: 100 },
    { title: "Customer Name", dataIndex: "name", key: "name", width: 150 },
    { title: "Email", dataIndex: "email", key: "email", width: 150 },
    { title: "Phone", dataIndex: "phone", key: "phone", width: 100 },
    { title: "Gender", dataIndex: "gender", key: "gender", width: 100 },
  ];

  const rowClassName = (record, index) => {
    return index % 2 !== 0 ? "even-row" : "";
  };

  const handleSearchChange = (field) => (e) => {
    setSearchParams((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSearchClick = () => {
    setTriggerSearch(true); // Trigger search
    setTimeout(() => {
      setTriggerSearch(false); // Reset trigger after search
    }, 1000); // Wait for 1 second before resetting
  };

  return (
    <Box sx={{ height: 500, width: "100%" }} className="cta">
      <div style={{ marginBottom: "20px" }}>
        <Input
          placeholder="Search by Name"
          value={searchParams.name}
          onChange={handleSearchChange("name")}
          style={{ width: 200, marginRight: "10px" }}
        />
        <Input
          placeholder="Search by Phone"
          value={searchParams.phone}
          onChange={handleSearchChange("phone")}
          style={{ width: 200 }}
        />
        <Button
          onClick={handleSearchClick}
          style={{ marginLeft: "10px" }}
          variant="contained"
          color="primary"
        >
          Search
        </Button>
      </div>
      <Table
        dataSource={searchedData?.users || []}
        columns={columns}
        rowKey="id"
        rowClassName={rowClassName}
        loading={isSearchLoading}
        pagination={{
          pageSize: 10,
        }}
      />
    </Box>
  );
};

export default UserSearch;
