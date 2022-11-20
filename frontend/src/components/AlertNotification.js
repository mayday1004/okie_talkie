import { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { clearAlert } from '../store/actions/alertAction';

const AlertNotification = () => {
  const showAlert = useSelector(state => state.alert.showAlert);
  const alertType = useSelector(state => state.alert.alertType);
  const messages = useSelector(state => state.alert.messages);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(showAlert);

    if (showAlert) {
      setTimeout(() => {
        dispatch(clearAlert());
      }, 5000);
    }
  }, [showAlert, dispatch]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={4900}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert variant='filled' severity={alertType ? alertType : 'success'} onClose={handleClose}>
        {messages}
      </Alert>
    </Snackbar>
  );
};

export default AlertNotification;
