import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { Box, Button, Modal, TextField, Typography,
     Dialog, DialogActions, DialogContent, DialogTitle, styled ,MenuItem, InputLabel, FormControl,
     FormHelperText} from "@mui/material";
import { MdDelete, MdDeleteOutline } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { useShowCategoryQuery } from "../../app/Api/Categories";
import { useDelProductsMutation, useSaveProductsMutation,
   useShowAllAdminProductsSearchQuery,
   useUpdateProductMutation } from "../../app/Api/Product";
import { Input, message, Table , Select } from "antd";
import { FaRegEye } from "react-icons/fa";

import ProductsModal from '../../components/Modal/ProductsModal'

const { Option } = Select;
const StyledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%", 
    width: "100%",  
    margin: 0,       
    padding: 0,   
  });

const StyledBox = styled(Box)({
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
});

const ProductSearch = () => {
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleP, setIsModalVisibleP] = useState(false);
  const [searchParams, setSearchParams] = useState({ category_name: "", name: "" ,barcode:""});
  const [triggerSearch, setTriggerSearch] = useState(false);
  const handleCloseModalP = () => setIsModalVisibleP(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showProduct, setShowProduct] = useState(null);
  const [colors, setColors] = useState(["#ffffff"]);
  const [formValues, setFormValues] = useState({
    category_id:"",
    name_ar: "",
    name_en: "",
    desc_ar: "",
    desc_en: "",
    main_price: "",
    price_discount: "",
    colors: [],
    sizes: [],
    stock: "",
    barcode: "",
    image: "",
    OtherImage: [],
  });

  const [errors, setErrors] = useState({
    name_ar: "",
    name_en: "",
    desc_ar: "",
    desc_en: "",
    mainPrice: "",
    priceDiscount: "",
    colors: "",
    colorsCount:"",
    sizes: "",
    stock: "",
    barcode: "",
    mainImage: "",
  });

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  
  const{ data:categoryData }= useShowCategoryQuery();
  const { data, refetch ,isLoading} = useShowAllAdminProductsSearchQuery(searchParams, {
    skip: !triggerSearch, 
  });
  const [saveProduct , {isLoading:loadingSave}] = useSaveProductsMutation();
  const [updateProduct,{isLoading:loadingUpdate}] = useUpdateProductMutation();
  const [delProduct,{isLoading:loadingDel}] = useDelProductsMutation();



  useEffect(() => {
    if (data) {
      setCategories(data.product || []);
    }
  }, [data]);

  // const handleOpenModal = () => {
  //   setIsModalVisible(true);
  // };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setEditingProduct(null);
    setFormValues({
      name_ar: "",
      name_en: "",
      desc_ar: "",
      desc_en: "",
      colorsCount:"",
      main_price: "",
      price_discount: "",
      colors: [],
      sizes: [],
      stock: "",
      barcode: "",
      image: [],
    });
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === "image") {
      const file = files[0];
      
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
      
      if (file && !allowedTypes.includes(file.type)) {
        message.warning('The image must be a file of type: jpg, jpeg, png, gif.');
        return; 
      }
      
      setFormValues({ ...formValues, image: file });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  // const handleImageChange = (event) => {
  //   const files = Array.from(event.target.files);
  //   const newImages = files.map((file) => URL.createObjectURL(file)); 
  //   setFormValues((prevValues) => ({
  //     ...prevValues,
  //     OtherImage: [...prevValues.OtherImage, ...newImages],
  //   }));
  // };

  const handleAddImage = (e) => {
    const files = e.target.files;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
  
    Array.from(files).forEach((file) => {
      if (!allowedTypes.includes(file.type)) {
        message.warning('The image must be a file of type: jpg, jpeg, png, gif.');
        return;
      }
      
      if (editingProduct) {
        setFormValues((prevValues) => ({
          ...prevValues,
          OtherImage: [
            ...(Array.isArray(prevValues.OtherImage) 
              ? prevValues.OtherImage.filter(image => typeof image === 'object' || image.url) 
              : []),
            ...Array.from(files), 
          ],
        }));
      } else {
        setFormValues((prevValues) => ({
          ...prevValues,
          OtherImage: [
            ...(Array.isArray(prevValues.OtherImage) ? prevValues.OtherImage : []), // التأكد من أن OtherImage مصفوفة
            file,
          ],
        }));
      }
    });
  };

  const handleRemoveImage = (index) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      OtherImage: prevValues.OtherImage.filter((_, i) => i !== index),
    }));
  };
  
  const handleColorChange = (index, event) => {
    const newColors = [...colors];
    newColors[index] = event.target.value;
    setColors(newColors);
    setFormValues(prevValues => ({
      ...prevValues,
      colors: newColors
    }));
  };

  const handleAddColor = () => {
    const newColors = [...colors, "#ffffff"];
    setColors(newColors);
    setFormValues(prevValues => ({
      ...prevValues,
      colors: newColors
    }));
  };

  const handleRemoveColor = (index) => {
    const newColors = colors.filter((_, i) => i !== index); 
    setColors(newColors);
    setFormValues(prevValues => ({
      ...prevValues,
      colors: newColors
    }));
  };


  const validateForm = () => {
    const newErrors = {};
    if (!formValues.name_ar) newErrors.name_ar = "Product Name (Arabic) is required";
    if (!formValues.name_en) newErrors.name_en = "Product Name (English) is required";
    if (!formValues.desc_ar) newErrors.desc_ar = "Product Description (Arabic) is required";
    if (!formValues.desc_en) newErrors.desc_en = "Product Description (English) is required";
    if (!formValues.main_price) newErrors.mainPrice = "Main Price is required";
    if (!formValues.price_discount) newErrors.priceDiscount = "Price Discount is required";
    if (!formValues.colors) newErrors.colors = "Product Colors are required";
    if (!formValues.sizes) newErrors.sizes = "Product Sizes are required";
    if (!formValues.stock) newErrors.stock = "Product Stock is required";
    if (!formValues.barcode) newErrors.barcode = "Product Barcode is required";
    if (!formValues.image) newErrors.mainImage = "Main Image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddOrEditProduct = async () => {
    if (!validateForm()) return;
  
    const formData = new FormData();
    formData.append("category_id", formValues.category_id);
    formData.append("name_ar", formValues.name_ar);
    formData.append("name_en", formValues.name_en);
    formData.append("desc_ar", formValues.desc_ar);
    formData.append("desc_en", formValues.desc_en);
    formData.append("main_price", formValues.main_price);
    formData.append("price_discount", parseFloat(formValues.price_discount));
    formData.append("colors", JSON.stringify(formValues.colors)); 
    formData.append("sizes", JSON.stringify(formValues.sizes));  
    formData.append("stock", formValues.stock);
    formData.append("image", formValues.image);
    formData.append("barcode", formValues.barcode);
    formValues.OtherImage.forEach((file) => {
      formData.append("OtherImage[]", file); 
    });
     
    try {
      let res;
      if (editingProduct) {
        res = await updateProduct({ id: editingProduct.id, updateProduct: formData });
        // message.success("Product updated successfully!");
      } else {
        res = await saveProduct(formData);

      }  
      if (res?.error?.data?.errors) {
        const errors = res.error.data.errors;
        Object.keys(errors).map((key) => {
          const errorMessages = errors[key];
          message.error(...errorMessages);
          // alert(...errorMessages)
        });
      }
      if(res?.data?.status === true){
        refetch();
        message.success(res?.data?.msg);
        alert(res?.data?.msg);
        handleCloseModal();
      }
  
    } catch (error) {
      console.error("Error during save or update:", error);
      message.error("An unexpected error occurred. Please try again.");
    }
    console.log(formValues);
  };
  
  

  const handleEditProduct = (product) => {
    setFormValues(product);
    setEditingProduct(product);
    setIsModalVisible(true);
  };

  const handleShowProduct = (product) => {
    setShowProduct(product);
    setIsModalVisibleP(true);
  };

  const handleDeleteProduct = (id) => {
    setProductToDelete(id);
    setOpenDeleteDialog(true);
  };
  
  const confirmDeleteProduct = async() => {
     try {
      await delProduct(productToDelete);
      refetch();
      setOpenDeleteDialog(false);
      setProductToDelete(null);
      message.success("Product deleted successfully!");
    } catch (e) {
      message.error("Something went wrong while deleting the category.",e);
    }
  };

  const cancelDeleteProduct = () => {
    setOpenDeleteDialog(false);
    setProductToDelete(null);
  };

  const handleExportToCSV = () => {
    const header = [
      "id", "name_ar", "name_en", "desc_ar", "desc_en", 
      "mainPrice", "priceDiscount", "colors", "sizes", 
      "stock", "barcode"
    ];
  
    const rows = categories.map((product) => [
      product.id,
      product.name_ar,
      product.name_en,
      product.desc_ar,
      product.desc_en,
      product.main_price,
      product.price_discount,
      (product.colors && Array.isArray(product.colors) ? product.colors.join("; ") : ""),
      (product.sizes && Array.isArray(product.sizes) ? product.sizes.join("; ") : ""),  
      product.stock,
      product.barcode,
      // product.mainImage,
      // product.otherImage,
    ]);
    let csvContent = "\ufeff" + header.join(",") + "\n";

    rows.forEach((row) => {
      csvContent += row.join(",") + "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "categories.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const res = document.cookie.split('; ').find(row => row.startsWith('res='))?.split('=')[1];
  const IsAvailable = res==='Moderator'
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
      render: (_, record) =>  IsAvailable?null:(
        <>
          <Button
            onClick={() => handleEditProduct(record)}
            style={{ color: "green", marginRight: 10 }}
            icon={<CiEdit />}
            loading={loadingUpdate}
          ><CiEdit/></Button>
          <Button
            onClick={() => handleDeleteProduct(record.id)}
            style={{ color: "red" }}
            icon={<MdDelete />}
            loading={loadingDel} 
          ><MdDelete/></Button>
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



  const handleSearchChange = (field) => (value) => {
    setSearchParams((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  

  const handleSearchClick = () => {
    setTriggerSearch(true);
    setTimeout(() => {
      setTriggerSearch(false);
    }, 1000); 
  };

  return (
    <>
      <Box>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" },alignItems:'center' , gap:2}}>
      <Input
          placeholder="Search by Name"
          value={searchParams.name}
          onChange={(e)=>handleSearchChange("name")(e.target.value)}
          style={{ width: 200, marginRight: "10px" }}
        />
<Select
  placeholder="اختر اسم الفئة"
  value={searchParams.category_name}
  onChange={handleSearchChange("category_name")}
  style={{ width: 200 }}
>
  {categoryData?.categories?.map((e) => (
    e?.id && e?.name_en ? (
      <Option key={e.id} value={e.name_en}>
        {e.name_en}
      </Option>
    ) : null
  ))}
</Select>



        <Input
          placeholder="Search by barcode"
          value={searchParams.barcode}
          onChange={(e)=>handleSearchChange("barcode")(e.target.value)}

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
      </Box>
      {!IsAvailable &&(
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleExportToCSV}
          sx={{ marginBottom: 2, marginLeft: 2 }}
        >
          Export to CSV
        </Button>
      )}
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
      <StyledModal open={isModalVisible} onClose={handleCloseModal} sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}>  
        <StyledBox>
          <Typography variant="h6">{editingProduct ? "Edit Product" : "Add Product"}</Typography>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } , gap:2}}>
          <FormControl fullWidth margin="normal" error={!!errors.category_id} >
  <InputLabel>Category Name</InputLabel>
  <Select
    name="category_id"
    value={formValues.category_id}
    onChange={handleInputChange}
    label="Category Name"
  >
    {categoryData?.categories?.map((cta,index)=>(
      <MenuItem key={index} value={cta?.id}>{cta?.name_ar || cta?.name_en}</MenuItem>
    ))}
  </Select>
  <FormHelperText>{errors.category_id}</FormHelperText>
</FormControl>
            <TextField
                name="name_ar"
                label="Product Name (Arabic)"
                fullWidth
                margin="normal"
                value={formValues.name_ar}
                onChange={handleInputChange}
                error={!!errors.name_ar}
                helperText={errors.name_ar}
            />
            <TextField
                name="name_en"
                label="Product Name (English)"
                fullWidth
                margin="normal"
                value={formValues.name_en}
                onChange={handleInputChange}
                error={!!errors.name_en}
                helperText={errors.name_en}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } , gap:2}}>
            <TextField
                name="desc_ar"
                label="Description (Arabic)"
                fullWidth
                margin="normal"
                value={formValues.desc_ar}
                onChange={handleInputChange}
                error={!!errors.desc_ar}
                helperText={errors.desc_ar}
            />
            <TextField
                name="desc_en"
                label="Description (English)"
                fullWidth
                margin="normal"
                value={formValues.desc_en}
                onChange={handleInputChange}
                error={!!errors.desc_en}
                helperText={errors.desc_en}
            />
          </Box>


          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } , gap:2}}>
            <TextField
                name="main_price"
                label="Main Price"
                fullWidth
                margin="normal"
                value={formValues.main_price}
                onChange={handleInputChange}
                error={!!errors.mainPrice}
                helperText={errors.mainPrice}
            />
            <TextField
                name="price_discount"
                label="Price Discount"
                fullWidth
                margin="normal"
                value={formValues.price_discount}
                onChange={handleInputChange}
                error={!!errors.priceDiscount}
                helperText={errors.priceDiscount}
            />
                        
          </Box>
    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } , gap:2}}>
      <TextField
        name="colors"
        label="Colors"
        fullWidth
        margin="normal"
        value={Array.isArray(formValues?.colors) ? formValues.colors.join(', ') : ''}
        onChange={handleInputChange}
        error={!!errors.colors}
        helperText={errors.colors}
        disabled
      />
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "column" } , gap:2}}>
        {colors?.map((color, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <input
                type="color"
                value={color}
                onChange={(event) => handleColorChange(index, event)}
                style={{ border: 'none', width: '30px', height: '30px', cursor: 'pointer' }}
            />
            <Button variant="outlined" onClick={() => handleRemoveColor(index)} style={{ marginLeft: '10px' }}>
                <MdDeleteOutline/>
            </Button>
        <Button variant="outlined" onClick={handleAddColor}>
            <IoIosAdd/>
        </Button>
            </div>
        ))}
      </Box>
    </Box>

          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } , gap:2}}>
          
