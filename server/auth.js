const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const autoCatch = require("./lib/auto-catch");
const User = require("./models/users");

const jwtSecret = process.env.JWT_SECRET || "a_very_long_secret";
const jwtOpts = { algorithm: "HS256", expiresIn: "1d" };

async function sign(payload) {
  const token = await jwt.sign(payload, jwtSecret, jwtOpts);
  return token;
}

function forbidden(next) {
  const err = new Error("Invalid username or password");
  err.statusCode = 401;
  next(err);
}

async function login(req, res, next) {
  const { username, password } = req.body;
  const user = await User.get(username);
  if (!user) return forbidden(next);
  const isUser = await bcrypt.compare(password, user.password);
  if (!isUser) return forbidden(next);
  const token = await sign({ username: user.username });
  res.json({ success: true, token });
}

async function register(req, res) {
  const user = await User.create(req.body);
  const token = await sign({ username: user.username });
  res.json({ success: true, token });
}

module.exports = autoCatch({
  login,
  register,
});
