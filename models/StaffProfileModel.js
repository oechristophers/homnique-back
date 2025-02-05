const mongoose = require("mongoose");

const staffProfileSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    role: { type: String, required: true },
    nationality: { type: String, required: true },
    specialization: { type: String },
    profileImage: { type: String }, // URL to the profile picture
    startDate: { type: Date, default: Date.now, required: true },
    yearsofExperience: { type: Number },
    certifications: [{ type: String }], // Array of URLs to documents (e.g., CV, References)
    status: { type: String, enum: ["active", "inactive"], required: true },
    loginEmail: { type: String, required: true },
    inviteEmail: { type: String }, // Email address for invitation
    licenseId: { type: String }, // Unique ID for the staff license
    language: { type: String, default: "English (UK)" },
    timeZone: { type: String, default: "GMT" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, // Reference to UserModel
  },
  { timestamps: true }
);

const StaffProfileModel = mongoose.model("StaffProfile", staffProfileSchema);
module.exports = StaffProfileModel;
