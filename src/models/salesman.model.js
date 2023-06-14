const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const salesmanSchema = mongoose.Schema(
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
salesmanSchema.plugin(toJSON);
salesmanSchema.plugin(paginate);


/**
 * @typedef User
 */
const salesman = mongoose.model('Salesman', salesmanSchema);

module.exports = salesman;