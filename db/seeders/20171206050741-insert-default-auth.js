module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('auths', [{
    id: 1,
    token: 'db97ba83db4d948a9d716f517dd840a6cca9fd8d',
    owner: 'test',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('auths', null, {}),
};
