const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const otherPurchaseSchema = mongoose.Schema(
  {
    purchase_no:String,
    supplier:{
      type:String,
      ref:'Supplier'
    },
    name:{
      type:String,
    },
    address:{
      type:String
    },
    code:String,
    Carriage:{
      type:String,
      ref:'Carriage'
    },
    invoice_no:{
      type:String,
      unique:true
    },
    builty_no:{
      type:String
    },
    details:[{
      product:{
      type:String,
      ref:'Product'
    },
    packing:{
      type:String
    },
    qty:String,
    bns:String,
    disc:String,
    tax:String,
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
otherPurchaseSchema.plugin(toJSON);
otherPurchaseSchema.plugin(paginate);


/**
 * @typedef Purchase
 */
const purchase = mongoose.model('OtherPurchase', otherPurchaseSchema);

module.exports = purchase;