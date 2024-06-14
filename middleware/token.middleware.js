const jwt = require('jsonwebtoken');

function validateToken(req, res, next) {
    // Get the token from the request headers
    const token = req.headers.authorization;

    // Check if token exists
    if (!token) {
        return next();
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return next();
    }
}

module.exports = validateToken;