import { useState, useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { Box, Button, Modal, TextField, Typography, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from "@mui/material";
import { styled } from "@mui/system";
import { MdDelete } from "react-icons/md";
import { useSaveDiscountMutation, useUpdateDiscountMutation,
   useDelDiscountMutation, useShowDiscountQuery } from '../../app/Api/Discount';
import { Table } from "antd";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const StyledBox = styled(Box)({
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  maxWidth: "600px",
  position: "relative",
  left: "50%",
  right: "50%",
  transform: "translate(-50%, 10px)",
});

const CashBack = () => {
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formValues, setFormValues] = useState({
    cashback: "",
    type: "percent",
  });

  const [errors, setErrors] = useState({
    CashBack: "",
    type: "",
  });

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const { data: cashbackData, refetch ,isLoading} = useShowDiscountQuery();
  const [saveDiscount] = useSaveDiscountMutation();
  const [updateDiscount] = useUpdateDiscountMutation();
  const [delDiscount] = useDelDiscountMutation();

  console.log(cashbackData?.cashBack)
  useEffect(() => {
    if (cashbackData) {
      setCategories(cashbackData?.cashBack);
    }
  }, [cashbackData]);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setEditingCategory(null);
    setFormValues({ cashback: "", type: "percent" });
    setErrors({ CashBack: "", type: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.cashback) newErrors.CashBack = "CashBack required";
    if (!formValues.type) newErrors.type = "Type is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleAddOrEditCategory = async () => {
    if (!validateForm()) return;

    const newCategory = { ...formValues };

    if (editingCategory) {
      await updateDiscount({ id: editingCategory.id, updateDiscount: newCategory });
    } else {
      await saveDiscount(newCategory);
    }

    refetch();
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

  const confirmDeleteCategory = async () => {
    await delDiscount(categoryToDelete);
    setCategories((prevCategories) => prevCategories.filter((category) => category.id !== categoryToDelete));
    setOpenDeleteDialog(false);
    setCategoryToDelete(null);
    refetch();
  };

  const cancelDeleteCategory = () => {
    setOpenDeleteDialog(false);
    setCategoryToDelete(null);
  };
  const res = document.cookie.split('; ').find(row => row.startsWith('res='))?.split('=')[1];
  const IsAvailable = res==='Moderator'
  const columns = [
    { title: "Discount", dataIndex: "cashback", key: "cashback", render: (text) => text ,minWidth:150},
    { title: "Type", dataIndex: "type", key: "type", render: (text) => text ,minWidth:150},
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => 
        IsAvailable?null:(
        <>
          <Button
            onClick={() => handleEditCategory(record)}
            style={{ color: "green" }}
            startIcon={<CiEdit />}
          />
          <Button
            onClick={() => handleDeleteCategory(record.id)}
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

  const rowClassName = (record, index) => {
    return index % 2 !== 0 ? "even-row" : "";
  };

  return (
    <Box sx={{ height: 500, width: "100%" }}>
{!IsAvailable && categories.length === 0 && (
  <Button
    variant="contained"
    color="primary"
    onClick={handleOpenModal}
    sx={{ marginBottom: 2 }}
  >
    Add Discount
  </Button>
)}


      <Box sx={{ height: "auto", width: "100%" }} className="cta">
        <Table
          dataSource={categories}
          columns={columns}
          rowKey="id"
          loading={isLoading}
          rowClassName={rowClassName}
          Pagination={false}
        />
      </Box>

      <StyledModal open={isModalVisible} onClose={handleCloseModal}>
        <StyledBox>
          <Typography variant="h6" gutterBottom>
            {editingCategory ? "Edit Discount" : "Add Discount"}
          </Typography>
          <Box>
            <TextField
              label="CashBack"
              name="cashback"
              value={formValues.cashback}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={!!errors.CashBack}
              helperText={errors.CashBack}
            />

            <TextField
              select
              label="Type"
              name="type"
              value={formValues.type}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            >
              <MenuItem value="percent">Percent</MenuItem>
              <MenuItem value="amount">Amount</MenuItem>
            </TextField>
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
