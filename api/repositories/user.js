const models = require('../models');

module.exports = {
  getById: (id, cbSuccess, cbError) => {
    models.users
      .findOne({ where: { id } })
      .then(cbSuccess)
      .catch(cbError);
  },
  getAll: (cbSuccess, cbError) => {
    models.users
      .findAll({ where: {} })
      .then(cbSuccess)
      .catch(cbError);
  },
  create: (user, cbSuccess, cbError) => {
    models.users
      .create(user)
      .then((result) => {
        cbSuccess(result);
      })
      .catch(cbError);
  },
  update: (user, cbSuccess, cbError) => {
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
      .catch(cbError);
  },
  delete: (id, cbSuccess, cbError) => {
    models.users
      .findOne({ where: { id } })
      .then((old) => {
        models.users.destroy({ where: { id }, individualHooks: true })
          .then(() => {
            cbSuccess(old);
          })
          .catch(cbError);
      });
  }
};
