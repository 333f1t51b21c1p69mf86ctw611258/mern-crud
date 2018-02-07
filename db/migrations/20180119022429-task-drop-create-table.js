module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.dropTable('tasks').then(() =>
    queryInterface.createTable('tasks', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      amount: Sequelize.STRING,
      currency: Sequelize.STRING,
      description: Sequelize.STRING,
      callbackUrl: Sequelize.STRING,
      extra: Sequelize.JSON,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('tasks').then(() =>
    queryInterface.createTable('tasks', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      amount: Sequelize.STRING,
      currency: Sequelize.STRING,
      description: Sequelize.STRING,
      callbackUrl: Sequelize.STRING,
      extra: Sequelize.JSON,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })),
};
