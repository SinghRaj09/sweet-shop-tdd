exports.register = (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({
      error: "Email is required",
    });
  }

  if (!password) {
    return res.status(400).json({
      error: "Password is required",
    });
  }

  return res.status(201).json({
    message: "User registered successfully",
  });
};
