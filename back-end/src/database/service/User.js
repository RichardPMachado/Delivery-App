const { User } = require('../models');
const md5 = require('md5')

const registerUser = async (user, email, password) => {
  const users = await User.findOne({
    where: { email },
  });
  if (users) {
    return { type: 'error', message: 'Email already registered' };
  }

  await User.create({ user, email, password });
  return { message: 'User Created' };
};

const loginUser = async (email, password) => {
  const hashedPassword = mds(password)

  const user = await User.findOne({
    where: { email, hashedPassword },
  });
  
  if (!user) {
    return null;
  }
  return { message: 'User Find' };
};
module.exports = { registerUser, loginUser };