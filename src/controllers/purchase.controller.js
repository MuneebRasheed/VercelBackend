const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { purchaseService } = require('../services');

const createFuel = catchAsync(async(req,res)=>{
        let body = {...req.body}
        let result = await purchaseService.createFuel(body);
  
        res.status(httpStatus.CREATED).send({message:"Successfull", result})
    
  })


const getFuels = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page','populate']);
  
    const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
   
    if(filter.name){
      const searchRgx = rgx(filter.name) ;
      filter.name = {$regex:searchRgx,$options:'i'}
    }
    filter.isDocDelete = false 

      const result = await purchaseService.queryFuel(filter, options);
      res.status(httpStatus.OK).send(result);
  });
  
const getFuel = catchAsync(async (req, res) => {
    const result = await purchaseService.getFuelById(req.query.Id);
    if (!result) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Purchase not found');
    }
    res.send({ status: true, message: 'Successfull', result });
});

const updateFuel = catchAsync(async (req, res) => {
    const body = req.body;
    // const files=req.files;
  const result = await purchaseService.updateFuelById(req.query.Id, body);
  res.send(result);
});

const deleteFuel = catchAsync(async (req, res) => {
  let customer = await purchaseService.deleteFuelById(req.query.Id);
  res.status(httpStatus.OK).send({message: 'Fuel Deleted Successfully!', customer});
});
// -------------------------- OTHER Purchase -----------
const createOther = catchAsync(async(req,res)=>{
        let body = {...req.body}
        let result = await purchaseService.createOther(body);
  
        res.status(httpStatus.CREATED).send({message:"Successfull", result})
    
  })


const getOthers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page','populate']);
  
    const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
   
    if(filter.name){
      const searchRgx = rgx(filter.name) ;
      filter.name = {$regex:searchRgx,$options:'i'}
    }
    filter.isDocDelete = false 

      const result = await purchaseService.queryOther(filter, options);
      res.status(httpStatus.OK).send(result);
  });
  
const getOther = catchAsync(async (req, res) => {
    const result = await purchaseService.getOtherById(req.query.Id);
    if (!result) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Purchase not found');
    }
    res.send({ status: true, message: 'Successfull', result });
});

const updateOther = catchAsync(async (req, res) => {
    const body = req.body;
    // const files=req.files;
  const result = await purchaseService.updateOtherById(req.query.Id, body);
  res.send(result);
});

const deleteOther = catchAsync(async (req, res) => {
  let customer = await purchaseService.deleteFuelById(req.query.Id);
  res.status(httpStatus.OK).send({message: 'Purchase Deleted Successfully!', customer});
});


module.exports = {
    createFuel,
    getFuels,
    getFuel,
    updateFuel,
    deleteFuel,
    createOther,
    getOthers,
    getOther,
    updateOther,
    deleteOther,
  };
  