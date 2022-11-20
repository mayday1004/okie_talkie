import React from 'react';
import { useSelector } from 'react-redux';
import { styled } from '@mui/system';
import Avatar from '../../../UserImage';
import { Typography } from '@mui/material';

const MessagesHeader = () => {
  const chosenChatDetails = useSelector(state => state.chat.chosenChatDetails);
  return (
    <MainContainer>
      <Avatar
        image={chosenChatDetails.image}
        username={chosenChatDetails.username}
        customeStyle={{ width: '56px', height: '56px' }}
      />
      <Typography
        variant='h4'
        sx={{
          fontWeight: 'bold',
          color: 'white',
          margin: '5px',
        }}
      >
        {chosenChatDetails.username}
      </Typography>
      <Typography
        sx={{
          color: '#b9bbbe',
          marginLeft: '5px',
          marginRight: '5px',
        }}
      >
        This is the beginning of your conversation with {chosenChatDetails.username}
      </Typography>
    </MainContainer>
  );
};

export default MessagesHeader;

const MainContainer = styled('div')({
  width: '98%',
  display: 'column',
  marginTop: '10px',
});
