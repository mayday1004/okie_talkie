import { useSelector } from 'react-redux';
import { styled } from '@mui/system';
import MainPageButton from './MainPageButton';
import CreateRoomButton from './CreateRoomButton';
import ActiveRoomButton from './ActiveRoomButton';

const SideBar = () => {
  const { isUserInRoom, activeRooms } = useSelector(state => state.room);

  return (
    <MainContainer>
      <MainPageButton />
      {!isUserInRoom && <CreateRoomButton isUserInRoom={isUserInRoom} />}
      {activeRooms.map(room => (
        <ActiveRoomButton
          key={room.roomId}
          roomId={room.roomId}
          creatorUsername={room.creatorUsername}
          participants={room.participants}
          isUserInRoom={isUserInRoom}
        />
      ))}
    </MainContainer>
  );
};

export default SideBar;

const MainContainer = styled('div')({
  width: '72px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#202225',
});
