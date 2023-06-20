const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const cashSaleSchema = mongoose.Schema(
  {
    invoice_no:{
      type:String,
    },
    sale_date:String,
    shift:String,
    salesmanId:String,
    Salesman_name:String,
    
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
      productId:{
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
cashSaleSchema.plugin(toJSON);
cashSaleSchema.plugin(paginate);


/**
 * @typedef Purchase
 */
const cashSale = mongoose.model('CashSale', cashSaleSchema);

module.exports = cashSale;