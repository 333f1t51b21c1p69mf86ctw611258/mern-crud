'use strict';
module.exports = (sequelize, DataTypes) => {
  var product_group = sequelize.define('product_group', {
    code: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return product_group;
};