import { Tooltip, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const CustomPrimaryButton = ({ label, additionalStyles, allow, onClick }) => {
  const getFormNotValidMessage = () => {
    return 'Please make sure all fields are filled in correctly.';
  };

  return (
    <Tooltip title={allow ? '' : getFormNotValidMessage()} placement='top'>
      <div>
        <ThemeProvider theme={theme}>
          <Button
            variant='contained'
            sx={{
              bgcolor: '#5865F2',
              color: 'white',
              textTransform: 'none',
              fontSize: '16px',
              fontWeight: 500,
              width: '100%',
              height: '40px',
            }}
            style={additionalStyles ? additionalStyles : {}}
            disabled={!allow}
            onClick={onClick}
          >
            {label}
          </Button>
        </ThemeProvider>
      </div>
    </Tooltip>
  );
};

export default CustomPrimaryButton;

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: () => ({
          ...{
            '&:hover': {
              background: '#6e7aff',
            },
          },
        }),
      },
    },
  },
});
