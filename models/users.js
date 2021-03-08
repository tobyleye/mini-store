const cuid = require("cuid");
const { isAlphanumeric } = require("validator");
const bcrypt = require("bcrypt");
const db = require("../db");

module.exports = {
  create,
  get,
};

const SALT_ROUNDS = 10;

function usernameSchema() {
  return {
    type: String,
    required: [true, "username is required"],
    unique: true,
    lowercase: true,
    minLength: [3, "username must be atleast 3 characters"],
    maxLength: [16, "too many characters man"],
    validate: [
      {
        validator: isAlphanumeric,
        message: (prop) => `${prop.value} contains special characters`,
      },
      {
        validator: function (username) {
          return isUnique(this, username);
        },
        message: (prop) => `${prop.value} is taken`,
      },
    ],
  };
}

async function isUnique(doc, username) {
  const existing = await get(username);
  return !existing || doc._id === existing._id;
}

const User = db.model("User", {
  _id: { type: String, default: cuid },
  username: usernameSchema(),
  password: { type: String, maxLength: 120, required: true },
});

async function create(fields) {
  const user = new User(fields);
  await hashPassword(user);
  await user.save();
  return user;
}

async function get(username) {
  const user = await User.findOne({ username });
  return user;
}

async function hashPassword(user) {
  if (!user.password) throw user.invalidate("password", "password is required");
  if (user.password.length < 8)
    throw user.invalidate("password", "password must be atleast 8 characters");
  user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
}
