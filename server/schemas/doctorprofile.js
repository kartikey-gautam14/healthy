const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'doctor',
    required: true,
  },
  Name: {
    type: String,
  },
  Address: {
    type: String,
  },
  Gender: {
    type: String,
  },
  Pincode: {
    type: String,
  },
  City: {
    type: String,
  },
  State: {
    type: String,
  },
  PhoneNumber: {
    type: String,
  },
  Specialisation: {
    type: String,
  },
  Degree: {
    type: String,
  },
});

module.exports = mongoose.model('doctorProfile', UserSchema);
