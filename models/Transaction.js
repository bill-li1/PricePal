const { model, Schema } = require('mongoose');

const transactionSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    img: { type: String, required: false },
    payer: { type: Schema.Types.ObjectId, ref: 'payer' },
    ower: {
      type: [
        {
          user: { type: Schema.Types.ObjectId, required: true },
          amount: { type: Number, required: true },
          notes: { type: String, required: true },
        },
      ],
      ref: 'owers',
    },
  },
  { timestamps: true }
);

module.exports = model('Transaction', transactionSchema);
