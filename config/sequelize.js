const config = require('./config');

module.exports = {
  development: {
    host: config.mysqlHost,
    port: config.mysqlPort,
    username: config.mysqlUsername,
    password: config.mysqlPassword,
    database: config.mysqlDB,
    dialect: 'mysql',
    seederStorage: 'sequelize',
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
}[process.env.NODE_ENV || 'development'];
