const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const tankSchema = mongoose.Schema(
  {
    no:{type:String},
    name:{type:String,
          required:false,
          trim:true,
        },
    capacity:{type:String},
    product:{
      type:String,
      ref:'Product'
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
tankSchema.plugin(toJSON);
tankSchema.plugin(paginate);


/**
 * @typedef User
 */
const Tank = mongoose.model('Tank', tankSchema);

module.exports = Tank;