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
  repositories.product_group.getById(req.params.id, (result) => {
    if (result) {
      result.id = result.id;
      res.json(result);
    } else {
      res.status(404).json({ success: false, msg: `No such product_group.` });
    }
  }, (err) => {
    res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });

    console.error(err);
  });
});

// READ (ALL)
router.get('/', (req, res) => {
  repositories.product_group.getAll((result) => {
    res.json(result);
  }, (err) => {
    res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });

    console.error(err);
  });
});

// CREATE
router.post('/', postLimiter, (req, res) => {
  let newProduct_group = {
    code: req.body.code,
    name: req.body.name,
  };

  repositories.product_group.create(newProduct_group, (result) => {
    res.json({
      success: true,
      msg: `Successfully added!`,
      result: {
        id: result.id,
        code: result.code,
        name: result.name,
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
  let updatedProduct_group = {
    id: req.params.id,
    code: req.body.code,
    name: req.body.name,
  };

  repositories.product_group.update(updatedProduct_group, (result) => {
    res.json({
      success: true,
      msg: `Successfully updated!`,
      result: {
        id: result.id,
        code: result.code,
        name: result.name,
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
  repositories.product_group.delete(req.params.id, (result) => {
    res.json({
      success: true,
      msg: `It has been deleted.`,
      result: {
        id: result.id,
        code: result.code,
        name: result.name,
      }
    });
  }, (err) => {
    res.status(404).json({ success: false, msg: 'Nothing to delete.' });

    console.error(err);
  });
});

module.exports = router;
