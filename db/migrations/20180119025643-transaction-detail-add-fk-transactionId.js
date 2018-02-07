module.exports = {
  up: (queryInterface, Sequelize) => queryInterface
    .changeColumn('transaction_details', 'transactionId', {
      type: Sequelize.STRING,
      references: {
        model: 'transactions',
        key: 'id',
      },
      onDelete: 'cascade',
    }),

  down: (queryInterface, Sequelize) => queryInterface
    .changeColumn('transaction_details', 'transactionId', {
      type: Sequelize.STRING,
    }),
};
