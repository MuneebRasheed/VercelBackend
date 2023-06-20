const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const otherSaleSchema = mongoose.Schema(
  {
    invoice_no:{
      type:String,
    },
    sale_date:String,
    salesmanId:{
      type:String,
      ref:'Salesman'
    },
    customer:{
      type:String,
      ref:'Customer'
    },
    vehicle_no:String,
    demand_no:String,
    details:[{
      product:{
        type:String,
        ref:'Product'
      },
      packing:String,
      rate:String,
      qty:String,
      disc:String,
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
otherSaleSchema.plugin(toJSON);
otherSaleSchema.plugin(paginate);


/**
 * @typedef Purchase
 */
const purchase = mongoose.model('OtherSale', otherSaleSchema);

module.exports = purchase;