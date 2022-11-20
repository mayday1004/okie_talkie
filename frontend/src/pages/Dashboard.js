import React, { useEffect } from 'react';
import { styled } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import SideBar from '../components/Dashboard/SideBar/SideBar';
import FriendsSideBar from '../components/Dashboard/FriendsSideBar/FriendsSideBar';
import Messenger from '../components/Dashboard/Messenger/Messenger';
import AppBar from '../components/Dashboard/AppBar/AppBar';
import Room from '../components/Dashboard/Room/Room';
import { logout } from '../store/actions/authAction';
import { connectWithSocketServer } from '../socketio/socketConnection';

const Dashboard = () => {
  const user = useSelector(state => state.auth.user);
  const isUserInRoom = useSelector(state => state.room.isUserInRoom);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(logout());
    } else {
      connectWithSocketServer(user);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      <SideBar />
      <FriendsSideBar />
      <Layout>
        <AppBar />
        <Messenger />
        {isUserInRoom && <Room />}
      </Layout>
    </Wrapper>
  );
};

export default Dashboard;

const Wrapper = styled('div')({
  width: '100%',
  height: '100vh',
  display: 'flex',
});

const Layout = styled('div')({
  position: 'relative',
  width: '100%',
});
