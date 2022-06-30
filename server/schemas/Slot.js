const mongoose = require('mongoose');
const SlotSchema = mongoose.Schema({
  startTime: String,
  endTime: String,
});
module.exports = mongoose.model('slot', SlotSchema);
