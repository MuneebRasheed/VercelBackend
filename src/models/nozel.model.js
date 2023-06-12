const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const nozelSchema = mongoose.Schema(
  {
    no:{type:String},
    name:{type:String,
          required:false,
          trim:true,
        },
    unit:{
      type:String,
      enum:["kg",'liter','no']
    },
    dispenser:{
      type:String,
      ref:'Dispenser'
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
nozelSchema.plugin(toJSON);
nozelSchema.plugin(paginate);


/**
 * @typedef User
 */
const Nozel = mongoose.model('Nozel', nozelSchema);

module.exports = Nozel;