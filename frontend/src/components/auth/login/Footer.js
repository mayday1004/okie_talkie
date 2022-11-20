import { useNavigate } from 'react-router-dom';
import RedirectInfo from '../RedirectInfo';

const LoginPageFooter = () => {
  const navigate = useNavigate();

  const handlePushToRegisterPage = () => {
    navigate('/register');
  };

  return (
    <>
      <RedirectInfo
        text='Need an account ? '
        redirectText='Register'
        additionalStyles={{ marginTop: '10px' }}
        redirectHandler={handlePushToRegisterPage}
      />
    </>
  );
};

export default LoginPageFooter;
