const Router = require('express');
const UserController = require('../controllers/user.contreller');

const router = new Router();

module.exports = (sequelize) => {
    const userController = new UserController(sequelize);

    router.post('/auth/signup', userController.signUp);
    router.post('/auth/login', userController.login);

    return router;
}