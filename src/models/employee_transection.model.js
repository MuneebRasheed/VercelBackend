const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const employee_TransectionSchema = mongoose.Schema(
  {
    Date:{
      type:String
    },
    description:{
      type:String
    } ,
    paidamount:{
      type:String
    },
    recieveamount:{
      type:String
    } 
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
employee_TransectionSchema.plugin(toJSON);
employee_TransectionSchema.plugin(paginate);


/**
 * @typedef User
 */
const employee_Transection = mongoose.model('employeetransection', employee_TransectionSchema);

module.exports = employee_Transection;