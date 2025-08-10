const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require('cookie-parser');
const authRouter = require("./routes/auth.route");
const profileRouter = require("./routes/profile.route");
const requestRouter = require("./routes/request.route");
const userRouter = require("./routes/user.route");

const app = express();
const PORT = 8080;

app.use(express.json())
app.use(cookieParser())

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// This will only handle GET call to /user
// app.get("/user", (req, res) => {
//   res.send("Get Response")
// })

// this will match all the HTTP method api calls to /test  
// app.use("/test", (req, res) => {
//   res.send("Hello from the server")
// })

connectDB().then(() => {
  console.log("Database connected successfully")
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}).catch(() => {
  console.error("Database connection failed")
})

