const Car = require("../models/CarModel");

// Get All Cars
exports.getAllcars = async (req, res) => {
  try {
    const { categoryName } = req.body;
    if (categoryName) {
      const cars = await Car.find({ categoryName });
      if (cars) {
        res.status(200).json({
          status: "success",
          results: cars.length,
          data: {
            cars,
          },
        });
      } else {
        res.status(404).json({
          status: "fail",
          message: "Car not found",
        });
      }
    } else {
      // Filtering
      // query for filtering
      const queryObj = { ...req.query };

      // excluding these elements of array from queryObj
      const excludedFields = ["sort", "page", "limit", "fields"];

      excludedFields.forEach((el) => delete queryObj[el]);

      // Advance filtering

      // converting object to string
      let queryStr = JSON.stringify(queryObj);
      // replacing gt/gte/lt/lte with $gt/$gte/$lt/$lte
      queryStr = queryStr.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );

      let query = Car.find(JSON.parse(queryStr));

      // Sorting

      if (req.query.sort) {
        // split(,).join(' ')=>splits the string into array of substring and then join return that array as string with space
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
      }

      // execute query
      const cars = await query;

      // const cars = await Car.find({});

      res.status(200).json({
        status: "success",
        results: cars.length,
        data: {
          cars,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
// Create Car
exports.createCar = async (req, res) => {
  try {
    const car = await Car.create(req.body);
    res.status(201).json({
      status: "success",
      message: "Car created successfully",
      data: {
        car,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get single car
exports.getCar = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findOne({ _id: id });
    if (!car) {
      return res.status(404).json({
        status: "fail",
        message: "Car not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        car,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Update car
exports.updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!car) {
      return res.status(404).json({
        status: "fail",
        message: "Car not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        car,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Delete car
exports.deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findOneAndDelete({ _id: id });
    if (!car) {
      return res.status(404).json({
        status: "fail",
        message: "Car not found",
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
