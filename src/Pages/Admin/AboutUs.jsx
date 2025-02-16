import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { Box, Button, Modal, TextField, Typography, Dialog, DialogActions, DialogContent, DialogTitle, FormHelperText, FormControl } from "@mui/material";
import { styled } from "@mui/system";
import { MdDelete } from "react-icons/md";

import { message, Spin, Table } from "antd";
import { useDelAboutMutation, useSaveAboutMutation, useShowAllAdminAboutQuery, useUpdateAboutMutation } from "../../app/Api/AboutUs";

const StyledModal = styled(Modal)({
  display: "block",
  alignItems: "center",
  justifyContent: "center",
});
const StyledBox = styled(Box)({
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  maxWidth: "800px",
  position: "relative",
  left: "50%",
  right: "50%",
  transform: "translate(-50%, 10px)",
});

const AboutUs = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formValues, setFormValues] = useState({
    tittle_ar: "",
    tittle_en: "",
    desc_ar: "",
    desc_en: "",
    image: "",
  });
  const res = document.cookie.split('; ').find(row => row.startsWith('res='))?.split('=')[1];
  const IsAvailable = res==='Moderator'
  const [errors, setErrors] = useState({
    tittle_ar: "",
    tittle_en: "",
    desc_ar: "",
    desc_en: "",
    image: "",
  });

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [saveServices , {isLoading:loadingSave}] = useSaveAboutMutation();
  const [updateServices, {isLoading:loading}] = useUpdateAboutMutation();
  const [delServices, {isLoading:loadingDel}] = useDelAboutMutation();
  const { data: about, error, isLoading ,refetch} = useShowAllAdminAboutQuery(currentPage); 

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setEditingCategory(null);
    setFormValues({ tittle_ar: "", tittle_en: "", desc_ar: "", desc_en: "", image: ""});
    setErrors({ tittle_ar: "", tittle_en: "", desc_ar: "", desc_en: "", image: ""});
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
    if (!formValues.tittle_ar) newErrors.tittle_ar = "Title (Arabic) is required";
    if (!formValues.tittle_en) newErrors.tittle_en = "Title (English) is required";
    if (!formValues.desc_ar) newErrors.desc_ar = "Description (Arabic) is required";
    if (!formValues.desc_en) newErrors.desc_en = "Description (English) is required";
    if (!formValues.image && !editingCategory?.image) {
      newErrors.image = "A valid image file is required (jpg, jpeg, png).";
    }
  
    setErrors(newErrors);
  
    return Object.keys(newErrors).length === 0;
  };

  const handleAddOrEditCategory = () => {
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("tittle_ar", formValues.tittle_ar);
    formData.append("tittle_en", formValues.tittle_en);
    formData.append("desc_ar", formValues.desc_ar);
    formData.append("desc_en", formValues.desc_en);
  
    if (formValues.image) {
      formData.append("image", formValues.image);
    }
    if (editingCategory) {
      updateServices({ id: editingCategory.id, updateCategory: formData }).then(() => {
        refetch(); 
        message.success("Services updated successfully!");
        handleCloseModal();
      });
    } else {
      saveServices(formData).then(() => {
        refetch(); 
        message.success("Services added successfully!");
        handleCloseModal();
      });
    }
  };
  
  const confirmDeleteCategory = () => {
    delServices(categoryToDelete).then(() => {
      refetch();
      setOpenDeleteDialog(false);
      setCategoryToDelete(null);
    });
  };
  

  const handleEditCategory = (category) => {
    setFormValues(category);
    setEditingCategory(category);
    setIsModalVisible(true);
  };

  const handleDeleteCategory = (id) => {
    setCategoryToDelete(id);
    setOpenDeleteDialog(true);
  };


  const cancelDeleteCategory = () => {
    setOpenDeleteDialog(false);
    setCategoryToDelete(null);
  };
  const columns = [
    { title: "title (Arabic)", dataIndex: "tittle_ar", key: "tittle_ar", render: (text) => text },
    { title: "title (English)", dataIndex: "tittle_en", key: "tittle_en", render: (text) => text },
    { title: "Description (Arabic)", dataIndex: "desc_ar", key: "desc_ar", render: (text) => text },
    { title: "Description (English)", dataIndex: "desc_en", key: "desc_en", render: (text) => text },
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
        IsAvailable?null: (
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
  return (
    <Box sx={{ height: 500, width: "100%" }}>
      {!IsAvailable&&(
        <Button variant="contained" color="primary" onClick={handleOpenModal} sx={{ marginBottom: 2 }}      >
          Add About Us
        </Button>
      )}

      <Box sx={{ height: "auto", width: "100%" }} className="cta">
        <Table
          dataSource={about?.about?.data}
          columns={columns}
          rowKey="id"
          loading={isLoading}
          error={error}
          rowClassName={rowClassName}
          pagination={{
            total: about?.about?.total || 0,
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
          <Typography variant="h6" gutterBottom>
            {editingCategory ? "Edit About Us" : "Add About Us"}
          </Typography>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } , gap:2}}>
            <TextField
                label="Title (Arabic)"
                name="tittle_ar"
                value={formValues.tittle_ar}ش
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                error={!!errors.tittle_ar}
                helperText={errors.tittle_ar}
            />
            <TextField
                label="Title (English)"
                name="tittle_en"
                value={formValues.tittle_en}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                error={!!errors.tittle_en}
                helperText={errors.tittle_en}
            />
        </Box>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } , gap:2}}>
            <TextField
                label="Description (Arabic)"
                name="desc_ar"
                value={formValues.desc_ar}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                error={!!errors.desc_ar}
                helperText={errors.desc_ar}
            />
            <TextField
                label="Description (English)"
                name="desc_en"
                value={formValues.desc_en}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                error={!!errors.desc_en}
                helperText={errors.desc_en}
            />
            </Box>
            <FormControl fullWidth error={Boolean(errors.image)} margin="normal">
            <TextField
              type="file"
              name="image"
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            {editingCategory && formValues.image && (
  <Box sx={{ marginBottom: 2 }}>
    <Typography variant="body1">Current Image:</Typography>
    <img
      src={formValues.image} 
      alt="current category"
      style={{ width: 200, height: 100, objectFit: "cover", borderRadius: "5px" }}
    />
  </Box>
)}

            <FormHelperText>{errors.image}</FormHelperText>
          </FormControl>


          <DialogActions>
          <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
            <Button variant="outlined" color="secondary" onClick={handleCloseModal} sx={{ marginRight: 2 }}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" loading={loadingSave} onClick={handleAddOrEditCategory}>
              Save {loadingSave&&<Spin/>} {loading&&<Spin/>}
            </Button>
          </Box>
          </DialogActions>
        </StyledBox>
      </StyledModal>

      <Dialog open={openDeleteDialog} onClose={cancelDeleteCategory}>
        <DialogTitle>Delete AboutUs</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this AboutUs?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDeleteCategory}  variant="outlined" color="error" sx={{ marginBottom: 2, marginLeft: 2 }}>Cancel</Button>
          <Button onClick={confirmDeleteCategory} loading={loadingDel}  variant="outlined" color="secondary" sx={{ marginBottom: 2, marginLeft: 2 }}>
            Delete {loadingDel&&<Spin/>}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AboutUs;
