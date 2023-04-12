const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        user_name: {
            type: DataTypes.TEXT,
            allowAny: false,
            unique: true
        },
        password: {
            type: DataTypes.TEXT,
            allowAny: false
        }
    });
};