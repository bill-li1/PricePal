const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
});

userSchema.set("timestamps", true);

module.exports = model("User", userSchema);
