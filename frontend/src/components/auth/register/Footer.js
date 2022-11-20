import { useNavigate } from 'react-router-dom';
import RedirectInfo from '../RedirectInfo';

const Footer = () => {
  const navigate = useNavigate();

  const handlePushToLoginPage = () => {
    navigate('/login');
  };

  return (
    <>
      <RedirectInfo
        text='Already have an account ? '
        redirectText='Login'
        additionalStyles={{ marginTop: '10px' }}
        redirectHandler={handlePushToLoginPage}
      />
    </>
  );
};

export default Footer;
