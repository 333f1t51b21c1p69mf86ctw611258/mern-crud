const models = require('../models');

module.exports = {
  getById: (id, cbSuccess, cbError) => {
    models.product_group
      .findOne({ where: { id } })
      .then(cbSuccess)
      .catch(cbError);
  },
  getAll: (cbSuccess, cbError) => {
    models.product_group
      .findAll({ where: {} })
      .then(cbSuccess)
      .catch(cbError);
  },
  create: (product_group, cbSuccess, cbError) => {
    models.product_group
      .create(product_group)
      .then((result) => {
        cbSuccess(result);
      })
      .catch(cbError);
  },
  update: (product_group, cbSuccess, cbError) => {
    models.product_group.update({
      code: product_group.code,
      name: product_group.name,
    }, {
        where: { id: product_group.id },
      })
      .then(() => {
        models.product_group
          .findOne({ where: { id: product_group.id } })
          .then(cbSuccess);
      })
      .catch(cbError);
  },
  delete: (id, cbSuccess, cbError) => {
    models.product_group
      .findOne({ where: { id } })
      .then((old) => {
        models.product_group.destroy({ where: { id }, individualHooks: true })
          .then(() => {
            cbSuccess(old);
          })
          .catch(cbError);
      });
  }
};
