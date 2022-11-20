import Box from '@mui/material/Box';
import { styled } from '@mui/system';

const AuthBox = props => {
  return (
    <BoxWrapper>
      <Box
        component='form'
        sx={{
          width: 500,
          py: 4,
          px: 4,
          bgcolor: '#36393f',
          borderRadius: '5px',
          boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.8)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {props.children}
      </Box>
    </BoxWrapper>
  );
};

export default AuthBox;

const BoxWrapper = styled('div')({
  width: '100%',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#5865F2',
});
