const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { carriageService } = require('../services');

const createCarriage = catchAsync(async(req,res)=>{
        let body = {...req.body}
        let carriage = await carriageService.createCarriage(body);
  
        res.status(httpStatus.CREATED).send({message:"Successfull", carriage})
    
  })


const getCarriages = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page','populate']);
  
    const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
   
    if(filter.name){
      const searchRgx = rgx(filter.name) ;
      filter.name = {$regex:searchRgx,$options:'i'}
    }
    filter.isDocDelete = false 

      const result = await carriageService.queryCarriages(filter, options);
      res.status(httpStatus.OK).send(result);
  });
  
const getCarriage = catchAsync(async (req, res) => {
    const carriage = await carriageService.getCarriageById(req.query.Id);
    if (!carriage) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Carriage not found');
    }
    res.send({ status: true, message: 'Successfull', carriage });
});

const updateCarriage = catchAsync(async (req, res) => {
    const body = req.body;
    // const files=req.files;
  const carriage = await carriageService.updateCarriageById(req.query.Id, body);
  res.send(carriage);
});

const deleteCarriage = catchAsync(async (req, res) => {
  let dispenser = await carriageService.deleteCarriageById(req.query.Id);
  res.status(httpStatus.OK).send({message: 'Carriage Deleted Successfully!', dispenser});
});


module.exports = {
    createCarriage,
    getCarriages,
    getCarriage,
    updateCarriage,
    deleteCarriage,
  };
  