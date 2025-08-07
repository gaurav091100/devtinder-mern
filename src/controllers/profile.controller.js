const { validateEditProfileData } = require("../utils/validation");

const getProfileDetailsController = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).send({
      data: user
    })
  } catch (error) {
    res.status(400).send("Error retriving user profile " + error.message)
  }
}


const editProfileController = async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid edit request")
    }
    const user = req.user;
    Object.keys(req.body).forEach((key)=> (user[key] = req.body[key]));

    await user.save();
    res.send({
      message:"Profile updated successfully",
      data: user
    })
  } catch (error) {
    res.status(400).send("Error editing user profile " + error.message)
  }
}
module.exports = { getProfileDetailsController, editProfileController }