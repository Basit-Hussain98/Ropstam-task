const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
require("./config/dbConnect");
const userRouter = require("./routes/userRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const carRouter = require("./routes/carRoutes");

const app = express();

// middlewares

app.use(express.json());
app.use(cors());

// routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/cars", carRouter);

// server
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
