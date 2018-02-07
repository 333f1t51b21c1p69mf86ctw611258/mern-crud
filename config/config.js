// Set the connection string based from the config vars of the production server
// To run locally use 'mongodb://localhost/mern-crud' instead of process.env.DB

module.exports = {
  db: 'mongodb://localhost/mern-crud', //process.env.DB,
  mysqlHost: process.env.MYSQL_HOST || 'localhost',
  mysqlPort: process.env.MYSQL_PORT || '3306',
  mysqlUsername: process.env.MYSQL_USERNAME || 'konbini',
  mysqlPassword: process.env.MYSQL_PASSWORD || 'konbini',
  mysqlDB: process.env.MYSQL_DB || 'konbini',
};
