const userService = require('../Services/User');

const registerUser = async (req, res) => {
  const { user, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const { message, type } = await userService.registerUser(user, email, hashedPassword);

  if (type) {
    return res.status(409).json(message);
  }
console.log(message);
  return res.status(201).json(message);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const register = await userService.loginUser(email, password);

  if (register === null) {
    return res.status(404).json({ message: 'Not found' });
  }

  return res.status(201);
};
module.exports = {
    registerUser,
    loginUser,
};