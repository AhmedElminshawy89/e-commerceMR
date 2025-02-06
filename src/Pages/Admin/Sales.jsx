import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

import { useAddAdminMutation, useUpdateAdminMutation, useShowAdminTypeQuery  ,useForgetPasswordAdminMutation, useDelAdminMutation} from "../../app/Api/Admin";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import { message, Table } from "antd";
import { FaRegCopy } from 'react-icons/fa';

const Sales = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState("add");
  const [formData, setFormData] = useState({
    name_en: "",
    email: "",
    phone: "",
    gender: "",
    avatar: "",
    role: ["admin"],
    type: "",
    password: "",
    password_confirmation: "",
  });

  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // const rolesOptions = ["Admin", "Moderator", "Sales"];
  const typeOptions = ["Admin", "Moderator", "Sales"];
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [addAdmin] = useAddAdminMutation();
  const [updateAdmin] = useUpdateAdminMutation();
  const [delAdmin] = useDelAdminMutation();
  const [resetPassAdmin] = useForgetPasswordAdminMutation();
  const { data, isLoading, refetch } = useShowAdminTypeQuery({ type: "Sales", page: currentPage });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleOpenDialog = (mode, user = null) => {
    setDialogMode(mode);
    setFormData(
      user || {
        name_en: "",
        email: "",
        phone: "",
        gender: "",
        role: ["admin"],
        type: "",
        password: "",
        password_confirmation: "",
      }
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({
      name_en: "",
      email: "",
      phone: "",
      gender: "",
      role: ["admin"],
      type: "",
      password: "",
      password_confirmation: "",
    });
  };
  const handleSave = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.type) {
      setSnackbarMessage("Please fill in all fields correctly!");
      setSnackbarOpen(true);
      return;
    }
  
    if (dialogMode === "add") {
      if (!formData.password || !formData.password_confirmation) {
        setSnackbarMessage("Please enter a password and confirm it!");
        setSnackbarOpen(true);
        return;
      }
  
      if (formData.password !== formData.password_confirmation) {
        setSnackbarMessage("Passwords do not match!");
        setSnackbarOpen(true);
        return;
      }
  
      if (formData.password.length < 8) {
        setSnackbarMessage("Password must be at least 8 characters!");
        setSnackbarOpen(true);
        return;
      }
    }
  
    try {
      let response;
      if (dialogMode === "add") {
        response = await addAdmin(formData).unwrap();
      } else if (dialogMode === "edit") {
        response = await updateAdmin(formData).unwrap();
      }
  
      if (response.status === true) {
        setSnackbarMessage(dialogMode === "add" ? "Admin added successfully!" : "Admin updated successfully!");
        setSnackbarOpen(true);
        refetch();
        handleCloseDialog();
      }
    } catch (error) {
      console.error("Error saving admin:", error);
  
      if (error?.data?.errors) {
        let errorMessage = '';
  
        for (const [field, messages] of Object.entries(error.data.errors)) {
          errorMessage += `${field}: ${messages.join(', ')}\n`;
        }
  
        setSnackbarMessage(errorMessage);
      } else {
        setSnackbarMessage("An unexpected error occurred.");
      }
  
      setSnackbarOpen(true);
    }
  };
  
  
  

  const handleDelete = async (id) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await delAdmin(deleteId).unwrap();
      setSnackbarMessage("Admin deleted successfully!");
      setOpenDeleteDialog(false);
      refetch();
    } catch (error) {
      console.error("Error deleting admin:", error);
      setSnackbarMessage("An error occurred while deleting the admin.");
      setSnackbarOpen(true);
    }
  };

  const handleChangePassword = (record) => {
    console.log("Changing password for admin:", record);
    setOpenPasswordDialog(true);
  };

  const handlePasswordSave = async () => {
    if (!newPassword || !confirmNewPassword || newPassword !== confirmNewPassword) {
      setSnackbarMessage("Passwords do not match or are empty!");
      setSnackbarOpen(true);
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setSnackbarMessage("Passwords do not match!");
      setSnackbarOpen(true);
      return;
    }
    
    if (newPassword.length < 8) {
      setSnackbarMessage("Password must be at least 8 characters!");
      setSnackbarOpen(true);
      return;
    }
    
    const admin = {password: newPassword, password_confirmation: confirmNewPassword}
    try {
      await resetPassAdmin(admin).unwrap();
      setSnackbarMessage("Password changed successfully!");
      setOpenPasswordDialog(false);
    } catch (error) {
      console.error("Error changing password:", error);
      setSnackbarMessage("An error occurred while changing the password.");
      setSnackbarOpen(true);
    }
  };

  const handleCopyLink = (link) => {
    const Link = `http://localhost:5173/?ref=${link}`;
    navigator.clipboard.writeText(Link)
      .then(() => {
        message.success("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        message.error("Failed to copy the link.");
      });
  };
  const res = document.cookie.split('; ').find(row => row.startsWith('res='))?.split('=')[1];
  const IsAvailable = res==='Moderator'
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Type", dataIndex: "type", key: "type" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) =>  IsAvailable?null:(
        <>
          <Button
            onClick={() => handleOpenDialog("edit", record)}
            style={{ color: "green", marginRight: 10 }}
            icon={<CiEdit />}
          >
            <CiEdit />
          </Button>
          <Button
            onClick={() => handleDelete(record.id)}
            style={{ color: "red" }}
            icon={<MdDelete />}
          >
            <MdDelete />
          </Button>
                    <Button
                      onClick={() => handleChangePassword(record)}
                      style={{ color: "#333" }}
                      icon={<RiLockPasswordLine />}
                    >
                      <RiLockPasswordLine />
                    </Button>
          <Button
            onClick={() => handleCopyLink(record.code)}
            style={{ color: "green", marginRight: 10 }}
            icon={<FaRegCopy />}
          >
            <FaRegCopy />
          </Button>
        </>
      ),
    },
  ];

  const rowClassName = (record, index) => {
    return index % 2 !== 0 ? "even-row" : "";
  };

  return (
    <Box sx={{ height: "100%", width: "100%" }}  className="cta">
      <Table
        dataSource={data?.admin?.data || []}
        columns={columns}
        rowClassName={rowClassName}
        rowKey="id"
        loading={isLoading}
        pagination={{
          total: data?.admin?.total || 0,
          current: currentPage,
          pageSize: pageSize,
          onChange: (page) => setCurrentPage(page),
        }}
      />

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>Are you sure you want to delete this sales?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{dialogMode === "add" ? "Add Sales" : "Edit Sales"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Gender</InputLabel>
            <Select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            >
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Type</InputLabel>
            <Select
              value={formData.type || 'a'}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              {typeOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {dialogMode === "add" && (
            <>            
              <TextField
                label="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                fullWidth
                type="password"
                margin="normal"
              />
              <TextField
                label="Confirm Password"
                value={formData.password_confirmation}
                onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                fullWidth
                type="password"
                margin="normal"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openPasswordDialog} onClose={() => setOpenPasswordDialog(false)}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            type="password"
            margin="normal"
          />
          <TextField
            label="Confirm New Password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            fullWidth
            type="password"
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPasswordDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handlePasswordSave} color="primary">
            Save Password
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Sales;
