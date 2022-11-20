import React from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import hello from '../../../assets/hello.png';

const WelcomeMessage = () => {
  return (
    <Wrapper>
      <Img src={hello} alt='' />
      <Typography variant='h6' sx={{ color: 'white' }}>
        To start chatting - choose conversation
      </Typography>
    </Wrapper>
  );
};

export default WelcomeMessage;

const Wrapper = styled('div')({
  flexGrow: 1,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const Img = styled('img')({
  height: '20%',
  marginBottom: '50px',
  opacity: '0.5',
});
