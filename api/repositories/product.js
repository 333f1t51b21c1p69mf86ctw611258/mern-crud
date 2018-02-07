const models = require('../models');

module.exports = {
  getById: (id, cbSuccess, cbError) => {
    models.product
      .findOne({ where: { id } })
      .then(cbSuccess)
      .catch(cbError);
  },
  getAll: (cbSuccess, cbError) => {
    models.product
      .findAll({ where: {} })
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
  }
};
