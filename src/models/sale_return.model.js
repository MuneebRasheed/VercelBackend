const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const saleReturnSchema = mongoose.Schema(
  {
    customer_Id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Customer"
    },
    product_Name:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Product"
    },
    address:{
      type:String
    },
    phone:{
      type:String
    } 
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
saleReturnSchema.plugin(toJSON);
saleReturnSchema.plugin(paginate);


/**
 * @typedef User
 */
const sale_return = mongoose.model('salesRetun', saleReturnSchema);

module.exports = sale_return;