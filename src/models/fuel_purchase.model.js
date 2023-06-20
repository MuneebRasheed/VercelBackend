const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const fuelPurchaseSchema = mongoose.Schema(
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
    purchaseDate:{
      type:String
    },
    product:{
      type:String,
      ref:'Product'
    },
    tank:{
      type:String,
      ref:'Tank'
    },
    invoice_qty:String,
    qty_received:String,
    company_shortage:String,
    carriage_shortage:String,
    disc:String,
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
fuelPurchaseSchema.plugin(toJSON);
fuelPurchaseSchema.plugin(paginate);


/**
 * @typedef Purchase
 */
const purchase = mongoose.model('FuelPurchase', fuelPurchaseSchema);

module.exports = purchase;