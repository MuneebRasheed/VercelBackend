
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { tankService } = require('../services');
const {ObjectId} = require('mongodb')
const EVENT = require('../triggers/custom-events').customEvent;

const createTank = catchAsync(async(req,res)=>{
        let body = {...req.body}
        let tank = await tankService.createTank(body);
  
        res.status(httpStatus.CREATED).send({message:"Successfull",tank})
    
  })

const addDipChart = catchAsync(async(req,res)=>{
      let body = {...req.body}
      let tank = await tankService.addDipChart(body);
      res.status(httpStatus.CREATED).send({message:"Successfull",tank})
  })


const getTanks = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page','populate']);
  
    const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
    
    if(filter.name){
      const searchRgx = rgx(filter.name) ;
      filter.name = {$regex:searchRgx,$options:'i'}
    }
    filter.isDocDelete = false 

      const result = await tankService.queryTanks(filter, options);
      res.status(httpStatus.OK).send(result);
  });

const getDipCharts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['tank','level']);
  const options = pick(req.query, ['sortBy', 'limit', 'page','populate']);
    
    if(filter.tank){
      filter.tank = new ObjectId(filter.tank)
    }
    filter.isDocDelete = false 

      const result = await tankService.getDipCharts(filter, options);
      res.status(httpStatus.OK).send(result);
  });
  
const getTank = catchAsync(async (req, res) => {
    const tank = await tankService.getTankById(req.query.Id);
    if (!tank) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Tank not found');
    }
    res.send({ status: true, message: 'Successfull', tank });
});

const updateTank = catchAsync(async (req, res) => {
    const body = req.body;
    // const files=req.files;
  const tank = await tankService.updateTankById(req.query.Id, body);
  res.send(tank);
});

const updateDipChart = catchAsync(async (req, res) => {
    const body = req.body;
    // const files=req.files;
  const dipChart = await tankService.updateDipChart(req.query.Id, body);
  res.send(dipChart);
});

const updateTankMany = catchAsync (async (req,res)=>{
  const updatedDocs = await tankService.updateManyTanks(req.body.tanks,req.body.updateBody);
  res.status(httpStatus.OK).send({message:'Updated Successfully!',updatedDocs});
})

const deleteTank = catchAsync(async (req, res) => {
  let tank = await tankService.deleteTankById(req.query.Id);
  res.status(httpStatus.OK).send({message: 'Tank Deleted Successfully!',tank});
});

const deleteDipChart = catchAsync(async (req, res) => {
  let dipchart = await tankService.deleteDipChart(req.query.Id);
  res.status(httpStatus.OK).send({message: 'Dip Deleted Successfully!', dipchart});
});


module.exports = {
    createTank,
    addDipChart,
    getTanks,
    getDipCharts,
    getTank,
    updateTank,
    updateDipChart,
    updateTankMany,
    deleteTank,
    deleteDipChart
  };
  