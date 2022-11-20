import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setupUser } from '../store/actions/authAction';
import { clearAlert } from '../store/actions/alertAction';
import AuthBox from '../components/auth/AuthBox';
import { Header, Inputs, Footer } from '../components/auth/login';

const Login = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnClick = () => {
    dispatch(setupUser('login', { email: mail, password: password }));
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/dashboard');
        dispatch(clearAlert());
      }, 3000);
    }
  }, [user, navigate, dispatch]);
  return (
    <AuthBox>
      <Header />
      <Inputs
        mail={mail}
        setMail={setMail}
        password={password}
        setPassword={setPassword}
        handleOnClick={handleOnClick}
      />
      <Footer />
    </AuthBox>
  );
};

export default Login;
