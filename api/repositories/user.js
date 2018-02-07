const models = require('../models');
const shortid = require('shortid');

module.exports = {
  getById: (id, success, error) => {
    models.users
      .findOne({ where: { id } })
      .then(success)
      .catch(error);
  },
  getAll: (success, error) => {
    models.users
      .findAll({ where: {} })
      .then(success)
      .catch(error);
  },
  create: (user, success, error) => {
    models.users
      .create(user)
      .then((result) => {
        success(result);
      })
      .catch(error);
  },
  update: (user, cbSuccess, error) => {
    models.users.update({
      name: user.name,
      email: user.email,
      age: user.age,
      gender: user.gender,
    }, {
        where: { id: user.id },
      })
      .then(() => {
        models.users
          .findOne({ where: { id: user.id } })
          .then(cbSuccess);
      })
      .catch(error);
  },
  delete: (id, cbSuccess, error) => {
    models.users
      .findOne({ where: { id } })
      .then((old) => {
        models.users.destroy({ where: { id }, individualHooks: true })
          .then(() => {
            cbSuccess(old);
          })
          .catch(error);
      });

  }
};
