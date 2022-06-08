const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
// Load Profile Model
const Profile = require('../schemas/patientprofile');
// Load User Model
const User = require('../schemas/patient');
const TimeSlot = require('../schemas/TimeSlot');
router.post(
  '/',
  [check('DoctorId', 'DoctorId is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // console.log(req.body);
      const doc = req.body.DoctorId;
      let timeSlot = await TimeSlot.findOne({ DoctorId: doc });
      if (timeSlot) {
        return res.json(timeSlot);
      } else {
        new TimeSlot(req.body).save().then((timeSlot) => res.json(timeSlot));
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).send('(Server) User registration  error');
    }
  }
);
router.post(
  '/update',
  [check('DoctorId', 'DoctorId is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // console.log(req.body);
      const doc = req.body.DoctorId;
      const days = req.body.Days;
      let timeSlot = await TimeSlot.findOne({ DoctorId: doc });
      const time = req.body;
      if (timeSlot) {
        TimeSlot.findOneAndUpdate(
          { DoctorId: doc },
          { $set: time },
          { new: true }
        ).then((timeSlot) => res.json(timeSlot));
      } else {
        return res.status(400).json({ errors: [{ msg: 'No Record Found' }] });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).send('(Server) User registration  error');
    }
  }
);
module.exports = router;
