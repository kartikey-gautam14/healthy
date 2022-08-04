const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/keys');
const Appointment = require('../schemas/appointmentDetails');
const auth = require('../middleware/auth');
const Doctor = require('../schemas/doctor');
const DoctorProfile = require('../schemas/doctorProfile');
const axios = require('axios');
const User = require('../schemas/patient');
// @route  POST /login
// @desc   Test route
// @access Public
router.post('/book', auth, async (req, res) => {
  try {
    console.log(req.body);
    const patientId = req.user;
    const doctorId = req.body.doctorId;
    const date = req.body.date;
    const timeSlot = req.body.timeSlot;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const phone = req.body.phone;
    const age = req.body.age;
    const sex = req.body.sex;
    const appointMode = timeSlot.status === '0' ? 0 : 1;
    const name = req.body.name;
    var username = '';
    await User.findOne({ _id: req.user }).then((data) => {
      //console.log(data);
      username = data.Username;
    });
    console.log(username);
    const appointment = new Appointment({
      PatientId: patientId,
      DoctorId: doctorId,
      DoctorName: name,
      AppointmentDate: date,
      TimeSlot: timeSlot,
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Phone: phone,
      AppointmentMode: appointMode,
      Age: age,
      Sex: sex,
      PatientUsername: username,
    });
    var flag = 1;
    let app = await Appointment.findOne({
      PatientId: patientId,
      DoctorId: doctorId,
    });
    if (app) {
      flag = 0;
    }
    await appointment.save();
    console.log('Appointment Booked');
    if (flag == 1) {
      var doctorusername, patientusername, patientpassword;
      await User.findOne({ _id: req.user }).then((data) => {
        // console.log(data);
        patientusername = data.Username;
        patientpassword = data.Password;
      });
      await Doctor.findOne({ _id: doctorId }).then((data) => {
        // console.log(data);
        doctorusername = data.Username;
      });
      console.log(doctorusername, patientusername, patientpassword);
      var chatid;
      await axios
        .post(
          'https://api.chatengine.io/chats/',
          {
            is_direct_chat: true,
          },
          {
            headers: {
              'Project-ID': process.env.CHAT_ENGINE_PROJECT_ID,
              'User-Name': patientusername,
              'User-Secret': patientpassword,
            },
          }
        )
        .then((res) => {
          chatid = res.data.id;
          console.log(res.data.id);
        })
        .catch((err) => {
          console.log('Error in creating chat');
        });
      // console.log(chatid);
      var url = 'https://api.chatengine.io/chats/' + chatid + '/people/';
      console.log(url);
      await axios
        .post(
          url,
          {
            username: doctorusername,
          },
          {
            headers: {
              'Project-ID': process.env.CHAT_ENGINE_PROJECT_ID,
              'User-Name': patientusername,
              'User-Secret': patientpassword,
            },
          }
        )
        .then((res) => {
          //  chatid = res.data;
          // console.log(res);
          console.log('successfully added doctor to chat');
        })
        .catch((err) => {
          console.log('error in adding doctor to chat');
        });
    }
    res.send('Appointment Booked');
  } catch (error) {
    console.log(error);
    res.status(500).send('(Server) appointment insert error');
  }
});
router.get('/', auth, async (req, res) => {
  const patientId = req.user;
  const appointments = await Appointment.find({ PatientId: patientId });
  return res.json({ appointments: appointments });
});
router.post(
  '/fetch',
  [
    check('Type', 'Type Recuired').not().isEmpty(),
    check('Id', 'Id Recuired').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const type = req.body.Type;
    if (type === 'doctor') {
      const doctorId = req.body.Id;
      const appointments = await Appointment.find({ DoctorId: doctorId });
      return res.json({ appointments: appointments });
    } else {
      const patientId = req.body.Id;
      const appointments = await Appointment.find({ PatientId: patientId });
      return res.json({ appointments: appointments });
    }
  }
);
router.post(
  '/update',
  [check('Id', 'Id Recuired').not().isEmpty()],
  async (req, res) => {
    const Id = req.body.Id;
    const filter = { _id: Id };
    const query = req.body;

    delete query.Id;

    const update = {
      query,
    };
    console.log(query, filter, update);
    try {
      let result = await Appointment.findOneAndUpdate(filter, query, {
        new: true,
      });
      console.log(result);
      return res.send('Appointment update successful');
    } catch (error) {
      console.log(error);
      return res.status(500).send('(Server) Appointment update error');
    }
  }
);
router.post('/delete', auth, async (req, res) => {
  // console.log(req.body,)
  const Id = req.body.Id;
  const filter = { _id: Id };

  // console.log(query, filter, update);
  try {
    let result = await Appointment.findOneAndDelete(filter);
    // console.log(result);
    return res.send('Appointment delete successful');
  } catch (error) {
    console.log(error);
    return res.status(500).send('(Server) Appointment update error');
  }
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
router.get('/getDoctorsList', auth, async (req, res) => {
  DoctorProfile.find()
    .populate('user', ['Name'])
    .then((doctors) => {
      // console.log(doctors);
      res.json(doctors);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errors: [{ msg: 'Server Request Error' }] });
    });
});
module.exports = router;
