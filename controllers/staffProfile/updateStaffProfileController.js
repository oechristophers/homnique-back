const StaffProfile = require("../../models/StaffProfileModel");

const updateStaffProfileController =  async (req, res) => {
    try {
      const updatedData = { ...req.body };
      if (req.file) updatedData.profileImage = req.file.path;
      const profile = await StaffProfile.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!profile) return res.status(404).json({ error: "Profile not found" });
      res.status(200).json(profile);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

module.exports= updateStaffProfileController;

  