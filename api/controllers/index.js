const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/product_groups', require('./product_group'));
router.use('/products', require('./product'));

module.exports = router;
