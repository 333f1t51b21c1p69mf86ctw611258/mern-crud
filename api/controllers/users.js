const repositories = require('../repositories');

const express = require('express');
const router = express.Router();
const RateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const stringCapitalizeName = require('string-capitalize-name');

const User = require('../../models/user');

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
  repositories.user.getById(req.params.id, (result) => {
    if (result) {
      result.id = result.id;
      res.json(result);
    } else {
      res.status(404).json({ success: false, msg: `No such user.` });
    }
  }, (err) => {
    res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
  });
});

// READ (ALL)
router.get('/', (req, res) => {
  repositories.user.getAll((result) => {
    res.json(result);
  }, (err) => {
    res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
  });
});

// CREATE
router.post('/', postLimiter, (req, res) => {

  // Validate the age
  let age = sanitizeAge(req.body.age);
  if (age < 5 && age != '') return res.status(403).json({ success: false, msg: `You're too young for this.` });
  else if (age > 130 && age != '') return res.status(403).json({ success: false, msg: `You're too old for this.` });

  let newUser = {
    name: sanitizeName(req.body.name),
    email: sanitizeEmail(req.body.email),
    age: sanitizeAge(req.body.age),
    gender: sanitizeGender(req.body.gender)
  };

  repositories.user.create(newUser, (result) => {
    res.json({
      success: true,
      msg: `Successfully added!`,
      result: {
        id: result.id,
        name: result.name,
        email: result.email,
        age: result.age,
        gender: result.gender
      }
    });
  }, (err) => {
    if (err.errors) {
      if (err.errors.name) {
        res.status(400).json({ success: false, msg: err.errors.name.message });
        return;
      }
      if (err.errors.email) {
        res.status(400).json({ success: false, msg: err.errors.email.message });
        return;
      }
      if (err.errors.age) {
        res.status(400).json({ success: false, msg: err.errors.age.message });
        return;
      }
      if (err.errors.gender) {
        res.status(400).json({ success: false, msg: err.errors.gender.message });
        return;
      }
      // Show failed if all else fails for some reasons
      res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
    }
  });
});

// UPDATE
router.put('/:id', (req, res) => {

  // Validate the age
  let age = sanitizeAge(req.body.age);
  if (age < 5 && age != '') return res.status(403).json({ success: false, msg: `You're too young for this.` });
  else if (age > 130 && age != '') return res.status(403).json({ success: false, msg: `You're too old for this.` });

  let updatedUser = {
    name: sanitizeName(req.body.name),
    email: sanitizeEmail(req.body.email),
    age: sanitizeAge(req.body.age),
    gender: sanitizeGender(req.body.gender)
  };

  repositories.user.update(updatedUser, (result) => {
    res.json({
      success: true,
      msg: `Successfully updated!`,
      result: {
        id: result.id,
        name: result.name,
        email: result.email,
        age: result.age,
        gender: result.gender
      }
    });
  }, (err) => {
    if (err.errors) {
      if (err.errors.name) {
        res.status(400).json({ success: false, msg: err.errors.name.message });
        return;
      }
      if (err.errors.email) {
        res.status(400).json({ success: false, msg: err.errors.email.message });
        return;
      }
      if (err.errors.age) {
        res.status(400).json({ success: false, msg: err.errors.age.message });
        return;
      }
      if (err.errors.gender) {
        res.status(400).json({ success: false, msg: err.errors.gender.message });
        return;
      }
      // Show failed if all else fails for some reasons
      res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
    }
  });
});

// DELETE
router.delete('/:id', (req, res) => {
  repositories.user.delete(req.params.id, (result) => {
    res.json({
      success: true,
      msg: `It has been deleted.`,
      result: {
        id: result.id,
        name: result.name,
        email: result.email,
        age: result.age,
        gender: result.gender
      }
    });
  }, (err) => {
    res.status(404).json({ success: false, msg: 'Nothing to delete.' });
  });
});

module.exports = router;

// Minor sanitizing to be invoked before reaching the database
sanitizeName = (name) => {
  return stringCapitalizeName(name);
}
sanitizeEmail = (email) => {
  return email.toLowerCase();
}
sanitizeAge = (age) => {
  // Return empty if age is non-numeric
  if (isNaN(age) && age != '') return '';
  return (age === '') ? age : parseInt(age);
}
sanitizeGender = (gender) => {
  // Return empty if it's neither of the two
  return (gender === 'm' || gender === 'f') ? gender : '';
}
