import React from 'react';
import { useSelector } from 'react-redux';
import { styled } from '@mui/system';
import Video from './Video';

const VideosContainer = () => {
  const room = useSelector(state => state.room);
  const videoElCount = room.remoteStreams.length + 1;

  let gridRowsCount = 1;
  let gridColumnsCount = 1;

  for (let i = 1; i * i <= videoElCount; i++) {
    if (i < 6 && i * i === videoElCount) {
      gridColumnsCount = i;
      gridRowsCount = i;
    } else if (i >= 5) {
      gridColumnsCount = 5;
      gridRowsCount = Math.ceil(videoElCount / 5);
    } else if (videoElCount > i * (i + 1)) {
      gridColumnsCount = i + 1;
      gridRowsCount = i + 1;
    } else {
      gridColumnsCount = i + 1;
      gridRowsCount = i;
    }
  }

  return (
    <MainContainer
      style={{
        gridTemplateRows: `repeat(${gridRowsCount},minmax(${100 / gridRowsCount}%,1fr))`,
        gridTemplateColumns: `repeat(${gridColumnsCount},minmax(20%,1fr))`,
      }}
    >
      <Video stream={room.screenSharingStream ? room.screenSharingStream : room.localStream} isLocalStream />
      {room.remoteStreams.map(stream => {
        return <Video stream={stream} key={stream.id} />;
      })}
    </MainContainer>
  );
};

export default VideosContainer;

const MainContainer = styled('div')({
  position: 'relative',
  height: '88%',
  width: '100%',
  display: 'grid',
});
