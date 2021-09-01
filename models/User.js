const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  password: { type: String, required: true},
  email: { type: String, required: true },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
},
{ timestamps: true });

module.exports = model("User", userSchema);
