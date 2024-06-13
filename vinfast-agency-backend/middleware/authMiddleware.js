// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env; // Ví dụ: SECRET_KEY='your_secret_key' trong .env

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token.split(' ')[1], SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Invalid token' });
            }
            req.user = decoded;
            next();
        });
    } else {
        return res.status(401).json({ error: 'Unauthorized' });
    }
};

module.exports = authMiddleware;