const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
// Load User Model
const User = require('../schemas/patient');

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  '/',
  auth,
  (req, res) => {
    const errors = {};
    User.findOne({ _id: req.user }).then((data) => {
      //console.log(data);
      res.json(data);
    });
  }
  // console.log(req.user);
  // res.json(req.user);
);

module.exports = router;
