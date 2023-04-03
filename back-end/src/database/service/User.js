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

const registerUser = async (name, email, password) => {
  const verifyUser = await User.findOne({
    where: { email, name },
  });
  if (verifyUser) {
    return { type: 'error', message: 'User already registered' };
  }
  const token = await GenerateToken(name, email);
  await User.create({ name, email, password, role: "customer" });
  const user = await User.findOne({
    where: { email, name },
  });
  return { message: {
    name,
    role: user.role,
    email,
    token },
  };    
};
const getAllUsers = async () => {
  const users = await User.findAll();
  return { users };
}; 

const GetUserByEmail = async (email) => {

  const user = await User.findOne({
    where: { email },
  });
  
  if (!user) {
    return { type: null, message: 'User Not Found' };
  }
  return { message:  user  };
};
module.exports = { loginUser, registerUser, getAllUsers, GetUserByEmail };