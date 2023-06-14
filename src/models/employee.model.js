const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const employeeSchema = mongoose.Schema(
  {
    no:String,
    name:{
      type:String
    },
    address:{
      type:String
    },
    phone:{type:String},
    email:String,
    designation:String,
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
employeeSchema.plugin(toJSON);
employeeSchema.plugin(paginate);


/**
 * @typedef User
 */
const employee = mongoose.model('Employee', employeeSchema);

module.exports = employee;