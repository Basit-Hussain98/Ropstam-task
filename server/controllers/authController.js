const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/userModel");

exports.signup = async (req, res) => {
  try {
    // Getting user input.
    const { name, email, password } = req.body;
    // Validating user input.
    if (!name || !email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "All fields are required",
      });
    }
    // Validating if the user already exists.
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(409).json({
        status: "fail",
        message: "User already exists.Please login!   ",
      });
    }
    // Encrypting the user password.

    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating a user in our database.

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Creating token

    const token = jwt.sign({ user_id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });

    // send welcome email
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      service: "gmail",
      auth: {
        user: process.env.EMAIL_SERVER,
        pass: process.env.PASSWORD,
      },
    });

    await transporter.sendMail(
      {
        from: process.env.EMAIL_SERVER,
        to: email,
        subject: "Welcome to MyApp",
        text: `Hi ${name}, thank you for signing up for MyApp!`,
      },
      function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      }
    );

    // return new user and token

    return res.status(201).json({
      status: "success",
      user,
      token,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    // Getting user input.
    const { email, password } = req.body;
    // Validating user input.
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "All fields are required",
      });
    }
    // Validating if the user already exists.
    const user = await User.findOne({ email: email });

    // Verify user password.

    if (user && (await bcrypt.compare(password, user.password))) {
      // Creating token
      const token = jwt.sign({ user_id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "2h",
      });

      return res.status(200).json({
        status: "success",
        user,
        token,
      });
    }
    res.status(400).json({
      status: "fail",
      message: "Invalid credentials ",
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
