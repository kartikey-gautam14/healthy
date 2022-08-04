const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
// Load Profile Model
const Profile = require('../schemas/doctorProfile');
// Load User Model
const User = require('../schemas/doctor');
const diagnosis = require('../schemas/diagnosis');
// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post('/fetch', auth, async (req, res) => {
  const data = {};
  console.log('fetch', req.body);
  if (req.body.AppointmentId) {
    data.AppointmentId = req.body.AppointmentId;
  }
  var objectId = mongoose.Types.ObjectId(data.AppointmentId);
  console.log('fetch', objectId);
  diagnosis
    .findOne({ AppointmentId: objectId })
    .then((diag) => {
      // console.log(diag);
      if (diag) res.json(diag);
      else res.status(404).json({ msg: 'No data found' });
    })
    .catch((err) => res.status(500).json({ msg: 'No data found' }));
});
router.post('/update', auth, (req, res) => {
  const fields = {};
  var objectId = mongoose.Types.ObjectId(req.body.AppointmentId);

  fields.AppointmentId = objectId;
  fields.Diagnosis = req.body.Diagnosis;
  console.log('update', req.body);
  // diagnosis
  //   .findOneAndUpdate(
  //     { AppointmentId: objectId },
  //     { $set: fields },
  //     { new: true }
  //   )
  //   .then((temp) => res.json(temp));
  diagnosis.findOne({ AppointmentId: objectId }).then((diag) => {
    if (diag) {
      // Updatene
      console.log(diag);
      diagnosis
        .findOneAndUpdate(
          { AppointmentId: objectId },
          { $set: fields },
          { new: true }
        )
        .then((item) => res.json(item))
        .catch((err) => console.log(err));
    } else {
      // Create
      // Save Profile
      // diagnosis.findOne({ AppointmentId: objectId }).then((temp) => {
      // Save Profile
      new diagnosis(fields)
        .save()
        .then((item) => {
          console.log(item);
          res.json(item);
        })
        .catch((err) => console.log(err));
      // });
    }
  });
});
module.exports = router;
