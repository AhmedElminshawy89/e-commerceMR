import  { useState } from "react";
import { Box, Grid, Card, Typography, CardContent } from "@mui/material";
import { FaUsers, FaBox, FaShoppingCart, FaDollarSign } from "react-icons/fa";
import UserDetails from "./Users";

const DashboardIndex = () => {
  const [data, setData] = useState({
    clients: 250,
    products: 1200,
    orders: 500,
    sales: 85000,
  });


  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
              background: 'linear-gradient(45deg, #3f51b5, #5c6bc0)', 
              textAlign: "center", 
              padding: 2, 
              borderRadius: 3,
              boxShadow: 3,
              color: "white" 
            }}>
            <CardContent>
              <FaUsers size={40} />
              <Typography variant="h6" sx={{ marginTop: 1, fontWeight: 'bold' }}>
                Clients
              </Typography>
              <Typography variant="h4">{data.clients}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
              background: 'linear-gradient(45deg, #ff9800, #ffb74d)', 
              textAlign: "center", 
              padding: 2, 
              borderRadius: 3,
              boxShadow: 3,
              color: "white" 
            }}>
            <CardContent>
              <FaBox size={40} />
              <Typography variant="h6" sx={{ marginTop: 1, fontWeight: 'bold' }}>
                Products
              </Typography>
              <Typography variant="h4">{data.products}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
              background: 'linear-gradient(45deg, #4caf50, #81c784)', 
              textAlign: "center", 
              padding: 2, 
              borderRadius: 3,
              boxShadow: 3,
              color: "white" 
            }}>
            <CardContent>
              <FaShoppingCart size={40} />
              <Typography variant="h6" sx={{ marginTop: 1, fontWeight: 'bold' }}>
                Orders
              </Typography>
              <Typography variant="h4">{data.orders}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
              background: 'linear-gradient(45deg, #e91e63, #f06292)', 
              textAlign: "center", 
              padding: 2, 
              borderRadius: 3,
              boxShadow: 3,
              color: "white" 
            }}>
            <CardContent>
              <FaDollarSign size={40} />
              <Typography variant="h6" sx={{ marginTop: 1, fontWeight: 'bold' }}>
                Sales
              </Typography>
              <Typography variant="h4">${data.sales.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{marginTop:5}}>
        <UserDetails/>
      </Box>
    </Box>
  );
};

export default DashboardIndex;
