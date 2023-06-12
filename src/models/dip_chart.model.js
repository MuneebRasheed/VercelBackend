const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const dipChartSchema = mongoose.Schema(
  {
    
    level:{
      type:Number
    },
    liters:{
      type:Number
    },
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
dipChartSchema.plugin(toJSON);
dipChartSchema.plugin(paginate);


/**
 * @typedef User
 */
const DipChart = mongoose.model('DipChart', dipChartSchema);

module.exports = DipChart;