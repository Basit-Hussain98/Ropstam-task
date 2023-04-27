const Category = require("../models/categoryModel");

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({
      status: "success",
      results: categories.length,
      data: {
        categories,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
// Create category
exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({
      status: "success",
      message: "Category created successfully",
      data: {
        category,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get single category
exports.getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({ _id: id });
    if (!category) {
      return res.status(404).json({
        status: "fail",
        message: "Category not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        category,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Update category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!category) {
      return res.status(404).json({
        status: "fail",
        message: "Category not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        category,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Delete catyegory
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOneAndDelete({ _id: id });
    if (!category) {
      return res.status(404).json({
        status: "fail",
        message: "Category not found",
      });
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
