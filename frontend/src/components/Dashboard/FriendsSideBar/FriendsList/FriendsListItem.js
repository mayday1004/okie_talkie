import { Button, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { setChosenChatDetail } from '../../../../store/actions/chatAction';
import UserImage from '../../../UserImage';
import OnlineIndicator from './OnlineIndicator';

const FriendsListItem = ({ id, image, username, isOnline }) => {
  const dispatch = useDispatch();
  const handleChooseActiveConversation = () => {
    dispatch(setChosenChatDetail('PRIVATE', { id, image, username, isOnline }));
  };

  return (
    <ThemeProvider theme={theme}>
      <Button
        onClick={handleChooseActiveConversation}
        style={{
          width: '100%',
          height: '42px',
          marginTop: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          textTransform: 'none',
          color: 'black',
          position: 'relative',
          padding: '25px 8px',
        }}
      >
        <UserImage image={image} username={username} />
        <Typography
          style={{
            marginLeft: '8px',
            fontWeight: 700,
            color: '#8e9297',
          }}
          variant='subtitle1'
          align='left'
        >
          {username}
        </Typography>
        {isOnline && <OnlineIndicator />}
      </Button>
    </ThemeProvider>
  );
};

export default FriendsListItem;

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: () => ({
          ...{
            '&:hover': {
              background: 'rgba(0,0,0,0.2)',
            },
          },
        }),
      },
    },
  },
});
