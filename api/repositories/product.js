const models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  getById: (id, cbSuccess, cbError) => {
    models.product
      .findOne({ where: { id } })
      .then(cbSuccess)
      .catch(cbError);
  },
  getAll: (cbSuccess, cbError) => {
    models.product
      .findAll({
        where: {}, order: [['groupId', 'DESC']]
      })
      .then(cbSuccess)
      .catch(cbError);
  },
  getByGroupId: (groupId, cbSuccess, cbError) => {
    models.product
      .findAll({
        where: { groupId, quantity: { [Op.gt]: 0 } }
      })
      .then(cbSuccess)
      .catch(cbError);
  },
  create: (product, cbSuccess, cbError) => {
    models.product
      .create(product)
      .then((result) => {
        cbSuccess(result);
      })
      .catch(cbError);
  },
  update: (product, cbSuccess, cbError) => {
    models.product.update({
      groupId: product.groupId,
      name: product.name,
      description: product.description,
      price: product.price,
      picture: product.picture,
      quantity: product.quantity,
    }, {
        where: { id: product.id },
      })
      .then(() => {
        models.product
          .findOne({ where: { id: product.id } })
          .then(cbSuccess);
      })
      .catch(cbError);
  },
  delete: (id, cbSuccess, cbError) => {
    models.product
      .findOne({ where: { id } })
      .then((old) => {
        models.product.destroy({ where: { id }, individualHooks: true })
          .then(() => {
            cbSuccess(old);
          })
          .catch(cbError);
      });
  },
  buy: (id, cbSuccess, cbError) => {
    models.product
      .findOne({ where: { id } })
      .then((old) => {
        models.product.update({
          quantity: old.quantity - 1,
        }, {
            where: { id },
          })
          .then(() => {
            models.product
              .findOne({ where: { id } })
              .then(cbSuccess);
          })
          .catch(cbError);
      });
  },
};
