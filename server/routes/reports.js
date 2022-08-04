const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
// Load Profile Model
const Profile = require('../schemas/patientprofile');
// Load User Model
const User = require('../schemas/patient');
const filedown = require('./file_download');
// @route   Get api/prescriptions
// @desc   get precription
// @access  Private
router.get('/', auth, (req, res) => {
  Profile.findOne({ user: req.user }).then((profile) =>
    // console.log(profile.prescriptions)
    {
      //  console.log(profile.Prescription);
      res.json(profile.LabReport);
    }
  );
});
// @route   Post api/prescriptions
// @desc   get precription
// @access  Private
router.post('/', auth, (req, res) => {
  const index = req.headers.index;
  Profile.findOne({ user: req.user }).then((profile) =>
    // console.log(profile.prescriptions)
    {
      req.params.name = profile.LabReport[index].url;
      //console.log(profile);
      //  console.log(profile.Prescription);
      filedown.download(req, res);
    }
  );
});

module.exports = router;
