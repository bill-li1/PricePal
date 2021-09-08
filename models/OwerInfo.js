const { model, Schema } = require('mongoose');
// const { userSchema } = require('./Transaction');

const userSchema = new Schema(
  {
    password: { type: String, required: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const owerInfoSchema = new Schema(
  {
    user: { type: userSchema, required: true },
    amount: { type: String, required: true },
    notes: { type: String, required: false, trim: true },
  },
  { timestamps: true }
);

module.exports = model('OwerInfo', owerInfoSchema);
