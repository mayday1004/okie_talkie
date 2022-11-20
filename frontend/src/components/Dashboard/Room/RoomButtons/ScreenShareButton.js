import React from 'react';
import { useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
import { setScreenSharingStream } from '../../../../store/actions/roomAction';
import * as webRTCHandler from '../../../../socketio/webRTCHandler';

const constraints = {
  audio: false,
  video: true,
};

const ScreenShareButton = ({ localStream, screenSharingStream, isScreenSharingActive }) => {
  const dispatch = useDispatch();
  const handleScreenShareToggle = async () => {
    if (!isScreenSharingActive) {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      } catch (err) {
        console.log('error occured when trying to get an access to screen share stream');
      }
      if (stream) {
        dispatch(setScreenSharingStream(stream));
        webRTCHandler.switchOutgoingTracks(stream);
      }
    } else {
      webRTCHandler.switchOutgoingTracks(localStream);
      screenSharingStream.getTracks().forEach(t => t.stop());
      setScreenSharingStream(null);
    }
  };
  return (
    <IconButton onClick={handleScreenShareToggle} style={{ color: 'white' }}>
      {isScreenSharingActive ? <StopScreenShareIcon /> : <ScreenShareIcon />}
    </IconButton>
  );
};

export default ScreenShareButton;
