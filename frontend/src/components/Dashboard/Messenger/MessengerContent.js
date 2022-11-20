import React, { useEffect } from 'react';
import { styled } from '@mui/system';
import Messages from './Messages/Messages';
import NewMessageInput from './NewMessageInput';
import { getPrivateChatHistory } from '../../../socketio/socketConnection';

const MessengerContent = ({ chosenChatDetails }) => {
  useEffect(() => {
    getPrivateChatHistory(chosenChatDetails.id);
  }, [chosenChatDetails]);

  return (
    <Wrapper>
      <Messages />
      <NewMessageInput chosenChatDetails={chosenChatDetails} />
    </Wrapper>
  );
};

export default MessengerContent;

const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
});
