const StaffProfile = require("../../models/StaffProfileModel");

const deleteStaffProfileController= async (req, res) => {
    try {
      const profile = await StaffProfile.findByIdAndDelete(req.params.id);
      if (!profile) return res.status(404).json({ error: "Profile not found" });
      res.status(200).json({ message: "Profile deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

module.exports = deleteStaffProfileController;
  