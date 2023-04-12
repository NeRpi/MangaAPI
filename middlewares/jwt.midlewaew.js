const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(403).json({ message: 'Отстутвует токен авторизации' });
    }

    jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Неправильный токен авторизации' });
        }

        req.user = user;
        next();
    });
}

module.exports = authenticateJWT;