const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const carriageSchema = mongoose.Schema(
  {
    
    name:{
      type:String
    },
    address:{
      type:Number
    },
    phone:{type:String},
    isDocDelete:{
      type: Boolean,
      default:false
    },
    
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
carriageSchema.plugin(toJSON);
carriageSchema.plugin(paginate);


/**
 * @typedef User
 */
const Carriage = mongoose.model('Carriage', carriageSchema);

module.exports = Carriage;