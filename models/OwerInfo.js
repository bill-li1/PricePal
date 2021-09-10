const { model, Schema } = require('mongoose');
const { userSchema } = require('./User');

const owerInfoSchema = new Schema(
  {
    user: { type: userSchema, required: true },
    amount: { type: Number, required: true },
    notes: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = model('OwerInfo', owerInfoSchema);
