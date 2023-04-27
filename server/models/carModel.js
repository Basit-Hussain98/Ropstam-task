const mongoose = require("mongoose");
const carSchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
    trim: true,
  },
  model: {
    type: String,
    required: true,
    trim: true,
  },
  make: {
    type: String,
    required: true,
    trim: true,
  },
  registrationNo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

const Car = mongoose.model("Car", carSchema);
module.exports = Car;
