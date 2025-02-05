const express = require("express");

const authMiddleware = require("../authMiddleware.js/middleware");
//const generateUserCredentials = require("../controllers/UserController");
const UserSignInController = require("../controllers/UserSignInController");
const router = express.Router();
const forgetPasswordController = require("../controllers/forgetPassword");
const resetPasswordController = require("../controllers/resetPasswordController");
const verifyOtpController = require("../controllers/verifyOtpController");
const generateReport = require("../controllers/report/getReportController");
const getReportType = require("../controllers/report/getReportTypeController");
const getStaffReport = require("../controllers/report/getStaffReportController");
const upload = require("../configs/uploads");
const createStaffProfile = require("../controllers/staffProfile/createStaffProfileController");
const getAllStaffProfile = require("../controllers/staffProfile/getAllStaffProfilesController");
const getSingleStaffProfile = require("../controllers/staffProfile/getSingleStaffController");
const updateStaffStaffProfile = require("../controllers/staffProfile/updateStaffProfileController");
const deleteStaffProfile = require("../controllers/staffProfile/deleteStaffProfileController");
const updateUser = require("../controllers/UpdateUserController");

//STAFF-PROFILE_ROUTE
router.post(
  "/createStaff",
  upload.fields([
    { name: "profileImage", maxCount: 1 }, // For the profile image
    { name: "certifications", maxCount: 3 }, // For a document (you can adjust maxCount as needed)
  ]),
  createStaffProfile
);
router.get("/staff", getAllStaffProfile);
router.get("/:id", getSingleStaffProfile);
router.put("/:id", updateStaffStaffProfile);
router.delete("/:id", deleteStaffProfile);

//AUTH_ROUTE
//router.post('/create',  generateUserCredentials);
router.post("/signIn", UserSignInController);
router.put("/update/:id", updateUser);
router.post("/resetPassword", resetPasswordController);
router.post("/forgetPassword", forgetPasswordController);
router.post("/verifyOtp", verifyOtpController);
//router.get('/report', generateReport);
router.get("/getReportType", getReportType);
router.get("/getStaffReport", getStaffReport);

module.exports = router;
