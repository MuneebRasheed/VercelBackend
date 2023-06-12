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
    // category:{type:String},
    // parent:{type:String},
    // sku:{type:String},
    // barcode:{type:String},
    // unit:{type:String},
    // tax:{type:String},
    // amount:String,
    selling_rate:{type:Number},
    purchase_rate:{type:Number},
    image:{
      type:String,
      required:false,
      default:''
    },
    // options:[{
    //   option_name:String,
    //   option_value:[String]
    // }],
    // variations:[{
    //   type: mongoose.SchemaTypes.ObjectId , ref:'Product'
    // }],
    // variation_price:String,
    // variation_barcode:String,
    // is_parent_product:{type:Boolean,default:false},
    // parent_product_name:String,
    // parent_product_id:mongoose.SchemaTypes.ObjectId,
    
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