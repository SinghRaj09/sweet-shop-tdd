exports.validateRegisterInput = ({ email, password }) => {
  if (!email) {
    return "Email is required";
  }

  if (!password) {
    return "Password is required";
  }

  return null;
};
