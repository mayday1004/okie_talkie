import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { styled } from '@mui/system';
import { IconButton, Button } from '@mui/material';
import { Send, AddReactionOutlined } from '@mui/icons-material';
import { sendPrivateMessage } from '../../../socketio/socketConnection';

const NewMessageInput = ({ chosenChatDetails }) => {
  const [message, setMessage] = useState('');
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(null);

  const handleMessageValueChange = event => {
    setMessage(event.target.value);
  };

  const handleKeyPressed = event => {
    if (event.key === 'Enter') {
      handleMessage();
    }
  };

  const handleMessage = () => {
    if (message.length > 0) {
      sendPrivateMessage({
        receiverUserId: chosenChatDetails.id,
        content: message,
      });
      setMessage('');
    }
  };

  const emojiPickerHandler = e => {
    setEmojiPickerOpen(!emojiPickerOpen);
  };

  const chosenEmojiHandler = event => {
    let msgText = message + event.emoji;
    setMessage(msgText);
  };

  return (
    <MainContainer>
      <IconButton variant='outlined' onClick={emojiPickerHandler}>
        <AddReactionOutlined style={{ color: 'white' }} />
      </IconButton>
      {emojiPickerOpen && (
        <EmojiContainer>
          <EmojiPicker
            previewConfig={{ showPreview: false }}
            emojiStyle='google'
            onEmojiClick={chosenEmojiHandler}
          />
        </EmojiContainer>
      )}
      <Input
        placeholder={`Write message to ${chosenChatDetails.username}`}
        value={message}
        onChange={handleMessageValueChange}
        onKeyDown={handleKeyPressed}
      />
      <Button variant='contained' onClick={handleMessage} sx={{ bgcolor: '#5865F2' }}>
        <Send />
      </Button>
    </MainContainer>
  );
};

export default NewMessageInput;

const MainContainer = styled('div')({
  position: 'relative',
  height: '80px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '15px',
});

const Input = styled('input')({
  backgroundColor: '#2f3136',
  width: '75%',
  height: '44px',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '14px',
  padding: '0 10px',
});

const EmojiContainer = styled('div')({
  position: 'absolute',
  bottom: '75px',
  left: '8%',
});
