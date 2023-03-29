const userService = require('../service/User');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const { type, message } = await userService.loginUser(email, password);

  if (type === null) {
    return res.status(404).json({ message });
  }

  return res.status(201).json({ message });
};
module.exports = {
    loginUser,
};