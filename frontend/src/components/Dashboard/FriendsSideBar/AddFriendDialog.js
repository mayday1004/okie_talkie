import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setupFriendInvitation } from '../../../store/actions/friendsAction';
import { Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';
import { Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import valid from '../../../utils/validation';
import InputWithLabel from '../../InputWithLabel';
import CustomPrimaryButton from '../../CustomPrimaryButton';

const AddFriendDialog = ({ isDialogOpen, closeDialogHandler, sendFriendInvitation = () => {} }) => {
  const [mail, setMail] = useState('');
  const [isFormValid, setIsFormValid] = useState('');
  const dispatch = useDispatch();

  const handleSendInvitation = () => {
    dispatch(setupFriendInvitation('inviteFriend', { email: mail }));
    handleCloseDialog();
    // send friend request to server
  };

  const handleCloseDialog = () => {
    closeDialogHandler();
    setMail('');
  };

  useEffect(() => {
    setIsFormValid(valid({ formType: 'email', mail }));
  }, [mail, setIsFormValid]);

  return (
    <ThemeProvider theme={theme}>
      <Dialog aria-labelledby='customized-dialog-title' open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          <Typography sx={{ color: 'white', fontWeight: 'bold' }}>Invite a Friend</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: 'white', marginBottom: '10px' }}>
            Enter e-mail address of friend which you would like to invite.
          </Typography>
          <InputWithLabel
            id='email'
            label='Mail'
            type='email'
            value={mail}
            setValue={setMail}
            placeholder='Enter mail address'
          />
        </DialogContent>
        <DialogActions>
          <CustomPrimaryButton
            onClick={handleSendInvitation}
            disabled={isFormValid}
            label='Send'
            additionalStyles={{
              position: 'relative',
              right: '15px',
            }}
            allow={isFormValid}
          />
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default AddFriendDialog;

const theme = createTheme({
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: () => ({
          ...{
            background: 'rgb(53, 59, 64)',
            padding: '10px 20px',
          },
        }),
      },
    },
  },
});
