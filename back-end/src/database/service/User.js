const md5 = require('md5');
/* const { join } = require('path');
const fs = require('fs').promises;
const jwt = require('jsonwebtoken'); */
const { User } = require('../models');
const { GenerateToken } = require('../../utils/generateJwt');

/* const path = '../../../jwt.evaluation.key'; */

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
    id: user.id,
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
  const token = await GenerateToken(name, email, 'customer');
  await User.create({ name, email, password, role: 'customer' });
  const user = await User.findOne({
    where: { email, name },
  });
  return { message: {
    name,
    id: user.id,
    role: user.role,
    email,
    token },
  };    
};

const admRegisterUser = async (name, email, password, role) => {
  const verifyUser = await User.findOne({
    where: { email, name } });
  if (verifyUser) { return { type: 'error', message: 'User already registered' }; }
/*   const token = await GenerateToken(name, email, role);
   const secret = await fs.readFile(join(__dirname, path), 'utf-8');
  const decoded = jwt.verify(token, secret);
  console.log(decoded.role);
  if (decoded.role !== 'administrator') { 
    return { type: 'error', message: 'User is not an administrator' }; 
  } */
  await User.create({ name, email, password, role });
  const newUser = await User.findOne({ where: { email, name } });
  return { message: {
    name: newUser.name,
    role: newUser.role,
    email: newUser.email,
   },
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
  return { message: user };
};
module.exports = { loginUser, registerUser, getAllUsers, GetUserByEmail, admRegisterUser };