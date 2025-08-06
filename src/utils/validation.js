const validator = require("validator");


const validateSignupData = (req) => {
  const { firstName, emailId, password } = req.body;

  if (!firstName) {
    throw new Error("First Name is required")
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Invalid Email")
  }else if(!validator.isStrongPassword(password)){
    throw new Error("Please Enter Strong Password")
  }
}

module.exports = {validateSignupData}