
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const accessToken = generateAccessToken(user.id, user.role);
  const refreshToken = generateRefreshToken(user.id,user.role);

  res.json({
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    accessToken,
    refreshToken,
  });
};

exports.refreshToken = (req, res) => {
  const { token } = req.body;

  

  if (!token) return res.status(401).json({ message: "No token provided" });


  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    
    const newAccessToken = generateAccessToken(decoded.id, decoded.role);
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json({ message: "Token expired or invalid" });
  }
};
