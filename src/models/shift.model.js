const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const shiftSchema = mongoose.Schema(
  {
    title:{
      type:String
    },
    Timing:{
      type:String
    } 
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
shiftSchema.plugin(toJSON);
shiftSchema.plugin(paginate);


/**
 * @typedef User
 */
const shift = mongoose.model('Shift', shiftSchema);

module.exports = shift;