import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const PaymentTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const initialData = [
      {
        id: 1,
        customerName: "John Doe",
        amount: 100.0,
        paymentMethod: "Credit Card",
        date: "2025-01-18",
        status: "Successful",
      },
      {
        id: 2,
        customerName: "Jane Smith",
        amount: 50.0,
        paymentMethod: "PayPal",
        date: "2025-01-17",
        status: "Failed",
      },
      {
        id: 3,
        customerName: "Michael Johnson",
        amount: 200.0,
        paymentMethod: "Bank Transfer",
        date: "2025-01-16",
        status: "Successful",
      },
    ];
    setTransactions(initialData);
  }, []);

  const columns = [
    { field: "customerName", headerName: "Customer Name", flex: 1, minWidth: 150 },
    { field: "amount", headerName: "Amount", flex: 0.5, minWidth: 100, type: "number" },
    { field: "paymentMethod", headerName: "Payment Method", flex: 1, minWidth: 150 },
    { field: "date", headerName: "Date", flex: 0.5, minWidth: 150 },
    {
      field: "status",
      headerName: "Status",
      flex: 0.5,
      minWidth: 150,
      cellClassName: (params) =>
        params.value === "Successful" ? "status-success" : "status-failed",
    },
  ];

  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <DataGrid 
        rows={transactions} 
        columns={columns} pageSize={5} 
          rowsPerPageOptions={[5, 10, 15]}
          checkboxSelection
          disableSelectionOnClick
      />
    </Box>
  );
};

export default PaymentTransactions;