<FormControl fullWidth margin="normal" error={!!errors.sizes}>
  <InputLabel>Sizes</InputLabel>
  <Select
    name="sizes"
    value={formValues.sizes}
    onChange={handleInputChange}
    label="Sizes"
    multiple
  >
    <MenuItem value="S">S</MenuItem>
    <MenuItem value="M">M</MenuItem>
    <MenuItem value="L">L</MenuItem>
    <MenuItem value="XL">XL</MenuItem>
    <MenuItem value="2XL">2XL</MenuItem>
    <MenuItem value="3XL">3XL</MenuItem>
    <MenuItem value="2">2</MenuItem>
    <MenuItem value="4">4</MenuItem>
    <MenuItem value="6">6</MenuItem>
    <MenuItem value="8">8</MenuItem>
    <MenuItem value="10">10</MenuItem>
    <MenuItem value="12">12</MenuItem>
  </Select>
  <FormHelperText>{errors.sizes}</FormHelperText>
</FormControl>

            <TextField
                name="stock"
                label="Stock"
                fullWidth
                margin="normal"
                type="number"
                value={formValues.stock}
                onChange={handleInputChange}
                error={!!errors.stock}
                helperText={errors.stock}
            />
            <TextField
                name="barcode"
                label="Barcode"
                fullWidth
                margin="normal"
                value={formValues.barcode}
                onChange={handleInputChange}
                error={!!errors.barcode}
                helperText={errors.barcode}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } , gap:2}}>
          <FormControl fullWidth error={Boolean(errors.mainImage)} margin="normal">
            <label htmlFor="" style={{marginBottom:10}}>Main Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleInputChange}
              style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            {errors.mainImage && <FormHelperText>{errors.mainImage}</FormHelperText>}
          </FormControl>
          </Box>
          <Box mt={2}>
  <label htmlFor="image-input">
    <Button variant="outlined" component="span">
      <IoIosAdd /> Add Other Image
    </Button>
  </label>
  <input
    id="image-input"
    type="file"
    accept="image/*"
    style={{ display: "none" }}
    onChange={handleAddImage}
    multiple
  />
