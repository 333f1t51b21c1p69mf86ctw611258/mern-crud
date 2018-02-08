'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let arr = [];
    for (let index = 0; index < 100; index++) {
      arr.push({
        name: 'Product 00' + index,
        description: 'product00' + index,
        price: 123.456,
        quantity: 123 - index,
        groupId: (index % 9) + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    return queryInterface.bulkInsert('products', arr, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('products', null, {});
  }
};
