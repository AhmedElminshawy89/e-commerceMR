import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Table } from "antd";
import { useLazyShowAllAdminContactSearchQuery } from "../../app/Api/Contact";

const ContactSearch = () => {
  const [name, setName] = useState(""); 

  const [triggerSearch, { data: ContactData, isLoading }] = useLazyShowAllAdminContactSearchQuery(); 

  const handleSearch = () => {
    triggerSearch(name);
  };

  const columns = [
    { title: "Customer Name", dataIndex: "name", key: "name", width: 150 },
    { title: "Email", dataIndex: "email", key: "email", width: 100 },
    { title: "Message", dataIndex: "message", key: "message", width: 400 },
  ];

  const rowClassName = (record, index) => {
    return index % 2 !== 0 ? "even-row" : "";
  };

  return (
    <Box sx={{ height: 500, width: "100%" }} className="cta">
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)} // Update the name state
          sx={{ marginRight: 2 }}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      <Table
        dataSource={ContactData?.contacts || []}
        columns={columns}
        rowKey="id"
        rowClassName={rowClassName}
        loading={isLoading}
        pagination={{
          pageSize: 10,
        }}
      />
    </Box>
  );
};

export default ContactSearch;
