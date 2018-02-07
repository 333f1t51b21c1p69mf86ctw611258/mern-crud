module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.dropTable('transaction_details').then(() =>
    queryInterface.createTable('transaction_details', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      transactionId: {
        type: Sequelize.STRING,
      },
      description: Sequelize.STRING,
      extra: Sequelize.JSON,
      cancelledReason: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('transaction_details').then(() =>
    queryInterface.createTable('transaction_details', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      transactionId: {
        type: Sequelize.STRING,
      },
      description: Sequelize.STRING,
      extra: Sequelize.JSON,
      cancelledReason: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })),
};
