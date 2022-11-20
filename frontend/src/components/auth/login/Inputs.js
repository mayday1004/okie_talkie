import InputWithLabel from '../../InputWithLabel';
import CustomPrimaryButton from '../../CustomPrimaryButton';
import valid from '../../../utils/validation';

const Inputs = ({ mail, setMail, password, setPassword, handleOnClick }) => {
  return (
    <>
      <InputWithLabel
        id='email'
        value={mail}
        setValue={setMail}
        label='E-mail'
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
      <CustomPrimaryButton
        label='Log in'
        additionalStyles={{ marginTop: '20px' }}
        allow={valid({ formType: 'login', mail, password })}
        onClick={handleOnClick}
      />
    </>
  );
};

export default Inputs;
