const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { supplierService } = require('../services');
const EVENT = require('../triggers/custom-events').customEvent;

const create = catchAsync(async(req,res)=>{
        let body = {...req.body}
        let tank = await supplierService.createSupplier(body);
  
        res.status(httpStatus.CREATED).send({message:"Successfull",tank})
    
  })


const getSuppliers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page','populate']);
  
    const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
   
    if(filter.name){
      const searchRgx = rgx(filter.name) ;
      filter.name = {$regex:searchRgx,$options:'i'}
    }
    filter.isDocDelete = false 

      const result = await supplierService.querySuppliers(filter, options);
      res.status(httpStatus.OK).send(result);
  });
  
const getSupplier = catchAsync(async (req, res) => {
    const supplier = await supplierService.getSupplierById(req.query.Id);
    if (!supplier) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Supplier not found');
    }
    res.send({ status: true, message: 'Successfull', supplier });
});

const updateSupplier = catchAsync(async (req, res) => {
    const body = req.body;
    // const files=req.files;
  const supplier = await supplierService.updateSupplierById(req.query.Id, body);
  res.send(supplier);
});

const deleteSupplier = catchAsync(async (req, res) => {
  let dispenser = await supplierService.deleteSupplierById(req.query.Id);
  res.status(httpStatus.OK).send({message: 'Supplier Deleted Successfully!', dispenser});
});


module.exports = {
    create,
    getSuppliers,
    getSupplier,
    updateSupplier,
    deleteSupplier,

  };
  