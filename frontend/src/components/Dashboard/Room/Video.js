import React, { useEffect, useRef } from 'react';
import { styled } from '@mui/system';

const Video = ({ stream, isLocalStream }) => {
  //stream是webRTCHandler那邊來的:mediaDevices.getUserMedia()
  const videoRef = useRef();

  useEffect(() => {
    const video = videoRef.current;
    video.srcObject = stream;

    video.onloadedmetadata = () => {
      video.play();
    };
  }, [stream]);

  return (
    <MainContainer>
      <VideoEl ref={videoRef} autoPlay muted={isLocalStream ? true : false} />
    </MainContainer>
  );
};

export default Video;

const MainContainer = styled('div')({
  backgroundColor: 'black',
  borderRadius: '8px',
});

const VideoEl = styled('video')({
  width: '100%',
  height: '100%',
});
