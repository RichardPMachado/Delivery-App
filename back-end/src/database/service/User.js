const md5 = require('md5');
const { User } = require('../models');

const loginUser = async (email, password) => {
  const hashedPassword = md5(password);

  const user = await User.findOne({
    where: { email, password: hashedPassword },
  });
  
  if (!user) {
    return { type: null, message: 'User Not Found' };
  }
  return { message: 'User Find' };
};

const registerUser = async (name, email, password, role) => {
  const user = await User.findOne({
    where: { email, name },
  });
  if (user) {
    return { type: 'error', message: 'User already registered' };
  }

  await User.create({ name, email, password, role });
  return { message: 'User Created' };
};
module.exports = { loginUser, registerUser };