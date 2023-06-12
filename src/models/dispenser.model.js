const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const dispenserSchema = mongoose.Schema(
  {
    no:{type:String},
    name:{type:String,
          required:false,
          trim:true,
        },
    capacity:{type:String},
    tank:{
      type:String,
      ref:'Tank'
    },
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
dispenserSchema.plugin(toJSON);
dispenserSchema.plugin(paginate);


/**
 * @typedef User
 */
const Dispenser = mongoose.model('Dispenser', dispenserSchema);

module.exports = Dispenser;