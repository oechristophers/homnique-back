const crypto = require("crypto");
const bcrypt = require("bcryptjs");
//const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
const UserModel = require("../models/UserModel");
require("dotenv").config();

// Send email with credentials
async function sendCredentials(email, username, password) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Login Credentials",
    html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
              <h2 style="color: #007bff; text-align: center;">Welcome to Our Platform!</h2>
              <p style="font-size: 16px; color: #333;">Dear <strong>${username}</strong>,</p>
              <p style="font-size: 16px; color: #333;">Your account has been created successfully. Below are your login details:</p>
              
              <div style="background: #f4f4f4; padding: 15px; border-radius: 5px;">
                <p><strong>Username:</strong> ${username}</p>
                <p><strong>Password:</strong> ${password}</p>
              </div>
      
              <p style="font-size: 16px; color: #333;">Please change your password after logging in for security reasons.</p>
              
              <a href="https://hominique-test.vercel.app/auth/sign-in"  
                 style="display: block; text-align: center; padding: 10px 20px; background-color: #007bff; color: #fff; 
                 text-decoration: none; border-radius: 5px; font-size: 16px; margin-top: 20px;">
                 Login Now
              </a>
      
              <p style="font-size: 14px; color: #777; text-align: center; margin-top: 20px;">If you have any issues, contact support.</p>
            </div>
          `,
  };

  await transporter.sendMail(mailOptions);
}

// Generate and save User Credentials
const generateUserCredentials = async (req, res) => {
  const { email, role } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists",
        error: true,
        success: false,
      });
    }

    //Generate username from email
    const username = email.split("@")[0]; // Extract username from email
    if (!username) {
      return res.status(400).json({
        message: "Invalid email format",
        error: true,
        success: false,
      });
    }

    // Generate random password
    const password = crypto.randomBytes(8).toString("hex");
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new User
    const newUser = new UserModel({
      userId: crypto.randomBytes(6).toString("hex"), // Generate unique userId
      username: username,
      email: email,
      password: hashedPassword,
      role: role,
    });
    await newUser.save();

    // Send credentials to user's email
    await sendCredentials(email, username, password);

    res.status(201).json({
      message: "User credentials generated and sent to email",
      error: false,
      username,
      password,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = generateUserCredentials;
