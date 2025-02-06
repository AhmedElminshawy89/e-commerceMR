import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { Box, Button, Modal, TextField, Typography, Dialog, DialogActions, DialogContent, DialogTitle, FormHelperText, FormControl } from "@mui/material";
import { styled } from "@mui/system";
import { MdDelete } from "react-icons/md";

import { message, Table } from "antd";
import { useDelBannerMutation, useSaveBannerMutation, useShowAllAdminBannerQuery, useUpdateBannerMutation, useUpdateStatusBannerMutation } from "../../app/Api/Banner";

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

const Banner = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formValues, setFormValues] = useState({
    tittle_ar: "",
    tittle_en: "",
    desc_ar: "",
    desc_en: "",
    image: "",
    status: 'off',
  });

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
  const [saveServices , {isLoading:loadingSave}] = useSaveBannerMutation();
  const [updateServices, {isLoading:loading}] = useUpdateBannerMutation();
  const [updateStatusServices, {isLoading:loadingStatus}] = useUpdateStatusBannerMutation();
  const [delServices, {isLoading:loadingDel}] = useDelBannerMutation();
  const { data: banner, error, isLoading ,refetch} = useShowAllAdminBannerQuery(currentPage); 
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
    formData.append("name_btn_ar", formValues.name_btn_ar); 
    formData.append("name_btn_en", formValues.name_btn_en); 
    formData.append("link_btn", formValues.link_btn);
    formData.append("status", formValues.status);
  
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

  const toggleStatus = (id) => {
  
    updateStatusServices(id).then(() => {
      message.success(`Banner status updated successfully`);
      refetch(); 
    }).catch((error) => {
      message.error("Error updating banner status",error);
    });
  };
    const res = document.cookie.split('; ').find(row => row.startsWith('res='))?.split('=')[1];
  const IsAvailable = res==='Moderator'

  const columns = [
    { title: "title (Arabic)", dataIndex: "tittle_ar", key: "tittle_ar", render: (text) => text ,minWidth:150},
    { title: "title (English)", dataIndex: "tittle_en", key: "tittle_en", render: (text) => text ,minWidth:150},
    { title: "Description (Arabic)", dataIndex: "desc_ar", key: "desc_ar", render: (text) => text ,minWidth:250},
    { title: "Description (English)", dataIndex: "desc_en", key: "desc_en", render: (text) => text ,minWidth:250},
    { title: "Button (Arabic)", dataIndex: "name_btn_ar", key: "name_btn_ar", render: (text) => text ,minWidth:150},
    { title: "Button (English)", dataIndex: "name_btn_en", key: "name_btn_en", render: (text) => text ,minWidth:150},
    { title: "Link", dataIndex: "link_btn", key: "link_btn", render: (text) => text },
    {
      dataIndex: "status",
      key: "status",
      title: "Status",
      render: (_, record) =>
        IsAvailable?null: (
        <Button
          variant="outlined"
          color={record.status==='on' ? "success" : "error"}
          onClick={() => toggleStatus(record?.id)}
          loading={loadingStatus}
        >
           {record.status === "on" ? "Active" : "Inactive"}
        </Button>
      ),
      minWidth: 150,
    },
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
      minWidth: 170,
    },
  ];

  const rowClassName = (record, index) => {
    return index % 2 !== 0 ? "even-row" : "";
  };
  return (
    <Box sx={{ height: 500, width: "100%" }}>
      {!IsAvailable && (
        <Button variant="contained" color="primary" onClick={handleOpenModal} sx={{ marginBottom: 2 }}      >
          Add Banner
        </Button>
      )}

      <Box sx={{ height: "auto", width: "100%" }} className="cta">
        <Table
          dataSource={banner?.banner?.data}
          columns={columns}
          rowKey="id"
          loading={isLoading}
          error={error}
          rowClassName={rowClassName}
          pagination={{
            total: banner?.banner?.total || 0,
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
            {editingCategory ? "Edit Banner" : "Add Banner"}
          </Typography>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } , gap:2}}>
            <TextField
                label="Title (Arabic)"
                name="tittle_ar"
                value={formValues.tittle_ar}
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
            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
            <TextField
              label="Button Name (Arabic)"
              name="name_btn_ar"
              value={formValues.name_btn_ar}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={!!errors.name_btn_ar}
              helperText={errors.name_btn_ar}
            />
            <TextField
              label="Button Name (English)"
              name="name_btn_en"
              value={formValues.name_btn_en}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={!!errors.name_btn_en}
              helperText={errors.name_btn_en}
            />
          </Box>

          <TextField
            label="Link"
            name="link_btn"
            value={formValues.link_btn}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.link_btn}
            helperText={errors.link_btn}
          />
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
              Save
            </Button>
          </Box>
          </DialogActions>
        </StyledBox>
      </StyledModal>

      <Dialog open={openDeleteDialog} onClose={cancelDeleteCategory}>
        <DialogTitle>Delete Banner</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this Banner?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDeleteCategory}>Cancel</Button>
          <Button onClick={confirmDeleteCategory} loading={loadingDel} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Banner;
