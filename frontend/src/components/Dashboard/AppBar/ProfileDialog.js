import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';
import { Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { userUpdated } from '../../../store/actions/authAction';
import UserImage from '../../UserImage';
import InputWithLabel from '../../InputWithLabel';
import CustomPrimaryButton from '../../CustomPrimaryButton';

const ProfileDialog = ({ isDialogOpen, closeDialogHandler }) => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const [mail, setMail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [pic, setPic] = useState(null);
  const [picLoading, setPicLoading] = useState(false);

  const handleCloseDialog = () => {
    setMail(mail);
    setUsername(username);
    setIsChangePassword(false);
    setCurrentPassword('');
    setNewPassword('');
    setNewPasswordConfirm('');
    setPic(null);
    closeDialogHandler(null);
  };

  const submitHandler = async () => {
    dispatch(
      userUpdated({
        _id: user._id,
        username,
        email: mail,
        picture: pic,
        currentPassword,
        newPassword,
        newPasswordConfirm,
      })
    );
    setTimeout(() => {
      handleCloseDialog();
    }, 3000);
  };

  const postDetails = pics => {
    setPicLoading(true);
    if (pics === undefined) {
      return;
    }

    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const reader = new FileReader();
      reader.readAsDataURL(pics);
      reader.onloadend = () => {
        setPic(reader.result.toString());
      };
      setPicLoading(false);
    } else {
      setPicLoading(false);
      return;
    }
  };

  return (
    <ThemeProvider theme={profileTheme}>
      <Dialog aria-labelledby='customized-dialog-title' open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          <Typography sx={{ fontSize: '24px', color: 'white', fontWeight: 'bold' }}>
            Setting Profile
          </Typography>
          <Typography sx={{ color: 'white' }}>
            You can modify information about your account, change your password and personal image.
          </Typography>
        </DialogTitle>
        <DialogContent>
          <UserBasic>
            <UserImage username={user.username} image={pic ? pic : user.image} />
            <Button variant='contained' component='label'>
              Upload Image
              <input
                hidden
                accept='image/*'
                multiple
                type='file'
                onChange={e => postDetails(e.target.files[0])}
              />
            </Button>
          </UserBasic>
          <InputWithLabel
            id='username'
            value={username}
            setValue={setUsername}
            label='Username'
            type='text'
            placeholder='Enter a username'
          />

          <InputWithLabel
            id='email'
            value={mail}
            setValue={setMail}
            label='E-mail address'
            type='email'
            placeholder='Enter e-mail address'
          />
          <ChangePassword>
            Change Password ?
            <Button
              variant='outlined'
              sx={{ fontWeight: 'bold' }}
              onClick={() => setIsChangePassword(!isChangePassword)}
            >
              Change
            </Button>
          </ChangePassword>

          {isChangePassword && (
            <>
              <InputWithLabel
                id='newPassword'
                value={newPassword}
                setValue={setNewPassword}
                label='New Password'
                type='password'
                placeholder='Enter your new password'
              />

              <InputWithLabel
                id='newPasswordConfirm'
                value={newPasswordConfirm}
                setValue={setNewPasswordConfirm}
                label='New Password Confirm'
                type='password'
                placeholder='Check again your new password'
                match={newPassword === newPasswordConfirm}
              />
            </>
          )}
          <HR>
            <hr style={{ width: '80%', border: '0.3px solid rgba(255,255,255,0.3)' }} />
          </HR>
          <InputWithLabel
            id='password'
            value={currentPassword}
            setValue={setCurrentPassword}
            label='Current Password'
            type='password'
            placeholder='Enter current password'
          />
        </DialogContent>
        <DialogActions sx={{ margin: '0 15px 15px 0' }}>
          <CustomPrimaryButton
            label='Save'
            allow={
              (!picLoading && pic && currentPassword) ||
              (newPasswordConfirm && newPassword && currentPassword) ||
              (currentPassword && username !== user.username && mail !== user.email)
            }
            onClick={submitHandler}
          />
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default ProfileDialog;

const UserBasic = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '15px',
  width: '100%',
  color: 'white',
});

const ChangePassword = styled('div')({
  display: 'flex',
  gap: '25px',
  marginTop: '20px',
  color: '#b9bbbe',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  fontWeight: '600',
  fontSize: '16px',
  justifyContent: 'flex-start',
  alignItems: 'center',
});

const HR = styled('div')({
  marginTop: '30px',
});

const profileTheme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: () => ({
          ...{
            backgroundColor: '#36393F',
          },
        }),
      },
    },
  },
});
