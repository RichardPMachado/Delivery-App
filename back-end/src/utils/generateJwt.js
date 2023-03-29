const jwt = require('jsonwebtoken');

const GenerateToken = (email, role) => {
  const secret = process.env.MY_SECRET;

  const payload = { 
    email,
    role,
  };

    const token = jwt.sign(payload, secret);
    return token;
};

module.exports = { GenerateToken };