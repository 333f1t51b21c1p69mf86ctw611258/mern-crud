const repositories = require('../repositories');

const express = require('express');
const router = express.Router();
const RateLimit = require('express-rate-limit');
const stringCapitalizeName = require('string-capitalize-name');

// Attempt to limit spam post requests for inserting data
const minutes = 5;
const postLimiter = new RateLimit({
  windowMs: minutes * 60 * 1000, // milliseconds
  max: 100, // Limit each IP to 100 requests per windowMs 
  delayMs: 0, // Disable delaying - full speed until the max limit is reached 
  handler: (req, res) => {
    res.status(429).json({ success: false, msg: `You made too many requests. Please try again after ${minutes} minutes.` });
  }
});

// READ (ONE)
router.get('/:id', (req, res) => {
  repositories.product.getById(req.params.id, (result) => {
    if (result) {
      result.id = result.id;
      res.json(result);
    } else {
      res.status(404).json({ success: false, msg: `No such product.` });
    }
  }, (err) => {
    res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });

    console.error(err);
  });
});

// READ (ALL)
router.get('/', (req, res) => {
  repositories.product.getAll((result) => {
    res.json(result);
  }, (err) => {
    res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });

    console.error(err);
  });
});

router.get('/groupId/:groupId', (req, res) => {
  const groupId = req.params.groupId;
  repositories.product.getByGroupId(groupId, (result) => {
    res.json(result);
  }, (err) => {
    res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });

    console.error(err);
  });
});

// CREATE
router.post('/', postLimiter, (req, res) => {

  let newProduct = {
    groupId: req.body.groupId,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    picture: req.body.picture,
    quantity: req.body.quantity,
  };

  repositories.product.create(newProduct, (result) => {
    res.json({
      success: true,
      msg: `Successfully added!`,
      result: {
        id: result.id,
        groupId: result.groupId,
        name: result.name,
        description: result.description,
        price: result.price,
        picture: result.picture,
        quantity: result.quantity,
      }
    });
  }, (err) => {
    // Show failed if all else fails for some reasons
    res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });

    console.error(err);
  });
});

// UPDATE
router.put('/:id', (req, res) => {
  let updatedProduct = {
    id: req.params.id,
    groupId: req.body.groupId,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    picture: req.body.picture,
    quantity: req.body.quantity,
  };

  repositories.product.update(updatedProduct, (result) => {
    res.json({
      success: true,
      msg: `Successfully updated!`,
      result: {
        id: result.id,
        groupId: result.groupId,
        name: result.name,
        description: result.description,
        price: result.price,
        picture: result.picture,
        quantity: result.quantity,
      }
    });
  }, (err) => {
    // Show failed if all else fails for some reasons
    res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });

    console.error(err);
  });
});

// DELETE
router.delete('/:id', (req, res) => {
  repositories.product.delete(req.params.id, (result) => {
    res.json({
      success: true,
      msg: `It has been deleted.`,
      result: {
        id: result.id,
        groupId: result.groupId,
        name: result.name,
        description: result.description,
        price: result.price,
        picture: result.picture,
        quantity: result.quantity,
      }
    });
  }, (err) => {
    res.status(404).json({ success: false, msg: 'Nothing to delete.' });

    console.error(err);
  });
});

// UPDATE
router.put('/buy/:id', (req, res) => {
  const id = req.params.id;
  repositories.product.buy(id, (result) => {
    res.json({
      success: true,
      msg: `Successfully updated!`,
      result: {
        id: result.id,
        groupId: result.groupId,
        name: result.name,
        description: result.description,
        price: result.price,
        picture: result.picture,
        quantity: result.quantity,
      }
    });
  }, (err) => {
    // Show failed if all else fails for some reasons
    res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });

    console.error(err);
  });
});

module.exports = router;
