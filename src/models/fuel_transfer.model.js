const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const fuel_TransferSchema = mongoose.Schema(
  {
    Date:{
      type:String
    },
    SourceTank:{
      type:String
    } ,
    DestinationTank:{
      type:String
    },
    TransferQuantity:{
      type:String
    } 
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
fuel_TransferSchema.plugin(toJSON);
fuel_TransferSchema.plugin(paginate);


/**
 * @typedef User
 */
const fuel_Transfer = mongoose.model('fuelTransfer', fuel_TransferSchema);

module.exports = fuel_Transfer;