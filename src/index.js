const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user.model");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const app = express();
const PORT = 8080;

app.use(express.json())

// This will only handle GET call to /user
// app.get("/user", (req, res) => {
//   res.send("Get Response")
// })

// this will match all the HTTP method api calls to /test  
// app.use("/test", (req, res) => {
//   res.send("Hello from the server")
// })


app.post("/signup", async (req, res) => {
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

})

app.post("/login",async(req, res)=> {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({emailId: emailId});

    if(!user){
      throw new Error("Invalid Credentials")
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(isPasswordValid){
      res.status(200).send({
        message:"Login Successful"
      })
    }else{
      throw new Error("Invalid Credentials")
    }

    console.log({isPasswordValid})
  } catch (error) {
    res.status(400).send("Error login user " + error.message)
  }
})

app.get("/users", async (req, res) => {
  try {
    const allUsers = await User.find({});

    res.status(200).send({
      data: allUsers
    })
  } catch (error) {
    res.status(400).send("Error retriving all users " + error.message)
  }
})

app.delete("/users", async (req, res) => {
  try {
    const userId = req.body.userId;
    await User.findByIdAndDelete(userId);

    res.status(200).send({
      message: "User deleted successfully"
    })
  } catch (error) {
    res.status(400).send("Error deleting user " + error.message)
  }
})

app.patch("/users/:userId", async (req, res) => {
  try {
    const userId = req.params?.userId;
    const data = req.body;
    const ALLOWED_UPDATES = [
      "photoUrl", "about", "gender", "age", "skills"
    ];

    const isUpdateAllowed = Object.keys(data).every((x) => ALLOWED_UPDATES.includes(x));

    if (!isUpdateAllowed) {
      throw new Error(`Update not allowed. Allowed updates - ${ALLOWED_UPDATES.join(', ')}`)
    }

    if (data?.skills?.length > 10) {
      throw new Error("Skills cannot be more than 10")
    }
    await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true
    })
    res.status(200).send({ message: "User updated successfully" })
  } catch (error) {
    res.status(400).send("Error updating the user " + error.message)
  }

})

connectDB().then(() => {
  console.log("Database connected successfully")
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}).catch(() => {
  console.error("Database connection failed")
})

