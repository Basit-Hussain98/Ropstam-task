const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
