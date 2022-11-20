import InputWithLabel from '../../InputWithLabel';
import CustomPrimaryButton from '../../CustomPrimaryButton';
import valid from '../../../utils/validation';

const Inputs = ({
  username,
  setUsername,
  mail,
  setMail,
  password,
  setPassword,
  passwordConfirm,
  setPasswordConfirm,
  handleOnClick,
}) => {
  return (
    <>
      <InputWithLabel
        id='username'
        value={username}
        setValue={setUsername}
        label='Username'
        type='text'
        placeholder='Enter a username'
      />

      <InputWithLabel
        id='email'
        value={mail}
        setValue={setMail}
        label='E-mail address'
        type='email'
        placeholder='Enter e-mail address'
      />

      <InputWithLabel
        id='password'
        value={password}
        setValue={setPassword}
        label='Password'
        type='password'
        placeholder='Enter password'
      />

      <InputWithLabel
        id='passwordConfirm'
        value={passwordConfirm}
        setValue={setPasswordConfirm}
        label='Password Confirm'
        type='password'
        placeholder='Enter password'
        match={passwordConfirm === password}
      />

      <CustomPrimaryButton
        label='Register'
        additionalStyles={{ marginTop: '20px' }}
        allow={valid({ formType: 'register', mail, password, username, passwordConfirm })}
        onClick={handleOnClick}
      />
    </>
  );
};

export default Inputs;
