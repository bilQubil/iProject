'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: 'categoryId' })
      Product.belongsTo(models.User, { foreignKey: 'authorId' })
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
          notEmpty: true,
          notNull: true,
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
          notEmpty: true, 
          len: [10, 500], 
      },
    },
    price:{
      type: DataTypes.INTEGER,
      allowNull: false, 
      validate: {
          isInt: true, 
          min: 1, 
      },
  },
    stock:{
      type: DataTypes.INTEGER,
      allowNull: false, 
      validate: {
          isInt: true, 
          min: 0, 
      },
  },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
          notEmpty: true, 
          isUrl: true, 
      },
  },
    categoryId: {
      type: DataTypes.INTEGER,
      field: 'categoryId', 
      allowNull: false, 
        validate: {
            isInt: true,
        },
    },
    authorId: {
      type: DataTypes.INTEGER,
      field: 'authorId', 
      allowNull: false, 
        validate: {
            isInt: true,
        },
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};