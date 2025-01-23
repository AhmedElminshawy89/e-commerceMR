import { useState, useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { Box, Button, Modal, TextField, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/system";
import { MdDelete } from "react-icons/md";

const StyledModal = styled(Modal)({
  display: "block",
  alignItems: "center",
  justifyContent: "center",
});

const StyledBox = styled(Box)({
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  width: "800px",
});

const CashBack = () => {
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formValues, setFormValues] = useState({
    CashBack: "",
  });

  const [errors, setErrors] = useState({
    CashBack: "",
  });

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  useEffect(() => {
    const initialData = [
      { id: 1,CashBack:50},
    ];
    setCategories(initialData);
  }, []);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setEditingCategory(null);
    setFormValues({ CashBack: ""});
    setErrors({ CashBack: ""});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.CashBack) newErrors.CashBack = "CashBack required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleAddOrEditCategory = () => {
    if (!validateForm()) return;

    if (editingCategory) {
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === editingCategory.id ? { ...category, ...formValues } : category
        )
      );
    } else {
      setCategories((prevCategories) => [
        ...prevCategories,
        { id: categories.length + 1, ...formValues, status: false },  // New category will have a default status of false
      ]);
    }
    handleCloseModal();
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

  const confirmDeleteCategory = () => {
    setCategories((prevCategories) => prevCategories.filter((category) => category.id !== categoryToDelete));
    setOpenDeleteDialog(false);
    setCategoryToDelete(null);
  };

  const cancelDeleteCategory = () => {
    setOpenDeleteDialog(false);
    setCategoryToDelete(null);
  };

  const columns = [
    { field: "CashBack", headerName: "CashBack", flex: 1, minWidth: 250 },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => (
        <>
          <Button
            onClick={() => handleEditCategory(params.row)}
            style={{ color: "green" }}
            startIcon={<CiEdit />}
          />
          <Button
            onClick={() => handleDeleteCategory(params.row.id)}
            style={{ color: "red" }}
            startIcon={<MdDelete />}
          />
        </>
      ),
      sortable: false,
      filterable: false,
      minWidth: 150,
    },
  ];

  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <Button variant="contained" color="primary" onClick={handleOpenModal} sx={{ marginBottom: 2 }}      >
        Add CashBack
      </Button>

      <DataGrid rows={categories} columns={columns} pageSize={5} 
          rowsPerPageOptions={[5, 10, 15]}
          checkboxSelection
          disableSelectionOnClick />

      <StyledModal open={isModalVisible} onClose={handleCloseModal}>
        <StyledBox>
          <Typography variant="h6" gutterBottom>
            {editingCategory ? "Edit CashBack" : "Add CashBack"}
          </Typography>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } , gap:2}}>
            <TextField
                label="CashBack"
                name="CashBack"
                value={formValues.CashBack}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                error={!!errors.CashBack}
                helperText={errors.CashBack}
            />
        </Box>
          <DialogActions>
          <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
            <Button variant="outlined" color="secondary" onClick={handleCloseModal} sx={{ marginRight: 2 }}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleAddOrEditCategory}>
              Save
            </Button>
          </Box>
          </DialogActions>
        </StyledBox>
      </StyledModal>

      <Dialog open={openDeleteDialog} onClose={cancelDeleteCategory}>
        <DialogTitle>Delete Category</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this category?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDeleteCategory}>Cancel</Button>
          <Button onClick={confirmDeleteCategory} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CashBack;
