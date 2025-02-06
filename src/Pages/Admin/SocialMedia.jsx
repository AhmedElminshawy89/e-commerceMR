import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { Box, Button, Modal, TextField, Typography, DialogActions, FormHelperText, FormControl } from "@mui/material";
import { styled } from "@mui/system";
import { message, Table } from "antd";
import { useSaveSocialMutation, useShowAllAdminSocialQuery, useUpdateSocialMutation } from "../../app/Api/SiteDetails";

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

const SocialMedia = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formValues, setFormValues] = useState({
    face: "",
    insta: "",
    tiktok: "",
    twitter: "",
    linkedIn: "",
  });

  const [errors, setErrors] = useState({
    face: "",
    insta: "",
    tiktok: "",
    twitter: "",
    linkedIn: "",
  });

  const [currentPage] = useState(1);
  const [saveServices, { isLoading: loadingSave }] = useSaveSocialMutation();
  const [updateServices, { isLoading: loading }] = useUpdateSocialMutation();
  const { data: about, error, isLoading, refetch } = useShowAllAdminSocialQuery(currentPage);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setEditingCategory(null);
    setFormValues({
      face: "",
      insta: "",
      tiktok: "",
      twitter: "",
      linkedIn: "",
    });
    setErrors({
      face: "",
      insta: "",
      tiktok: "",
      twitter: "",
      linkedIn: "",
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
    if (!formValues.face) newErrors.face = "Face is required";
    if (!formValues.insta) newErrors.insta = "Instagram is required";
    if (!formValues.tiktok) newErrors.tiktok = "TikTok is required";
    if (!formValues.twitter) newErrors.twitter = "Twitter is required";
    if (!formValues.linkedIn) newErrors.linkedIn = "LinkedIn is required";
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleAddOrEditCategory = () => {
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("face", formValues.face);
    formData.append("insta", formValues.insta);
    formData.append("tiktok", formValues.tiktok);
    formData.append("twitter", formValues.twitter);
    formData.append("linkedIn", formValues.linkedIn);

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

  const handleEditCategory = (category) => {
    setFormValues({
      face: category.face,
      insta: category.insta,
      tiktok: category.tiktok,
      twitter: category.twitter,
      linkedIn: category.linkedIn,
    });
    setEditingCategory(category);
    setIsModalVisible(true);
  };

    const res = document.cookie.split('; ').find(row => row.startsWith('res='))?.split('=')[1];
  const IsAvailable = res==='Moderator'

  const columns = [
    {
      title: "Face",
      dataIndex: "face",
      key: "face",
    },
    {
      title: "Instagram",
      dataIndex: "insta",
      key: "insta",
    },
    {
      title: "TikTok",
      dataIndex: "tiktok",
      key: "tiktok",
    },
    {
      title: "Twitter",
      dataIndex: "twitter",
      key: "twitter",
    },
    {
      title: "LinkedIn",
      dataIndex: "linkedIn",
      key: "linkedIn",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => IsAvailable?null: (
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
{!IsAvailable && (about?.socialMedia?.length ?? 0) === 0 && (
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
          dataSource={about?.socialMedia}
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
            {["face", "insta"].map((field) => (
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
            {["tiktok", "twitter"].map((field) => (
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
            {["linkedIn"].map((field) => (
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

export default SocialMedia;
