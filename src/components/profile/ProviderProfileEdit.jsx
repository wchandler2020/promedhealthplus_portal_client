import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ProviderProfileEdit = ({
  profile,
  onSave,
  onCancel,
  isLoading,
  error,
}) => {
  const [formData, setFormData] = useState({
    full_name: "",
    city: "",
    country: "",
    role: "",
    facility: "",
    facility_phone_number: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || "",
        city: profile.city || "",
        country: profile.country || "",
        role: profile.role || "",
        facility: profile.facility || "",
        facility_phone_number: profile.facility_phone_number || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: 4, width: "100%", maxWidth: 600, mx: "auto" }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" gutterBottom>
          Edit Profile
        </Typography>
        <IconButton onClick={onCancel}>
          <CloseIcon />
        </IconButton>
      </Box>

      {error && (
        <Typography color="error" variant="body2" sx={{ my: 2 }}>
          {error}
        </Typography>
      )}

      <TextField
        fullWidth
        label="Full Name"
        name="full_name"
        value={formData.full_name}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="City"
        name="city"
        value={formData.city}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Country"
        name="country"
        value={formData.country}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Facility"
        name="facility"
        value={formData.facility}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Facility Phone Number"
        name="facility_phone_number"
        value={formData.facility_phone_number}
        onChange={handleChange}
        margin="normal"
      />
      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button onClick={onCancel} variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : "Save Changes"}
        </Button>
      </Box>
    </Box>
  );
};

export default ProviderProfileEdit;