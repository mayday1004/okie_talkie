const valid = ({ formType, ...other }) => {
  if (formType === 'register') {
    if (
      other.username.length > 2 &&
      other.username.length < 13 &&
      other.mail.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) &&
      other.password &&
      other.password === other.passwordConfirm
    ) {
      return true;
    }
    return false;
  }
  if (formType === 'login') {
    if (other.mail.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) && other.password.length > 5) {
      return true;
    }
    return false;
  }
  if (formType === 'email') {
    if (other.mail.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
      return true;
    }
    return false;
  }
};
export default valid;
