const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const customerSchema = mongoose.Schema(
  {
    no:String,
    name:{
      type:String
    },
    address:{
      type:String
    },
    phone:{type:String},
    vehicles:[{
        no:String,
        description:String
    }],
    discount:[{
        product:{type:String, disc:String}
    }],
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
customerSchema.plugin(toJSON);
customerSchema.plugin(paginate);


/**
 * @typedef User
 */
const customer = mongoose.model('Customer', customerSchema);

module.exports = customer;