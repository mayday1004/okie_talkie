import React, { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Tooltip } from '@mui/material';

import { styled } from '@mui/system';

const InputWithLabel = ({ id, value, setValue, label, type, placeholder, match }) => {
  const [showPassword, setShowPassword] = useState(false);

  const tipMessage = () => {
    if (!value) return;
    if (id === 'username' && (value.length < 3 || value.length > 12)) {
      return 'Username must between 3 and 12 characters long.';
    }
    if (id === 'email' && !value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
      return 'Email address is invalid.';
    }
    if ((id === 'password' || id === 'newPassword' || id === 'currentPassword') && value.length < 6) {
      return 'Password must be use at least 6 characters.';
    }
    if ((id === 'passwordConfirm' || id === 'newPasswordConfirm') && !match) {
      return 'The password and confirmation password do not match.';
    }
  };

  const handleValueChange = event => {
    setValue(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Wrapper>
      <Label htmlFor={id}>{label}</Label>
      {type === 'password' ? (
        <PasswordInput>
          <Tooltip title={tipMessage()} placement='top'>
            <Input
              sx={{
                border: `1px solid ${tipMessage() ? 'red' : 'black'}`,
              }}
              id={id}
              type={showPassword ? 'text' : 'password'}
              value={value}
              onChange={handleValueChange}
              placeholder={placeholder}
            />
          </Tooltip>
          <Button onClick={handleClickShowPassword}>
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </Button>
        </PasswordInput>
      ) : (
        <Tooltip title={tipMessage()} placement='top'>
          <Input
            sx={{
              border: `1px solid ${tipMessage() ? 'red' : 'black'}`,
            }}
            id={id}
            value={value}
            onChange={handleValueChange}
            type={type}
            placeholder={placeholder}
          />
        </Tooltip>
      )}
    </Wrapper>
  );
};

export default InputWithLabel;

const Wrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '100%',
});

const PasswordInput = styled('div')({
  position: 'relative',
  display: 'flex',
  width: '100%',
});

const Button = styled('div')({
  position: 'absolute',
  right: '10px',
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: '#b9bbbe',
});

const Label = styled('label')({
  color: '#b9bbbe',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  fontWeight: '600',
  fontSize: '16px',
  margin: '15px 0 5px 0',
});

const Input = styled('input')({
  flexGrow: 1,
  height: '40px',
  borderRadius: '5px',
  color: '#dcddde',
  background: '#202225',
  fontSize: '16px',
  padding: '0 5px',
});
