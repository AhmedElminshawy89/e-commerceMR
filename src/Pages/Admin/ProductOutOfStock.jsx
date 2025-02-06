import { useEffect, useState } from "react";
import { Box, Button} from "@mui/material";
import {  useShowOutOfStockQuery } from "../../app/Api/Product";
import { Table } from "antd";
import { FaRegEye } from "react-icons/fa";

import ProductsModal from '../../components/Modal/ProductsModal'
import { Link } from "react-router-dom";


const ProductOutOfStock = () => {
  const [categories, setCategories] = useState([]);
  const [isModalVisibleP, setIsModalVisibleP] = useState(false);

  const handleCloseModalP = () => setIsModalVisibleP(false);
  const [showProduct, setShowProduct] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  
  const { data, refetch ,isLoading} = useShowOutOfStockQuery(currentPage);



  useEffect(() => {
    if (data) {
      setCategories(data.products?.data || []);
    }
  }, [data]);



  const handleShowProduct = (product) => {
    setShowProduct(product);
    setIsModalVisibleP(true);
  };


  

  const columns = [
    { title: "Product Name (Arabic)", dataIndex: "name_ar", key: "name_ar", render: (text) => text },
    { title: "Product Name (English)", dataIndex: "name_en", key: "name_en", render: (text) => text },
    { title: "Main Price", dataIndex: "main_price", key: "main_price", render: (text) => text },
    { title: "Price Discount", dataIndex: "price_discount", key: "price_discount", render: (text) => text },
    { title: "Stock", dataIndex: "stock", key: "stock", render: (text) => text },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={image}
          alt="category"
          style={{ width: 45, height: 45, objectFit: "cover", borderRadius: "50px" }}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
            <Button
            onClick={() => handleShowProduct(record)}
            style={{ color: "#333" }}
          ><FaRegEye/></Button>
        </>
      ),
    },
  ];

  const rowClassName = (record, index) => {
    return index % 2 !== 0 ? "even-row" : "";
  };


  return (
    <>
      <Box>
      <div style={{padding:10,marginBottom:20}}>
      <Link
      to={'/dashboard/admin/control/ProductSearch'}
      className="banner-button"
      >
        Search Product
      </Link>      
      </div>

      </Box>
      <Box sx={{ height: "auto", width: "100%" }} className="cta">
        <Table
          dataSource={categories}
          columns={columns}
          rowKey="id"
          loading={isLoading}
          rowClassName={rowClassName}
          pagination={{
            total: data?.products?.total || 0,
            current: currentPage,
            pageSize: pageSize,
            onChange: (page) => {
              setCurrentPage(page);
              refetch();
            },
          }}
        />
      </Box>
      <ProductsModal
        isModalVisible={isModalVisibleP}
        handleCloseModal={handleCloseModalP}
        showProduct={showProduct}
      />
    </>
  );
};

export default ProductOutOfStock;

