const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const Customer_leadgerSchema = mongoose.Schema(
  {
    name:{
      type:String
    },
    address:{
      type:String
    } ,
    vehicles:{
      type:String
    },
    from:{
      type:String
    },
    to:{
      type:String
    }   
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
Customer_leadgerSchema.plugin(toJSON);
Customer_leadgerSchema.plugin(paginate);


/**
 * @typedef User
 */
const Customer_leadger = mongoose.model('customerleadger', Customer_leadgerSchema);

module.exports = Customer_leadger;