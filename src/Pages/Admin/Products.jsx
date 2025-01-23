import { useState, useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { Box, Button, Modal, TextField, Typography,
     Dialog, DialogActions, DialogContent, DialogTitle, styled ,
     Select, MenuItem, InputLabel, FormControl,
     FormHelperText} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { MdDelete, MdDeleteOutline } from "react-icons/md";
import image from '../../assets/Img/products.webp';
import { IoIosAdd } from "react-icons/io";

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

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [colors, setColors] = useState(["#ffffff"]);
  const [formValues, setFormValues] = useState({
    name_ar: "",
    name_en: "",
    desc_ar: "",
    desc_en: "",
    mainPrice: "",
    priceDiscount: "",
    colors: [],
    colorsCount: 0,
    sizes: [],
    stock: "",
    barcode: "",
    mainImage: "",
    otherImage: "",
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

  useEffect(() => {
    const initialData = [
      { id: 1, name_ar: "منتج 1", name_en: "Product 1", desc_ar: "وصف المنتج 1", desc_en: "Product 1 Description", mainPrice: 100, priceDiscount: 10, colors: "Red, Blue", sizes: "M, L", stock: 50, barcode: "12345", mainImage: image, otherImage: image },
      { id: 2, name_ar: "منتج 2", name_en: "Product 2", desc_ar: "وصف المنتج 2", desc_en: "Product 2 Description", mainPrice: 200, priceDiscount: 20, colors: "Green, Yellow", sizes: "S, M", stock: 30, barcode: "67890", mainImage: image, otherImage: image },
      { id: 3, name_ar: "منتج 3", name_en: "Product 3", desc_ar: "وصف المنتج 3", desc_en: "Product 3 Description", mainPrice: 150, priceDiscount: 15, colors: "Black, White", sizes: "L, XL", stock: 20, barcode: "11223", mainImage: image, otherImage: image },
    ];
    setProducts(initialData);
  }, []);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setEditingProduct(null);
    setFormValues({
      name_ar: "",
      name_en: "",
      desc_ar: "",
      desc_en: "",
      colorsCount:"",
      mainPrice: "",
      priceDiscount: "",
      colors: [],
      sizes: [],
      stock: "",
      barcode: "",
      mainImage: "",
    });
    setErrors({});
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
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
    if (!formValues.mainPrice) newErrors.mainPrice = "Main Price is required";
    if (!formValues.priceDiscount) newErrors.priceDiscount = "Price Discount is required";
    if (!formValues.colors) newErrors.colors = "Product Colors are required";
    if (!formValues.colorsCount) newErrors.colorsCount = "Colors Count are required";
    if (!formValues.sizes) newErrors.sizes = "Product Sizes are required";
    if (!formValues.stock) newErrors.stock = "Product Stock is required";
    if (!formValues.barcode) newErrors.barcode = "Product Barcode is required";
    if (!formValues.mainImage) newErrors.mainImage = "Main Image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddOrEditProduct = () => {
    if (!validateForm()) return;

    if (editingProduct) {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === editingProduct.id ? { ...product, ...formValues } : product
        )
      );
    } else {
      setProducts((prevProducts) => [
        ...prevProducts,
        { id: products.length + 1, ...formValues },
      ]);
    }
    handleCloseModal();
  };

  const handleEditProduct = (product) => {
    setFormValues(product);
    setEditingProduct(product);
    setIsModalVisible(true);
  };

  const handleDeleteProduct = (id) => {
    setProductToDelete(id);
    setOpenDeleteDialog(true);
  };

  const confirmDeleteProduct = () => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productToDelete));
    setOpenDeleteDialog(false);
    setProductToDelete(null);
  };

  const cancelDeleteProduct = () => {
    setOpenDeleteDialog(false);
    setProductToDelete(null);
  };

  const handleExportToCSV = () => {
    const header = [
      "id", "name_ar", "name_en", "desc_ar", "desc_en", 
      "mainPrice", "priceDiscount", "colors", "sizes", 
      "stock", "barcode", "mainImage", "otherImage"
    ];
  
    const rows = products.map((product) => [
      product.id,
      product.name_ar,
      product.name_en,
      product.desc_ar,
      product.desc_en,
      product.mainPrice,
      product.priceDiscount,
      (product.colors && Array.isArray(product.colors) ? product.colors.join("; ") : ""),
      (product.sizes && Array.isArray(product.sizes) ? product.sizes.join("; ") : ""),  
      product.stock,
      product.barcode,
      product.mainImage,
      product.otherImage,
    ]);
  
    let csvContent = header.join(",") + "\n";
    rows.forEach((row) => {
      csvContent += row.map((cell) => {
        const formattedCell = cell && cell.toString().includes(",") ? `"${cell}"` : cell;
        return formattedCell;
      }).join(",") + "\n";
    });
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
  
    link.setAttribute("href", url);
    link.setAttribute("download", "products.csv");
    link.click();
  };
  

  const columns = [
    { field: "name_en", headerName: "Product Name (English)", flex: 1, minWidth: 250 },
    { field: "name_ar", headerName: "Product Name (Arabic)", flex: 1, minWidth: 250 },
    { field: "desc_ar", headerName: "Description (Arabic)", flex: 1, minWidth: 250 },
    { field: "desc_en", headerName: "Description (English)", flex: 1, minWidth: 250 },
    { field: "mainPrice", headerName: "Main Price", flex: 1, minWidth: 250 },
    { field: "priceDiscount", headerName: "Price Discount", flex: 1, minWidth: 250 },
    { field: "colors", headerName: "Colors", flex: 1, minWidth: 250 },
    { field: "sizes", headerName: "Sizes", flex: 1, minWidth: 250 },
    { field: "stock", headerName: "Stock", flex: 1, minWidth: 250 },
    { field: "barcode", headerName: "Barcode", flex: 1, minWidth: 250 },
    {
      field: "mainImage",
      headerName: "Main Image",
      renderCell: (params) => (
        <img 
          src={params.value} 
          alt="product" 
          style={{ width: 45, height: 45, objectFit: 'cover', borderRadius: '50px' }} 
        />
      ),
      flex: 1,
      minWidth: 250 
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => (
        <>
          <Button
            onClick={() => handleEditProduct(params.row)}
            style={{ color: "green" }}
            startIcon={<CiEdit />}
          >
          </Button>
          <Button
            onClick={() => handleDeleteProduct(params.row.id)}
            style={{ color: "red" }}
            startIcon={<MdDelete />}
          >
          </Button>
        </>
      ),
      flex: 1,
      minWidth: 200,
    },
  ];

  return (
    <>
      <Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenModal}
        sx={{ marginBottom: 2 }}
      >
        Add Product
      </Button>

      <Button
        variant="outlined"
        color="secondary"
        onClick={handleExportToCSV}
        sx={{ marginBottom: 2, marginLeft: 2 }}
      >
        Export to CSV
      </Button>
      </Box>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={products} columns={columns} pageSize={5} 
          rowsPerPageOptions={[5, 10, 15]}
          checkboxSelection
          disableSelectionOnClick/>
      </div>
      <StyledModal open={isModalVisible} onClose={handleCloseModal} sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}>  
        <StyledBox>
          <Typography variant="h6">{editingProduct ? "Edit Product" : "Add Product"}</Typography>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } , gap:2}}>
          <FormControl fullWidth margin="normal" error={!!errors.name_ar} >
  <InputLabel>Category Name</InputLabel>
  <Select
    name="ctaName_ar"
    value={formValues.name_ar}
    onChange={handleInputChange}
    label="Category Name"
  >
    <MenuItem value="option1">Option 1</MenuItem>
    <MenuItem value="option2">Option 2</MenuItem>
    <MenuItem value="option3">Option 3</MenuItem>
  </Select>
  <FormHelperText>{errors.name_ar}</FormHelperText>
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
                name="mainPrice"
                label="Main Price"
                fullWidth
                margin="normal"
                value={formValues.mainPrice}
                onChange={handleInputChange}
                error={!!errors.mainPrice}
                helperText={errors.mainPrice}
            />
            <TextField
                name="priceDiscount"
                label="Price Discount"
                fullWidth
                margin="normal"
                value={formValues.priceDiscount}
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
        value={formValues.colors.join(', ')}
        onChange={handleInputChange}
        error={!!errors.colors}
        helperText={errors.colors}
        disabled
      />
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "column" } , gap:2}}>
        {colors.map((color, index) => (
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
            <input
              type="file"
              name="mainImage"
              accept="image/*"
              onChange={handleInputChange}
              style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            {errors.mainImage && <FormHelperText>{errors.mainImage}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth error={Boolean(errors.image)} margin="normal">
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleInputChange}
              style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            {errors.image && <FormHelperText>{errors.image}</FormHelperText>}
          </FormControl>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-start", marginTop: 2 }}>
            <Button variant="outlined" color="secondary" onClick={handleCloseModal} sx={{ marginRight: 2 }}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleAddOrEditProduct}>
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
          <Button onClick={confirmDeleteProduct} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductsAdmin;

