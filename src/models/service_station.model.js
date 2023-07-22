const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const service_StationSchema = mongoose.Schema(
  {
    serviceDate:{
      type:Date
    },
    customerName:{
      type:String
    } ,
    vehicleNo:{
      type:String
    },
    demandNo:{
      type:String
    } ,
    description:{
      type:String
    } ,
    amount:{
      type:String
    } 
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
service_StationSchema.plugin(toJSON);
service_StationSchema.plugin(paginate);


/**
 * @typedef User
 */
const service_Station = mongoose.model('serviceStation', service_StationSchema);

module.exports = service_Station;