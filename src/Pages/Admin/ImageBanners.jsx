import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { Box, Button, Modal, TextField, Typography, DialogActions, FormHelperText, FormControl } from "@mui/material";
import { styled } from "@mui/system";
import { message, Table } from "antd";
import { useSaveImageBannersMutation, useShowAllAdminImageBannersQuery, useUpdateImageBannersMutation } from "../../app/Api/SiteDetails";

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

const ImageBanners = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formValues, setFormValues] = useState({
    product: null,
    about: null,
    contact: null,
    profile: null,
  });

  const [errors, setErrors] = useState({
    product: "",
    about: "",
    contact: "",
    profile: "",
  });
  const [currentPage] = useState(1);
  const [saveServices, { isLoading: loadingSave }] = useSaveImageBannersMutation();
  const [updateServices, { isLoading: loading }] = useUpdateImageBannersMutation();
  const { data: about, error, isLoading, refetch } = useShowAllAdminImageBannersQuery(currentPage);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setEditingCategory(null);
    setFormValues({ product: null, about: null, contact: null, profile: null });
    setErrors({ product: "", about: "", contact: "", profile: "" });
  };

    const res = document.cookie.split('; ').find(row => row.startsWith('res='))?.split('=')[1];
  const IsAvailable = res==='Moderator'
  const handleInputChange = (e) => {
    const { name, files } = e.target;
    
    if (files.length > 0) {
      const file = files[0];
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];

      if (!allowedTypes.includes(file.type)) {
        message.warning('The image must be a file of type: jpg, jpeg, png, gif.');
        return;
      }

      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: file,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.product) newErrors.product = "Image Product is required";
    if (!formValues.about) newErrors.about = "Image About is required";
    if (!formValues.contact) newErrors.contact = "Image Contact is required";
    if (!formValues.profile) newErrors.profile = "Image Profile is required";
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleAddOrEditCategory = () => {
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("product", formValues.product);
    formData.append("about", formValues.about);
    formData.append("contact", formValues.contact);
    formData.append("profile", formValues.profile);

    if (editingCategory) {
      updateServices({ id: editingCategory.id, updateCategory: formData }).then(() => {
        refetch();
        message.success("Image Banners updated successfully!");
        handleCloseModal();
      });
    } else {
      saveServices(formData).then(() => {
        refetch();
        message.success("Image Banners added successfully!");
        handleCloseModal();
      });
    }
  };

  const handleEditCategory = (category) => {
    setFormValues({
      product: category.product,
      about: category.about,
      contact: category.contact,
      profile: category.profile,
    });
    setEditingCategory(category);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: "Image Product",
      dataIndex: "product",
      key: "product",
      render: (image) => (
        <img
          src={image}
          alt="category"
          style={{ width: 45, height: 45, objectFit: "cover", borderRadius: "50px" }}
        />
      ),
    },
    {
        title: "Image About",
        dataIndex: "about",
        key: "about",
        render: (image) => (
          <img
            src={image}
            alt="category"
            style={{ width: 45, height: 45, objectFit: "cover", borderRadius: "50px" }}
          />
        ),
      },
      {
        title: "Image Contact",
        dataIndex: "contact",
        key: "contact",
        render: (image) => (
          <img
            src={image}
            alt="category"
            style={{ width: 45, height: 45, objectFit: "cover", borderRadius: "50px" }}
          />
        ),
      },
      {
        title: "Image Profile",
        dataIndex: "profile",
        key: "profile",
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
        <Button
          onClick={() => handleEditCategory(record)}
          style={{ color: "green", marginRight: 10 }}
          icon={<CiEdit />}
          loading={loading}
        >
          <CiEdit/>
        </Button>
      ),
    },
  ];

  const rowClassName = (record, index) => {
    return index % 2 !== 0 ? "even-row" : "";
  };

  return (
    <Box sx={{ height: 500, width: "100%" }}>
{!IsAvailable && about?.imageBanner?.length === 0 && (
  <Button
    variant="contained"
    color="primary"
    onClick={handleOpenModal}
    sx={{ marginBottom: 2 }}
  >
    Add Image Banners
  </Button>
)}




      <Box sx={{ height: "auto", width: "100%" }} className="cta">
        <Table
          dataSource={about?.imageBanner}
          columns={columns}
          rowKey="id"
          loading={isLoading}
          error={error}
          rowClassName={rowClassName}
          pagination={false}
        />
      </Box>

      <StyledModal open={isModalVisible} onClose={handleCloseModal}>
        <StyledBox>
          <Typography variant="h6" gutterBottom>
            {editingCategory ? "Edit Image Banners" : "Add Image Banners"}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
            {["product", "about"].map((field) => (
              <FormControl key={field} fullWidth error={Boolean(errors[field])} margin="normal">
                <label htmlFor={field} style={{ fontSize: "18px", fontWeight: "800" }}>
                  Image {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <TextField
                  type="file"
                  name={field}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                {formValues[field] && editingCategory && (
                  <Box sx={{ marginBottom: 2 }}>
                    <Typography variant="body1">Current Image:</Typography>
                    <img
                      src={formValues[field]}
                      alt={`current ${field}`}
                      style={{ width: 200, height: 100, objectFit: "cover", borderRadius: "5px" }}
                    />
                  </Box>
                )}
                <FormHelperText style={{ color: "red", fontSize: "15px" }}>
                  {errors[field]}
                </FormHelperText>
              </FormControl>
            ))}
          </Box>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
            {["contact", "profile"].map((field) => (
              <FormControl key={field} fullWidth error={Boolean(errors[field])} margin="normal">
                <label htmlFor={field} style={{ fontSize: "18px", fontWeight: "800" }}>
                  Image {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <TextField
                  type="file"
                  name={field}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                {formValues[field] && editingCategory && (
                  <Box sx={{ marginBottom: 2 }}>
                    <Typography variant="body1">Current Image:</Typography>
                    <img
                      src={formValues[field]}
                      alt={`current ${field}`}
                      style={{ width: 200, height: 100, objectFit: "cover", borderRadius: "5px" }}
                    />
                  </Box>
                )}
                <FormHelperText style={{ color: "red", fontSize: "15px" }}>
                  {errors[field]}
                </FormHelperText>
              </FormControl>
            ))}
          </Box>

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
    </Box>
  );
};

export default ImageBanners;
