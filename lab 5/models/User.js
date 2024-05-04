const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,

  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user"]
  }
 
});
userSchema.pre("save", async function (next) {
  const passwordHashed = await bcryptjs.hash(this.password, 12);
  this.password = passwordHashed;
  console.log(
    `we will change password ${this.password} for username: ${this.username}`
  );
  next();
});

const User = mongoose.model("User", userSchema);



module.exports = User;
