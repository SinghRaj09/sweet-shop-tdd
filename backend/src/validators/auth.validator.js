exports.validateRegisterInput = ({ email, password }) => {
  if (!email) {
    return "Email is required";
  }

  if (!password) {
    return "Password is required";
  }

  return null;
};

exports.validateLoginInput = ({ email, password }) => {
  if (!email || !password) {
    return "Email and password are required";
  }

  return null;
};
