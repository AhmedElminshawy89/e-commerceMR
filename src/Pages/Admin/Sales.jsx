import { useState, useEffect } from "react";
import { Box, Avatar, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const Sales = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const initialData = [
      {
        id: 1,
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "+1234567890",
        gender: "Male",
        country: "USA",
        city: "New York",
        avatar: "https://via.placeholder.com/50",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "janesmith@example.com",
        phone: "+9876543210",
        gender: "Female",
        country: "UK",
        city: "London",
        avatar: "https://via.placeholder.com/50",
      },
      {
        id: 3,
        name: "Michael Johnson",
        email: "michaeljohnson@example.com",
        phone: "+1928374650",
        gender: "Male",
        country: "Canada",
        city: "Toronto",
        avatar: "https://via.placeholder.com/50",
      },
    ];
    setUsers(initialData);
  }, []);

  // Function to handle copying the link
  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link).then(() => {
      alert("Link copied to clipboard!");
    }).catch((err) => {
      console.error("Failed to copy: ", err);
    });
  };

  const columns = [
    { field: "avatar", headerName: "Avatar", flex: 0.5, minWidth: 100, renderCell: (params) => <Avatar src={params.value} alt="Avatar" /> },
    { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 1.5, minWidth: 200 },
    { field: "phone", headerName: "Phone", flex: 1, minWidth: 150 },
    { field: "gender", headerName: "Gender", flex: 0.5, minWidth: 100 },
    { field: "country", headerName: "Country", flex: 1, minWidth: 150 },
    { field: "city", headerName: "City", flex: 1, minWidth: 150 },
    {
      field: "copyLink",
      headerName: "Copy Link",
      flex: 0.5,
      minWidth: 150,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleCopyLink(params.row.email)} // You can replace this with any field you want to copy
        >
          Copy Link
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 15]}
        checkboxSelection
        disableSelectionOnClick
      />
    </Box>
  );
};

export default Sales;
