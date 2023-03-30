const jwt = require('jsonwebtoken');

const GenerateToken = (name, email, role) => {
  const secret = process.env.MY_SECRET;

  const payload = { 
    name,
    email,
    role,
  };

    const token = jwt.sign(payload, secret);
    return token;
};

module.exports = { GenerateToken };