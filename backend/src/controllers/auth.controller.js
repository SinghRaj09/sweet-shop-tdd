const { validateRegisterInput } = require("../validators/auth.validator");

exports.register = (req, res) => {
  const error = validateRegisterInput(req.body);

  if (error) {
    return res.status(400).json({ error });
  }

  return res.status(201).json({
    message: "User registered successfully",
  });
};
