const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { dispenserService } = require('../services');
const EVENT = require('../triggers/custom-events').customEvent;

const createDispenser = catchAsync(async(req,res)=>{
        let body = {...req.body}
        let dispenser = await dispenserService.createDispenser(body);
  
        res.status(httpStatus.CREATED).send({message:"Successfull", dispenser})
    
  })


const getDispensers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page','populate']);
  
    const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
   
    if(filter.name){
      const searchRgx = rgx(filter.name) ;
      filter.name = {$regex:searchRgx,$options:'i'}
    }
    filter.isDocDelete = false 

      const result = await dispenserService.queryDispensers(filter, options);
      res.status(httpStatus.OK).send(result);
  });
  
const getDispenser = catchAsync(async (req, res) => {
    const dispenser = await dispenserService.getDispenserById(req.query.Id);
    if (!dispenser) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Dispenser not found');
    }
    res.send({ status: true, message: 'Successfull', dispenser });
});

const updateDispenser = catchAsync(async (req, res) => {
    const body = req.body;
    // const files=req.files;
  const dispenser = await dispenserService.updateDispenserById(req.query.Id, body);
  res.send(dispenser);
});

const deleteDispenser = catchAsync(async (req, res) => {
  let dispenser = await dispenserService.deleteDispenserById(req.query.Id);
  
  res.status(httpStatus.OK).send({message: 'Dispenser Deleted Successfully!', dispenser});
});


module.exports = {
    createDispenser,
    getDispensers,
    getDispenser,
    updateDispenser,
    deleteDispenser,

  };
  