import { styled } from '@mui/system';
import { useSelector } from 'react-redux';
import WelcomeMessage from './WelcomeMessage';
import MessengerContent from './MessengerContent';

const Messenger = () => {
  const chosenChatDetails = useSelector(state => state.chat.chosenChatDetails);
  return (
    <MainContainer>
      {chosenChatDetails ? <MessengerContent chosenChatDetails={chosenChatDetails} /> : <WelcomeMessage />}
    </MainContainer>
  );
};

export default Messenger;

const MainContainer = styled('div')({
  height: 'calc(100% - 49px)',
  flexGrow: 1,
  backgroundColor: '#36393f',
  display: 'flex',
});
