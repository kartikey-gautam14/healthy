const express = require('express');
const AppointmentDetails = require('../schemas/appointmentDetails');
const router = express.Router();
const TimeSlot = require('../schemas/TimeSlot');
const auth = require('../middleware/auth');
router.post('/', auth, async (req, res) => {
  console.log(req.body);
  const d = req.body.date;
  const from = d.split('-');
  const date = new Date(from[0], from[1] - 1, from[2]);
  console.log(date);
  const docId = req.body.DoctorId;
  const day = date.getDay();

  let timeSlot = await TimeSlot.findOne({ DoctorId: docId });
  if (timeSlot) {
    console.log(day);
    const slotTemp = timeSlot.Days;

    const slots = slotTemp[day].slots;
    // console.log(slots);
    let bookedSlots = await AppointmentDetails.find({
      DoctorId: docId,
      AppointmentDate: d,
    });
    // console.log(bookedSlots);
    for (let index = 0; index < bookedSlots.length; index++) {
      for (let i = 0; i < slots.length; i++) {
        // console.log(slots[i]._id, bookedSlots[index].TimeSlot._id);
        if (slots[i].startTime == bookedSlots[index].TimeSlot.startTime) {
          // console.log('hello');
          slots[i].status = '2';
          break;
        }
      }
      // const i = slots.indexOf(bookedSlots[index].TimeSlot);
      // console.log(i);
      // if (i > -1) {
      //   slots[i].status = '2';
      // }
    }
    return res.json(slots);
  } else {
    return res.status(400).json({ errors: [{ msg: 'No such doctor found' }] });
  }
  // get the time slot of doctor
});
module.exports = router;
