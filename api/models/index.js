const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);
const Sequelize = require('sequelize');
const config = require('../../config/sequelize');

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);
const db = {
  sequelize,
};

fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

module.exports = db;

