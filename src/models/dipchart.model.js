const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const dipchartSchema = mongoose.Schema(
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
dipchartSchema.plugin(toJSON);
dipchartSchema.plugin(paginate);


/**
 * @typedef User
 */
const Dipchart = mongoose.model('Dipchart', dipchartSchema);

module.exports = Dipchart;