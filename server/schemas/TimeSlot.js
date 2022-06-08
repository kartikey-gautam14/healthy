const mongoose = require('mongoose');
// const Slot = require('./Slot');
const Slot = mongoose.Schema({
  startTime: String,
  endTime: String,
  status: String, //0(Online),1(Offline),2(Unavailable)
});
const TimeSlotSchema = mongoose.Schema({
  DoctorId: {
    type: String,
    required: true,
  },
  Days: [
    {
      dayId: String,
      text: String,
      slots: [
        {
          startTime: String,
          endTime: String,
          status: String,
        },
      ],
    },
  ],
});

module.exports = mongoose.model('timeSlot', TimeSlotSchema);
