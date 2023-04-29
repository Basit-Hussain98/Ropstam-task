const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  // id: {
  //   type: String,
  // },
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
