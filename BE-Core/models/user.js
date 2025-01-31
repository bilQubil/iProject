'use strict';
const { Model } = require('sequelize');
const { hashPass } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Product, { foreignKey: 'authorId' })
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Username is required",
          },
          notEmpty: {
            msg: "Username must not be empty",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email must be unique",
        },
        validate: {
          notNull: {
            msg: "Email is required",
          },
          notEmpty: {
            msg: "Email must not be empty",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
      },    
    },
    {
      sequelize,
      hooks: {
        beforeCreate(user) {
          user.password = hashPass(user.password);
        },
      },
      modelName: 'User',
    }
  );
  return User;
};
