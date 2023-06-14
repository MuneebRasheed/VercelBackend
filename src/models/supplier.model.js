const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const supplierSchema = mongoose.Schema(
  {
    
    name:{
      type:String
    },
    address:{
      type:String
    },
    phone:{type:String},
    email:String,
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
supplierSchema.plugin(toJSON);
supplierSchema.plugin(paginate);


/**
 * @typedef User
 */
const supplier = mongoose.model('Supplier', supplierSchema);

module.exports = supplier;