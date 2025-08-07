const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const userAuth = async (req, res, next) => {
  try {
    // Read the token from the req cookies
    const { token } = req.cookies;

    if(!token){
      throw new Error("Invalid Token")
    }
    const decodedObj = await jwt.verify(token, "DEV@Tinder$790")
    const { _id } = decodedObj;
    // Find the User
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found")
    }
     req.user = user;
    next();
  } catch (error) {
    res.status(400).send("ERROR: " + error.message)
  }
};

module.exports = {
  userAuth
}