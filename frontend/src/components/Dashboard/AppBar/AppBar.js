import { styled } from '@mui/system';
import DropdownMenu from './DropdownMenu';

const AppBar = () => {
  return (
    <MainContainer>
      <DropdownMenu />
    </MainContainer>
  );
};

export default AppBar;

const MainContainer = styled('div')({
  height: '48px',
  borderBottom: '1px solid rgba(0,0,0,.3)',
  backgroundColor: '#36393f',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: '0 15px',
});
