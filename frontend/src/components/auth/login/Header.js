import { Typography } from '@mui/material';

const Header = () => {
  return (
    <>
      <Typography variant='h5' sx={{ color: 'white', textAlign: 'center', fontWeight: '600' }}>
        Welcome Back!
      </Typography>
      <Typography sx={{ color: '#b9bbbe', textAlign: 'center' }}>
        We are happy that you are with us!
      </Typography>
    </>
  );
};

export default Header;
