const md5 = require('md5');
const { User } = require('../models');
const { GenerateToken } = require('../../utils/generateJwt');

const loginUser = async (email, password) => {
  const hashedPassword = md5(password);

  const user = await User.findOne({
    where: { email, password: hashedPassword },
  });
  
  if (!user) {
    return { type: null, message: 'User Not Found' };
  }
  const token = await GenerateToken(user.name, email, user.role);
  return { message: { 
    name: user.name, 
    email, 
    role: user.role,
    token } };
};

const registerUser = async (name, email, password, role) => {
  const user = await User.findOne({
    where: { email, name },
  });
  if (user) {
    return { type: 'error', message: 'User already registered' };
  }
  const token = await GenerateToken(name, email, role);
  await User.create({ name, email, password, role });
  return { message: {
    name,
    role,
    email,
    token },
  };    
};
module.exports = { loginUser, registerUser };