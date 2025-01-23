import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const initialData = [
      { 
        id: 1, 
        customerName: "John Doe", 
        rating: 5, 
        reviewText: "Excellent service!", 
        productName: "Wireless Earbuds" 
      },
      { 
        id: 2, 
        customerName: "Jane Smith", 
        rating: 4, 
        reviewText: "Great product, but shipping was delayed.", 
        productName: "Bluetooth Speaker" 
      },
      { 
        id: 3, 
        customerName: "Michael Johnson", 
        rating: 3, 
        reviewText: "Average quality, not worth the price.", 
        productName: "Smart Watch" 
      },
    ];
    setReviews(initialData);
  }, []);

  const columns = [
    { field: "customerName", headerName: "Customer Name", flex: 1, minWidth: 150 },
    { field: "productName", headerName: "Product Name", flex: 1, minWidth: 150 },
    { field: "rating", headerName: "Rating", flex: 0.5, minWidth: 100, type: "number" },
    { field: "reviewText", headerName: "Review", flex: 2, minWidth: 300 },
  ];

  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <DataGrid 
        rows={reviews} 
        columns={columns} pageSize={5} 
          rowsPerPageOptions={[5, 10, 15]}
          checkboxSelection
          disableSelectionOnClick
      />
    </Box>
  );
};

export default Reviews;
