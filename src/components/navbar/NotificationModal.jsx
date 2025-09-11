

import React from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
};


const NotificationModal = ({ open, handleClose, notification, handleDelete }) => {
if (!notification) return null;
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="notification-modal-title"
      aria-describedby="notification-modal-description"
    >
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography id="notification-modal-title" variant="h6" component="h2">
            Notification Details
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ my: 2 }} />
        
        {/* Main Notification Content */}
        <Typography id="notification-modal-description" sx={{ mt: 2 }}>
          {notification.message}
        </Typography>

        {/* Display additional data if available */}
        {notification.data && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              **Additional Info:**
            </Typography>
            {Object.entries(notification.data).map(([key, value]) => (
              <Typography variant="body2" key={key}>
                **{key}:** {value}
              </Typography>
            ))}
          </Box>
        )}

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            color="primary"
          >
            Close
          </Button>
          <Button
            onClick={() => handleDelete(notification.id)}
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default NotificationModal