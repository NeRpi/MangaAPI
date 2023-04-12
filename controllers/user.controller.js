const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

class UserController {
    constructor(sequelize) {
        User(sequelize);
        this.models = sequelize.models;
    }

    signUp = async (req, res) => {
        try {
            const { user_name, password } = req.body;
            const passwordHash = await bcrypt.hash(password, saltRounds);
            const user = await this.models.User.create({ user_name, password: passwordHash });
            const token = jwt.sign(
                { user_id: user._id, user_name: user.user_name },
                process.env.TOKEN_KEY,
                { expiresIn: '2h' }
            );

            res.status(201).json({ accessToken: token });
        } catch (err) {
            res.send(err);
        }
    }

    login = async (req, res) => {
        try {
            const { user_name, password } = req.body;
            const user = await this.models.User.findOne({ where: { user_name } });
            if (user) {
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) {
                    const token = jwt.sign(
                        { user_id: user._id, user_name: user.user_name },
                        process.env.TOKEN_KEY,
                        { expiresIn: "2h", }
                    );
                    res.status(200).json({ accessToken: token });
                } else {
                    res.status(404).json('Не верный пароль');
                }
            } else {
                res.status(403).json({ message: 'Пользователь не найден' });
            }
        } catch (err) {
            res.send(err);
        }
    }
}

module.exports = UserController;