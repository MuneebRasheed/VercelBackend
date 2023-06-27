const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const dailydipSchema = mongoose.Schema(
  {
    
    name:{
      type:String
    },
    address:{
      type:String
    },
    phone:{type:String},
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
dailydipSchema.plugin(toJSON);
dailydipSchema.plugin(paginate);


/**
 * @typedef User
 */
const DailyDip = mongoose.model('DailyDip', dailydipSchema);

module.exports = DailyDip;