module.exports = {
  mysqlHost: process.env.MYSQL_HOST || 'localhost',
  mysqlPort: process.env.MYSQL_PORT || '3306',
  mysqlUsername: process.env.MYSQL_USERNAME || 'konbini',
  mysqlPassword: process.env.MYSQL_PASSWORD || 'konbini',
  mysqlDB: process.env.MYSQL_DB || 'konbini',
};
