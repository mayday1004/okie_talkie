import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Menu, MenuItem, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MoreVert, PowerSettingsNew, AccountCircle } from '@mui/icons-material';
import { logout } from '../../../store/actions/authAction';
import ProfileDialog from './ProfileDialog';

export default function BasicMenu() {
  const dispatch = useDispatch();
  const [profilePopupOpen, setProfilePopupOpen] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const profileOpen = Boolean(profilePopupOpen);

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const clickToLogout = () => {
    dispatch(logout());
  };

  const clickToMyProfile = e => {
    setProfilePopupOpen(e.currentTarget);
  };

  return (
    <div>
      <IconButton onClick={handleMenuOpen} style={{ color: 'white' }}>
        <MoreVert />
      </IconButton>
      <ThemeProvider theme={theme}>
        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <div>
            <MenuItem onClick={clickToMyProfile} sx={{ display: 'flex', gap: '15px' }}>
              <AccountCircle /> Profile
            </MenuItem>
            <ProfileDialog isDialogOpen={profileOpen} closeDialogHandler={setProfilePopupOpen} />
          </div>
          <MenuItem onClick={clickToLogout} sx={{ display: 'flex', gap: '15px' }}>
            <PowerSettingsNew /> Logout
          </MenuItem>
        </Menu>
      </ThemeProvider>
    </div>
  );
}

const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: () => ({
          ...{
            backgroundColor: 'transparent',
          },
        }),
      },
    },
    MuiList: {
      styleOverrides: {
        root: () => ({
          ...{
            backgroundColor: '#202225',
            color: '#fff',
          },
        }),
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: () => ({
          ...{
            '&:hover': {
              background: '#36393F',
            },
          },
        }),
      },
    },
  },
});
