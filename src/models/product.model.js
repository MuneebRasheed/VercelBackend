const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const productSchema = mongoose.Schema(
  {
    name:{type:String,
          required:false,
          trim:true,
        },
    type:{type:String},
    // parent:{type:String},
    selling_rate:{type:Number},
    purchase_rate:{type:Number},
    image:{
      type:String,
      required:false,
      default:''
    },

    
    // logical fields
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
productSchema.plugin(toJSON);
productSchema.plugin(paginate);


/**
 * @typedef User
 */
const Product = mongoose.model('Product', productSchema);

module.exports = Product;