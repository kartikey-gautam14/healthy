const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/keys');
const Appointment = require('../schemas/appointmentDetails');
const auth = require('../middleware/auth');
const Doctor = require('../schemas/doctor');
const DoctorProfile = require('../schemas/doctorProfile');

// @route  POST /login
// @desc   Test route
// @access Public
router.get('/', auth, async (req, res) => {
  const doctorId = req.user;
  const appointments = await Appointment.find({ DoctorId: doctorId })
    .sort('AppointmentDate')
    .sort('TimeSlot.startTime');
  return res.json(appointments);
});

// getTheAppointmetDetails
router.get('/getAppointDetails', auth, async (req, res) => {
  const patientId = req.user;
  // console.log(patientId);
  Appointment.find({ PatientId: patientId })
    .populate('DoctorId', ['Name'])
    .then((appointments) => {
      // console.log(appointments);
      res.json(appointments);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errors: [{ msg: 'Server Request Error' }] });
    });
});
module.exports = router;