</Box>

{Array.isArray(formValues?.OtherImage) && formValues.OtherImage.length > 0 && (
  <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
    {formValues.OtherImage.map((file, index) => (
      <Box key={index} position="relative">
        <img
          src={file instanceof File ? URL.createObjectURL(file) : file || ''}
          alt={`Uploaded ${index}`}
          style={{
            width: "120px",
            height: "120px",
            objectFit: "cover",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        <Button
          variant="contained"
          color="error"
          onClick={() => handleRemoveImage(index)}
          style={{
            marginLeft: "10px",
            width: "30px",
            height: "30px",
            minWidth: 'auto',
            fontSize: '28px',
            padding: '7px',
          }}
        >
          <MdDeleteOutline />
        </Button>
      </Box>
    ))}
  </Box>
)}


          <Box sx={{ display: "flex", justifyContent: "flex-start", marginTop: 2 }}>
            <Button variant="outlined" color="secondary" onClick={handleCloseModal} sx={{ marginRight: 2 }}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" isLoading={loadingSave} onClick={handleAddOrEditProduct}>
              Save
            </Button>
          </Box>
        </StyledBox>
      </StyledModal>
      <Dialog open={openDeleteDialog} onClose={cancelDeleteProduct}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this product?
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDeleteProduct} color="primary">Cancel</Button>
          <Button onClick={confirmDeleteProduct} color="secondary" isLoading={loadingDel}>Delete</Button>
        </DialogActions>
      </Dialog>
      <ProductsModal
        isModalVisible={isModalVisibleP}
        handleCloseModal={handleCloseModalP}
        showProduct={showProduct}
      />
    </>
  );
};

export default ProductSearch;

