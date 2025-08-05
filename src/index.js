const express = require("express");

const app = express();
const PORT = 8080;

app.use("/",(req, res)=>{
  res.send("Hello World Welcome")
})
app.use("/test",(req, res)=>{
  res.send("Hello from the server")
})

app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`)
})