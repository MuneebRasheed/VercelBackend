const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const customerSaleSchema = mongoose.Schema(
  {
    invoice_no:{
      type:String,
    },
    sale_date:String,
    shift:String,
    salesmanId:{
      type:String,
      ref:"Salesman"
    },
    Salesman_name:String,
    cashSale:[{
      nozzle:{
      type:String,
      ref:"Nozzle"
    },
    product:{
      type:String,
      ref:'Product'
    },
    last_reading:{
      type:String
    },
    new_reading:{
      type:String
    },
    test_fuel:String,
    Sold_qty:String
    }],
    creditSale:[{
      no:String,
      vehicleNo:String,
      customer:{
        type:String,
        ref:'Customer'
      },
      demand_no:String,
      Product:{
        type:String,
        ref:'Product'
      },
      qty:String,
      remarks:String,
      rate:String,
      value:String,
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
customerSaleSchema.plugin(toJSON);
customerSaleSchema.plugin(paginate);


/**
 * @typedef Purchase
 */
const customerSale = mongoose.model('SaleFuel', customerSaleSchema);

module.exports = customerSale;