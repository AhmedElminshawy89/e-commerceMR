import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { Box, Button, Modal, TextField, Typography, DialogActions, FormHelperText, FormControl } from "@mui/material";
import { styled } from "@mui/system";
import { message, Table } from "antd";
import { useSaveOverAllInfoMutation, useShowAllAdminOverAllInfoQuery, useUpdateOverAllInfoMutation } from "../../app/Api/SiteDetails";
import { FaMapMarkedAlt } from "react-icons/fa";

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

const OverAllInfo = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formValues, setFormValues] = useState({
    email: '',
    phone: '',
    whatsUp: '',
    address: '',
    desc_ar: '',
    desc_en: '',
    linkMap: '',
  });

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    whatsUp: "",
    address: "",
    desc: "",
    linkMap: "",
  });

  const [currentPage] = useState(1);
  const [saveServices, { isLoading: loadingSave }] = useSaveOverAllInfoMutation();
  const [updateServices, { isLoading: loading }] = useUpdateOverAllInfoMutation();
  const { data: about, error, isLoading, refetch } = useShowAllAdminOverAllInfoQuery(currentPage);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setEditingCategory(null);
    setFormValues({
      email: '',
      phone: '',
      whatsUp: '',
      address: '',
      desc_ar: '',
      desc_en: '',
      linkMap: '',
    });
    setErrors({
      email: "",
      phone: "",
      whatsUp: "",
      address: "",
      desc: "",
      linkMap: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.email) newErrors.email = "Email is required";
    if (!formValues.phone) newErrors.phone = "Phone is required";
    if (!formValues.whatsUp) newErrors.whatsUp = "WhatsApp number is required";
    if (!formValues.address) newErrors.address = "Address is required";
    if (!formValues.desc_ar) newErrors.desc = "Description Arabic is required";
    if (!formValues.desc_en) newErrors.desc = "Description English is required";
    if (!formValues.linkMap) newErrors.linkMap = "Map link is required";
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleAddOrEditCategory = () => {
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("email", formValues.email);
    formData.append("phone", formValues.phone);
    formData.append("whatsUp", formValues.whatsUp);
    formData.append("address", formValues.address);
    formData.append("desc_ar", formValues.desc_ar);
    formData.append("desc_en", formValues.desc_en);
    formData.append("linkMap", formValues.linkMap);

    if (editingCategory) {
      updateServices({ id: editingCategory.id, updateCategory: formData }).then(() => {
        refetch();
        message.success("Information updated successfully!");
        handleCloseModal();
      });
    } else {
      saveServices(formData).then(() => {
        refetch();
        message.success("Information added successfully!");
        handleCloseModal();
      });
    }
  };

    const res = document.cookie.split('; ').find(row => row.startsWith('res='))?.split('=')[1];
  const IsAvailable = res==='Moderator'

  const handleEditCategory = (category) => {
    setFormValues({
      email: category.email,
      phone: category.phone,
      whatsUp: category.whatsUp,
      address: category.address,
      desc_ar: category.desc_ar,
      desc_en: category.desc_en,
      linkMap: category.linkMap,
    });
    setEditingCategory(category);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "WhatsApp",
      dataIndex: "whatsUp",
      key: "whatsUp",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Description (Arabic)",
      dataIndex: "desc_ar",
      key: "desc_ar",
    },
    {
      title: "Description (English)",
      dataIndex: "desc_en",
      key: "desc_en",
    },
    {
      title: "Map Link",
      dataIndex: "linkMap",
      key: "linkMap",
      render: (link) => <a href={link} target="_blank" rel="noopener noreferrer"><FaMapMarkedAlt style={{fontSize:'24px'}}/></a>,
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
          <CiEdit />
        </Button>
      ),
    },
  ];

  const rowClassName = (record, index) => {
    return index % 2 !== 0 ? "even-row" : "";
  };

  return (
    <Box sx={{ height: 500, width: "100%" }}>
{!IsAvailable && ((about?.info?.length ?? 0) === 0) && (
  <Button
    variant="contained"
    color="primary"
    onClick={handleOpenModal}
    sx={{ marginBottom: 2 }}
  >
    Add Contact Information
  </Button>
)}

      <Box sx={{ height: "auto", width: "100%" }} className="cta">
        <Table
          dataSource={about?.info}
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
            {editingCategory ? "Edit Contact Information" : "Add Contact Information"}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
            {["email", "phone"].map((field) => (
              <FormControl key={field} fullWidth error={Boolean(errors[field])} margin="normal">
                <label htmlFor={field} style={{ fontSize: "18px", fontWeight: "800" }}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <TextField
                  type="text"
                  name={field}
                  value={formValues[field]}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <FormHelperText style={{ color: "red", fontSize: "15px" }}>
                  {errors[field]}
                </FormHelperText>
              </FormControl>
            ))}
          </Box>

          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
            {[ "whatsUp", "address"].map((field) => (
              <FormControl key={field} fullWidth error={Boolean(errors[field])} margin="normal">
                <label htmlFor={field} style={{ fontSize: "18px", fontWeight: "800" }}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <TextField
                  type="text"
                  name={field}
                  value={formValues[field]}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <FormHelperText style={{ color: "red", fontSize: "15px" }}>
                  {errors[field]}
                </FormHelperText>
              </FormControl>
            ))}
          </Box>

          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
            {[ "desc_ar", "desc_en"].map((field) => (
              <FormControl key={field} fullWidth error={Boolean(errors[field])} margin="normal">
                <label htmlFor={field} style={{ fontSize: "18px", fontWeight: "800" }}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <TextField
                  type="text"
                  name={field}
                  value={formValues[field]}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <FormHelperText style={{ color: "red", fontSize: "15px" }}>
                  {errors[field]}
                </FormHelperText>
              </FormControl>
            ))}
          </Box>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
            {[ "linkMap"].map((field) => (
              <FormControl key={field} fullWidth error={Boolean(errors[field])} margin="normal">
                <label htmlFor={field} style={{ fontSize: "18px", fontWeight: "800" }}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <TextField
                  type="text"
                  name={field}
                  value={formValues[field]}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
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

export default OverAllInfo;
