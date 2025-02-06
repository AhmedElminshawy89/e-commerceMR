import { useState, useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { Box, Button, Modal, TextField, Typography, FormControl, FormHelperText, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import {  styled } from "@mui/system";
import { MdDelete } from "react-icons/md";
import {
  useSaveCategoryMutation,
  useUpdateCategoryMutation,
  useDelCategoryMutation,
  useShowAllAdminCategorySearchQuery, 
} from "../../app/Api/Categories";
import { message, Table } from "antd";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const StyledBox = styled(Box)({
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  width: "400px",
});

const CategorySearch = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [searchTerm2, setSearchTerm2] = useState(""); 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formValues, setFormValues] = useState({
    name_ar: "",
    name_en: "",
    image: "",
  });

  const [errors, setErrors] = useState({});
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(100);
  const [loading, setLoading] = useState(false);

  const { data, refetch, isLoading } = useShowAllAdminCategorySearchQuery(searchTerm); 

  const [saveCategory] = useSaveCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [delCategory] = useDelCategoryMutation();

  useEffect(() => {
    if (data) {
      setCategories(data?.category || []);
    }
  }, [data]);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setEditingCategory(null);
    setFormValues({ name_ar: "", name_en: "", image: "" });
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

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.name_ar) newErrors.name_ar = "Category Name (Arabic) is required";
    if (!formValues.name_en) newErrors.name_en = "Category Name (English) is required";
    if (!formValues.image && !editingCategory?.image) {
      newErrors.image = "A valid image file is required (jpg, jpeg, png).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddOrEditCategory = async () => {
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("name_ar", formValues.name_ar);
    formData.append("name_en", formValues.name_en);
    formData.append("image", formValues.image);

    setLoading(true);

    try {
      if (editingCategory) {
        await updateCategory({ id: editingCategory.id, updateCategory: formData });
        message.success("Category updated successfully!");
      } else {
        await saveCategory(formData);
        message.success("Category added successfully!");
      }
      refetch();
      handleCloseModal();
    } catch (error) {
      message.error("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditCategory = (category) => {
    setFormValues({
      name_ar: category.name_ar,
      name_en: category.name_en,
      image: category.image,
    });
    setEditingCategory(category);
    setIsModalVisible(true);
  };

  const handleDeleteCategory = (id) => {
    setCategoryToDelete(id);
    setOpenDeleteDialog(true);
  };

  const confirmDeleteCategory = async () => {
    setLoading(true);

    try {
      await delCategory(categoryToDelete);
      refetch();
      setOpenDeleteDialog(false);
      setCategoryToDelete(null);
      message.success("Category deleted successfully!");
    } catch (e) {
      message.error("Something went wrong while deleting the category.", e);
    } finally {
      setLoading(false);
    }
  };

  const cancelDeleteCategory = () => {
    setOpenDeleteDialog(false);
    setCategoryToDelete(null);
  };

  const handleExportToCSV = () => {
    const header = ["ID", "اسم الفئة", "اسم الفئة (بالإنجليزية)"];
    const rows = categories.map((category) => [
      category.id,
      category.name_ar,
      category.name_en,
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
    { title: "Category Name (Arabic)", dataIndex: "name_ar", key: "name_ar", render: (text) => text },
    { title: "Category Name (English)", dataIndex: "name_en", key: "name_en", render: (text) => text },
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
      render: (_, record) => 
        IsAvailable?null:(
        <>
          <Button
            onClick={() => handleEditCategory(record)}
            style={{ color: "green", marginRight: 10 }}
            icon={<CiEdit />}
            loading={loading}
          ><CiEdit/></Button>
          <Button
            onClick={() => handleDeleteCategory(record.id)}
            style={{ color: "red" }}
            icon={<MdDelete />}
            loading={loading} 
          ><MdDelete/></Button>
        </>
      ),
    },
  ];

  const rowClassName = (record, index) => {
    return index % 2 !== 0 ? "even-row" : "";
  };

  const handleSearchChange = (e) => {
    setSearchTerm2(e.target.value); 
  };

  const handleSearch = () => {
    refetch(); 
    setSearchTerm(searchTerm2)
  };

  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" },alignItems:'center' , gap:2}}>
        <TextField
          label="Search Category"
          variant="outlined"
          value={searchTerm2}
          onChange={handleSearchChange}
          fullWidth
          margin="normal"
          sx={{maxWidth:'850px'}}
        />
        <Button variant="contained" color="primary" onClick={handleSearch} style={{height:'45px'}}>
          Search
        </Button>
      </Box>
    
    <div style={{marginTop:20}}>
      {!IsAvailable && (
        <>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenModal}
              sx={{ marginBottom: 2}}
              loading={loading} 
            >
              Add Category
            </Button>
      
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleExportToCSV}
          sx={{ marginBottom: 2, marginLeft: 2 }}
          loading={loading} 
        >
          Export to CSV
        </Button>
        </>
      )}

    </div>

      <Box sx={{ height: "auto", width: "100%" }} className="cta">
        <Table
          dataSource={categories}
          columns={columns}
          rowKey="id"
          loading={isLoading}
          rowClassName={rowClassName}
          pagination={{
            total: data?.categories?.total || 0,
            current: currentPage,
            pageSize: pageSize,
            onChange: (page) => {
              setCurrentPage(page);
              refetch();
            },
          }}
        />
      </Box>

      <StyledModal open={isModalVisible} onClose={handleCloseModal}>
        <StyledBox>
          <Typography variant="h6">{editingCategory ? "Edit Category" : "Add Category"}</Typography>
          <FormControl fullWidth error={Boolean(errors.name_ar)} margin="normal">
            <TextField
              label="Category Name (Arabic)"
              name="name_ar"
              value={formValues.name_ar}
              onChange={handleInputChange}
            />
            <FormHelperText>{errors.name_ar}</FormHelperText>
          </FormControl>

          <FormControl fullWidth error={Boolean(errors.name_en)} margin="normal">
            <TextField
              label="Category Name (English)"
              name="name_en"
              value={formValues.name_en}
              onChange={handleInputChange}
            />
            <FormHelperText>{errors.name_en}</FormHelperText>
          </FormControl>

          <FormControl fullWidth error={Boolean(errors.image)} margin="normal">
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleInputChange}
              style={{ marginBottom: 10 }}
            />
            <FormHelperText>{errors.image}</FormHelperText>
          </FormControl>

          <DialogActions>
            <Button onClick={handleCloseModal} variant="outlined"
          color="secondary"
          >
              Cancel
            </Button>
            <Button
              onClick={handleAddOrEditCategory}
              variant="contained"
              disabled={loading}
            >
              {editingCategory ? "Save Changes" : "Add Category"}
            </Button>
          </DialogActions>
        </StyledBox>
      </StyledModal>

      <Dialog open={openDeleteDialog} onClose={cancelDeleteCategory}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this category?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDeleteCategory} color="secondary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteCategory} color="primary" loading={loading}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategorySearch;
