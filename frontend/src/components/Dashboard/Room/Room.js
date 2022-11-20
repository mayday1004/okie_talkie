import React, { useState } from 'react';
import { styled } from '@mui/system';
import VideosContainer from './VideosContainer';
import RoomButtons from './RoomButtons/RoomButtons';

const Room = () => {
  const [isRoomMinimized, setIsRoomMinimized] = useState(true);

  const roomResizeHandler = () => {
    setIsRoomMinimized(!isRoomMinimized);
  };

  return (
    <MainContainer style={isRoomMinimized ? minimizedRoomStyle : fullScreenRoomStyle}>
      <VideosContainer />
      <RoomButtons isRoomMinimized={isRoomMinimized} handleRoomResize={roomResizeHandler} />
    </MainContainer>
  );
};

export default Room;

const MainContainer = styled('div')({
  height: '100vh',
  position: 'absolute',
  right: '0',
  bottom: '0',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#202225',
});

const fullScreenRoomStyle = {
  width: '100%',
  height: '100vh',
};

const minimizedRoomStyle = {
  bottom: '0px',
  right: '0px',
  width: '30%',
  height: '40vh',
};
