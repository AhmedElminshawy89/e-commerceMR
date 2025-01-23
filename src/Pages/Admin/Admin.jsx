import { useState, useEffect } from "react";
import { Box, Avatar, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, MenuItem, Select, FormControl, InputLabel, Chip, OutlinedInput } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState("add");
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    country: "",
    city: "",
    avatar: "",
    roles: [],
    type: "",
  });

  const rolesOptions = ["Read", "Write", "Edit", "Delete", "Manage"];
  const typeOptions = ["Sales", "Admin"];

  useEffect(() => {
    const initialData = [
      {
        id: 1,
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "+1234567890",
        gender: "Male",
        country: "USA",
        city: "New York",
        avatar: "https://via.placeholder.com/50",
        roles: ["Read", "Write"],
        type: "Admin",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "janesmith@example.com",
        phone: "+9876543210",
        gender: "Female",
        country: "UK",
        city: "London",
        avatar: "https://via.placeholder.com/50",
        roles: ["Read", "Edit"],
        type: "Sales",
      },
    ];
    setUsers(initialData);
  }, []);

  const handleOpenDialog = (mode, user = null) => {
    setDialogMode(mode);
    setSelectedUser(user);
    setFormData(user || { name: "", email: "", phone: "", gender: "", country: "", city: "", avatar: "", roles: [], type: "" });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({ name: "", email: "", phone: "", gender: "", country: "", city: "", avatar: "", roles: [], type: "" });
  };

  const handleSave = () => {
    if (dialogMode === "add") {
      const newUser = { ...formData, id: users.length + 1 };
      setUsers([...users, newUser]);
    } else if (dialogMode === "edit") {
      setUsers(users.map(user => (user.id === selectedUser.id ? { ...formData, id: selectedUser.id } : user)));
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const columns = [
    { field: "avatar", headerName: "Avatar", flex: 0.5, minWidth: 100,
         renderCell: (params) => <Avatar src={params.value} alt="Avatar" /> },
    { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 1.5, minWidth: 200 },
    { field: "phone", headerName: "Phone", flex: 1, minWidth: 150 },
    { field: "roles", headerName: "Roles", flex: 1, minWidth: 150},
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 350,
      renderCell: (params) => (
        <>
          <Button onClick={() => handleOpenDialog("edit", params.row)} color="primary">Edit</Button>
          <Button onClick={() => handleDelete(params.row.id)} color="secondary">Delete</Button>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <Button variant="contained" color="primary" onClick={() => handleOpenDialog("add")} sx={{ marginBottom: 2 }}>
        Add Admin
      </Button>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 15]}
        disableSelectionOnClick
      />
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{dialogMode === "add" ? "Add User" : "Edit User"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
            <InputLabel>Roles</InputLabel>
            <Select
              multiple
              value={formData.roles}
              onChange={(e) => setFormData({ ...formData, roles: e.target.value })}
              input={<OutlinedInput label="Roles" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {rolesOptions.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Type</InputLabel>
            <Select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              {typeOptions.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPanel;
