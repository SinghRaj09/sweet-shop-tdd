exports.authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  // Token extraction (used later for real JWT)
  const token = authHeader.split(" ")[1];
  req.token = token;

  next();
};
