const express = require("express");
const carController = require("../controllers/carController");

const router = express.Router();

// routes

router.post("/", carController.createCar);
router.get("/", carController.getAllcars);
router.get("/:id", carController.getCar);
router.patch("/:id", carController.updateCar);
router.delete("/:id", carController.deleteCar);

module.exports = router;
