const md5 = require('md5');
const userService = require('../service/User');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const { type, message } = await userService.loginUser(email, password);

  if (type === null) {
    return res.status(404).json({ message });
  }

  return res.status(200).json(message);
};

const registerUser = async (req, res) => {
  const { body } = req;
  const { name, email } = body;
  const password = md5(body.password);

  const { message, type } = await 
  userService.registerUser(name, email, password);

  if (type) {
    return res.status(409).json(message);
  }
  return res.status(201).json(message);
};

const admRegisterUser = async (req, res) => {
  const { body } = req;
  const { name, email, role } = body;
  const password = md5(body.password);

  const { message, type } = await 
  userService.admRegisterUser(name, email, password, role);

  if (type) {
    return res.status(409).json(message);
  }
  return res.status(201).json(message);
};

const getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  return res.status(200).json(users);
};

const GetUserByEmail = async (req, res) => {
  const { email } = req.body;
  const { type, message } = await userService.GetUserByEmail(email);
  if (type === null) {
    return res.status(404).json(message);
  }
  return res.status(200).json(message);
};

module.exports = {
    loginUser,
    registerUser,
    getAllUsers,
    GetUserByEmail,
    admRegisterUser,
};