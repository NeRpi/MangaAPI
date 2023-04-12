const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


class UserController {
    constructor(sequelize) {
        User(sequelize);
        this.models = sequelize.models;
    }

    signUp = async (req, res) => {
        try {
            const user = await this.models.User.create(req.body);
            const token = jwt.sign(
                { user_id: user._id, user_name: user.user_name },
                process.env.TOKEN_KEY,
                { expiresIn: '2h' }
            );

            console.log('Регистрация пользователя');
            res.status(201).json({ accessToken: token });
        } catch (err) {
            console.log('Произошла ошибка при регистрации польщователя: ', err);
            res.send(err);
        }
    }

    login = async (req, res) => {
        try {
            const { user_name, password } = req.body;
            const user = await this.models.User.findOne({ user_name });
            if (user && password == user.password) {
                const token = jwt.sign(
                    { user_id: user._id, user_name: user.user_name },
                    process.env.TOKEN_KEY,
                    { expiresIn: "2h", }
                );

                console.log('Вход пользователя пользователя');
                res.status(200).json({ accessToken: token });
            } else {
                res.status(403).json({ message: 'Не верно введён пароль или имя пользователя' });
            }
        } catch (err) {
            console.log('Произошла ошибка при регистрации польщователя: ', err);
            res.send(err);
        }
    }
}

module.exports = UserController;