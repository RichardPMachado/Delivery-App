const fs = require('fs').promises;
const { join } = require('path');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    const token = req.header('authorization');
    const path = '../../jwt.evaluation.key';
    const secret = await fs.readFile(join(__dirname, path), 'utf-8');
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
      }
    try {
        const decoded = jwt.verify(token, secret);
        console.log(decoded);
      } catch (err) {
        return res.status(401).json({ message: 'Token must be a valid token' });
      }
  
    next();
  };