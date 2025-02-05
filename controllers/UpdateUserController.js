const bcrypt = require("bcryptjs");
const UserModel = require("../models/UserModel");

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword, password, ...updateData } = req.body;

  try {
    console.log(`Updating user with ID: ${id}`);

    // Check if the user exists
    const user = await UserModel.findById(id);
    if (!user) {
      console.error(`User not found with ID: ${id}`);
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    // If password is provided, require current password
    if (password) {
      if (!currentPassword) {
        console.error("Current password is required to update password");
        return res.status(400).json({
          message: "Current password is required to update password",
          error: true,
          success: false,
        });
      }

      // Compare provided current password with the stored hashed password
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      console.log("Current password match:", isMatch); // Debugging log

      if (!isMatch) {
        console.error("Incorrect current password");
        return res.status(401).json({
          message: "Incorrect current password",
          error: true,
          success: false,
        });
      }

      // Hash the new password before updating
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      updateData.password = hashedPassword;
      user.password = hashedPassword;
      console.log("Updated password hash:", user.password); // Debugging log
    }

    // Update user details excluding password in the returned data
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true } // Return the updated document
    ).select("-password"); // Exclude password from the response

    // Check if update was successful
    if (!updatedUser) {
      console.error("No changes were made to the user");
      return res.status(304).json({
        message: "No changes were made to the user",
        error: true,
        success: false,
      });
    }

    // Logging the stored password hash after the update
    const userAfterUpdate = await UserModel.findById(id);
    console.log("Stored password hash after update:", userAfterUpdate.password); // Check stored password hash

    // Check if the updated password matches
    const isNewPasswordMatch = await bcrypt.compare(
      password,
      userAfterUpdate.password
    );
    console.log("New password match:", isNewPasswordMatch); // Debugging log to check if the updated password matches

    console.log(`User updated successfully with ID: ${id}`);
    res.status(200).json({
      message: "User updated successfully",
      error: false,
      success: true,
      data: updatedUser, // Optional: Return the updated user data excluding password
    });
  } catch (error) {
    console.error(`Error updating user: ${error.message}`);
    res.status(500).json({
      message: error.message || "An error occurred",
      error: true,
      success: false,
    });
  }
};

module.exports = updateUser;
