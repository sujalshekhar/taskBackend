const jwt = require('jsonwebtoken')
require('dotenv').config();

const generateToken = async (payload) => {
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {expiresIn : '10h'})
    return token;
}

module.exports = generateToken;