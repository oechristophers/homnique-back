const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const UserModel = require("../../models/UserModel");
const StaffProfile = require("../../models/StaffProfileModel");
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
              
              <a href="https://homnique-test.vercel.app/auth/sign-in"   
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

// Create Staff Profile Controller
const createStaffProfileController = async (req, res) => {
  const {
    loginEmail,
    firstName,
    lastName,
    username,
    nationality,
    gender,
    country,
    city,
    role,
    specialization,
    startDate,
    yearsofExperience,
    status,
    inviteEmail,
    licenseId,
    language,
    timeZone,
  } = req.body;

  try {
    // Get uploaded files
    const profileImage = req.files["profileImage"]
      ? req.files["profileImage"][0].path
      : null;

    const certifications = req.files["certifications"]
      ? req.files["certifications"].map((file) => file.path)
      : [];

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email: inviteEmail });
    if (existingUser) {
      return res.status(409).json({
        message: "User with this email already exists",
        error: true,
        success: false,
      });
    }

    // Generate username from email if not provided
    const generatedUsername = username || inviteEmail.split("@")[0];

    // Generate random password for the user
    const password = crypto.randomBytes(8).toString("hex");
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new User
    const newUser = new UserModel({
      userId: crypto.randomBytes(6).toString("hex"),
      profileImage: req.body.profileImage || "", // Optional field
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: generatedUsername,
      gender: req.body.gender,
      country: req.body.country,
      city: req.body.city,
      phoneNumber: req.body.phoneNumber || "", // Optional field
      email: inviteEmail,
      password: hashedPassword,
      role: role,
    });

    await newUser.save();

    // Create the Staff Profile
    const newStaffProfile = new StaffProfile({
      loginEmail,
      firstName,
      lastName,
      username,
      gender,
      country,
      nationality,
      city,
      role,
      specialization,
      profileImage:newUser.profileImage, // Save uploaded image path
      startDate,
      yearsofExperience,
      certifications, // Save uploaded document paths
      status,
      inviteEmail,
      licenseId,
      language,
      timeZone,
      user: newUser._id, // Link Staff Profile to the User
    });

    await newStaffProfile.save();

    // Send the credentials email
    await sendCredentials(inviteEmail, generatedUsername, password);

    res.status(201).json({
      message:
        "Staff profile created successfully and credentials sent to email",
      success: true,
      profile: newStaffProfile,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message || error, error: true, success: false });
  }
};

module.exports = createStaffProfileController;
