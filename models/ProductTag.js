const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model { }

ProductTag.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product', // 'product' refers to table name
        key: 'id', // 'id' refers to column name in product table
      }
    },

  tag_id: {
  type: DataTypes.INTEGER,
  references: {
    model: 'tag', // 'tag' refers to table name
    key: 'id', // 'id' refers to column name in tag table
  }
}
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
