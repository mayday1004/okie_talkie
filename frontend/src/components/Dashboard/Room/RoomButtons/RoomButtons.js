import React from 'react';
import { useSelector } from 'react-redux';
import { styled } from '@mui/system';
import CameraButton from './CameraButton';
import MicButton from './MicButton';
import CloseRoomButton from './CloseRoomButton';
import ScreenShareButton from './ScreenShareButton';
import ResizeRoomButton from './ResizeRoomButton';

const RoomButtons = ({ isRoomMinimized, handleRoomResize }) => {
  const room = useSelector(state => state.room);

  return (
    <MainContainer>
      {!room.isUserJoinedWithOnlyAudio && <ScreenShareButton {...room} />}
      <MicButton localStream={room.localStream} />
      <CloseRoomButton />
      {!room.isUserJoinedWithOnlyAudio && <CameraButton localStream={room.localStream} />}
      <ResizeRoomButton isRoomMinimized={isRoomMinimized} handleRoomResize={handleRoomResize} />
    </MainContainer>
  );
};

export default RoomButtons;

const MainContainer = styled('div')({
  position: 'relative',
  height: '12%',
  width: '100%',
  backgroundColor: '#5865f2',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
