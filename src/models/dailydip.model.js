const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const dailydipSchema = mongoose.Schema(
  {
    tank: {
      type: String,
    },
    dipLevel: {
      type: String,
    },
    physicalQTY: { type: String },
    CalculatedQTY: {
      type: String,
    },
    amount: { type: String },
    date:{type:Date},
    calcultedMethod:{type: String },
    isDocDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
dailydipSchema.plugin(toJSON);
dailydipSchema.plugin(paginate);

/**
 * @typedef User
 */
const DailyDip = mongoose.model('DailyDip', dailydipSchema);

module.exports = DailyDip;
