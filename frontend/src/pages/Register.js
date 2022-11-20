import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setupUser } from '../store/actions/authAction';
import { clearAlert } from '../store/actions/alertAction';
import AuthBox from '../components/auth/AuthBox';
import { Header, Inputs, Footer } from '../components/auth/register';

const Register = () => {
  const [mail, setMail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnClick = () => {
    dispatch(setupUser('register', { username, email: mail, password, passwordConfirm }));
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
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        passwordConfirm={passwordConfirm}
        setPasswordConfirm={setPasswordConfirm}
        handleOnClick={handleOnClick}
      />
      <Footer />
    </AuthBox>
  );
};

export default Register;
