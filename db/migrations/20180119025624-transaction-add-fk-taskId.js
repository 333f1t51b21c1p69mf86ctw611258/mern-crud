

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface
    .changeColumn('transactions', 'taskId', {
      type: Sequelize.STRING,
      references: {
        model: 'tasks',
        key: 'id',
      },
      onDelete: 'cascade',
    }),

  down: (queryInterface, Sequelize) => queryInterface
    .changeColumn('transactions', 'taskId', {
      type: Sequelize.STRING,
    }),
};
