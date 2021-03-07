const cuid = require("cuid");
const { isEmail, isAlphanumeric } = require("validator");
const bcrypt = require("bcrypt");
const db = require("../db");

module.exports = {
  create,
  get,
  User,
};

const SALT_ROUNDS = 10;

function emailSchema(opts = {}) {
  const { required } = opts;

  return {
    required: !!required,
    type: String,
    unique: true,
    validate: {
      validator: isEmail,
      message: (prop) => `${prop.value} is not a valid email address`,
    },
  };
}

function usernameSchema() {
  return {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minLength: 3,
    maxLength: 16,
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
  email: emailSchema({ required: true }),
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
  if (!user.password) throw user.invalidate("passwort", "password is required");
  if (user.password.length < 8)
    throw user.invalidate("password must be atleast 8 characters");
  user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
}
