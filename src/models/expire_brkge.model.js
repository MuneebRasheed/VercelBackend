const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const expire_brkgeSchema = mongoose.Schema(
  {
    name:{
      type:String
    },
    description:{
      type:String
    } ,
    rate:{
      type:String
    },
    qty:{
      type:String
    },
    total:{
      type:String
    }   
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
expire_brkgeSchema.plugin(toJSON);
expire_brkgeSchema.plugin(paginate);


/**
 * @typedef User
 */
const expire_brkge = mongoose.model('ExpireBreaking', expire_brkgeSchema);

module.exports = expire_brkge;