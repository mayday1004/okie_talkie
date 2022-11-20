import { useSelector } from 'react-redux';
import { styled } from '@mui/system';
import FriendsListItem from './FriendsListItem';

const FriendsList = () => {
  const friends = useSelector(state => state.friends.friends);
  const onlineUsers = useSelector(state => state.friends.onlineUsers);

  friends.forEach(f => {
    const isUserOnline = onlineUsers.find(user => user.userId === f.id);
    return (f.isOnline = isUserOnline ? true : false);
  });

  return (
    <MainContainer>
      {friends.map(f => (
        <FriendsListItem image={f.image} username={f.username} id={f.id} key={f.id} isOnline={f.isOnline} />
      ))}
    </MainContainer>
  );
};

export default FriendsList;

const MainContainer = styled('div')({
  flexGrow: 1,
  width: '100%',
});
