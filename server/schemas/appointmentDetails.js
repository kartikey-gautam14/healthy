const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Slot = mongoose.Schema({
  startTime: String,
  endTime: String,
  status: String, //0(Online),1(Offline),2(Unavailable)
});
const UserSchema = mongoose.Schema({
  PatientId: {
    type: Schema.Types.ObjectId,
    ref: 'patient',
    required: true,
  },
  PatientUsername: {
    type: String,
  },
  DoctorName: {
    type: String,
  },
  DoctorId: {
    type: Schema.Types.ObjectId,
    ref: 'doctor',
    required: true,
  },
  BookingDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
  AppointmentDate: {
    type: Date,
    // required: true,
  },

  TimeSlot: Slot,
  FirstName: {
    type: String,
  },
  LastName: {
    type: String,
  },
  Email: {
    type: String,
  },
  Phone: {
    type: String,
  },
  Age: {
    type: Number,
  },
  Sex: {
    type: String,
  },
  Recipt: {
    type: String,
    // required: true,
  },
  AppointmentMode: {
    type: Number,
    // required: true,
    //choice physical or online
  },
  Symptoms: {
    type: String,
    // required: true,
  },

});

module.exports = mongoose.model('appoinment', UserSchema);