const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validateSignupData } = require("../utils/validation");
const User = require("../models/user.model");

const registerUserController =  async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;
    const saltRounds = 10;
    // Validation  of data
    validateSignupData(req)

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Creating a new instance of the User model
    const user = new User({ firstName, lastName, emailId, password: passwordHash });
    await user.save();
    res.status(201).send({ message: "User added successfull" })
  } catch (error) {
    res.status(400).send("Error saving the user " + error.message)
  }
}



const loginUserController = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid Credentials")
    }
    const isPasswordValid = await user.validatePassword(password)
    if (isPasswordValid) {

      // Create a JWT Token
      const token = await user.generateJWT();
      // Add te token to cookie and send the response back to the user
      res.cookie("token", token,  { expires: new Date(Date.now() + 1 * 3600000) })
      res.status(200).send({
        message: "Login Successful"
      })
    } else {
      throw new Error("Invalid Credentials")
    }

    console.log({ isPasswordValid })
  } catch (error) {
    res.status(400).send("Error login user " + error.message)
  }
}

module.exports = { registerUserController, loginUserController }