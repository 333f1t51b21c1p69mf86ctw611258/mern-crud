'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('product_groups', [{
      code: 'group001',
      name: 'Group 001',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      code: 'group002',
      name: 'Group 002',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      code: 'group003',
      name: 'Group 003',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      code: 'group004',
      name: 'Group 004',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      code: 'group005',
      name: 'Group 005',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      code: 'group006',
      name: 'Group 006',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      code: 'group007',
      name: 'Group 007',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      code: 'group008',
      name: 'Group 008',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      code: 'group009',
      name: 'Group 009',
      createdAt: new Date(),
      updatedAt: new Date(),
    },], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('product_groups', null, {});
  }
};
