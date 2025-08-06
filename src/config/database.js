const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(`mongodb+srv://gaurav:devtinderpassword@cluster0.dz61w0r.mongodb.net/devtinder`)
}

module.exports = connectDB;
