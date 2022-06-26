const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
// Load Profile Model
const Profile = require('../schemas/doctorProfile');
// Load User Model
const User = require('../schemas/doctor');
const preliminaryDiagnosis = require('../schemas/preliminaryDiagnosis');
// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post('/check', auth, (req, res) => {
  const data = {};
  if (req.body.AppointmentId) {
    data.AppointmentId = req.body.AppointmentId;
  }
  var objectId = mongoose.Types.ObjectId(data.AppointmentId);
  // console.log('preliminary', req.body);
  preliminaryDiagnosis
    .findOne({ AppointmentId: objectId })
    .then((diag) => {
      // console.log(diag);
      if (diag) res.json(diag);
      else res.status(404).json({ msg: 'No data found' });
    })
    .catch((err) => res.status(500).json({ msg: 'No data found' }));
});
router.post('/submit', auth, async (req, res) => {
  console.log(req.body);
  console.log(req.body.appointmentId);
  var objectId = mongoose.Types.ObjectId(req.body.appointmentId);

  const packet = new preliminaryDiagnosis({
    AppointmentId: objectId,
    Diagnosis: req.body.questions,
    Evidence: req.body.evidence,
    Triage: req.body.triage,
    Specialist: req.body.specialist,
    Explain: req.body.explain,
  });
  console.log(packet);
  await packet.save();
});

module.exports = router;
