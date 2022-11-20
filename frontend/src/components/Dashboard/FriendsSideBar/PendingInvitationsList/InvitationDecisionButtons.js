import { Check, Clear } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const InvitationDecisionButtons = ({ disabled, acceptInvitationHandler, rejectInvitationHandler }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <ThemeProvider theme={themeCheck}>
        <IconButton style={{ color: 'white' }} disabled={disabled} onClick={acceptInvitationHandler}>
          <Check />
        </IconButton>
      </ThemeProvider>
      <ThemeProvider theme={themeClear}>
        <IconButton style={{ color: 'white' }} disabled={disabled} onClick={rejectInvitationHandler}>
          <Clear />
        </IconButton>
      </ThemeProvider>
    </Box>
  );
};

export default InvitationDecisionButtons;

const themeCheck = createTheme({
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: () => ({
          ...{
            '&:hover': {
              background: '#3ba55d',
            },
          },
        }),
      },
    },
  },
});

const themeClear = createTheme({
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: () => ({
          ...{
            '&:hover': {
              background: '#f04735',
            },
          },
        }),
      },
    },
  },
});
