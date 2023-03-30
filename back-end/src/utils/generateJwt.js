const fs = require('fs').promises;
const { join } = require('path');
const jwt = require('jsonwebtoken');

const GenerateToken = async (name, email, role) => {
  const path = '../../jwt.evaluation.key';
  const secret = await fs.readFile(join(__dirname, path), 'utf-8');
  const payload = {
    name,
    email,
    role,
  };
    const token = jwt.sign(payload, secret);
    return token;
};
module.exports = { GenerateToken };