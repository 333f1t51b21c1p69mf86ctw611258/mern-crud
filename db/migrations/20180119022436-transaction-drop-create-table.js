

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.dropTable('transactions').then(() =>
    queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      transactionRef: Sequelize.STRING,
      telrOrderRef: Sequelize.STRING,
      taskId: {
        type: Sequelize.STRING,
      },
      amount: Sequelize.STRING,
      currency: Sequelize.STRING,
      status: Sequelize.TINYINT,
      telrUrl: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('transactions').then(() =>
    queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      transactionRef: Sequelize.STRING,
      telrOrderRef: Sequelize.STRING,
      taskId: {
        type: Sequelize.STRING,
      },
      amount: Sequelize.STRING,
      currency: Sequelize.STRING,
      status: Sequelize.TINYINT,
      telrUrl: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })),
};
