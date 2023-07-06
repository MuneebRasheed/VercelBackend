const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { dailydipService } = require('../services');

const createDailyDip = catchAsync(async(req,res)=>{
        let body = {...req.body}
        let dailydip = await dailydipService.createDailyDip(body);
  
        res.status(httpStatus.CREATED).send({message:"Successfull", dailydip})
    
  })


const getDailyDips = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page','populate']);
  
    const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
   
    if(filter.name){
      const searchRgx = rgx(filter.name) ;
      filter.name = {$regex:searchRgx,$options:'i'}
    }
    filter.isDocDelete = false 

      const result = await dailydipService.queryDailyDips(filter, options);
      res.status(httpStatus.OK).send(result);
  });
  
const getDailyDip = catchAsync(async (req, res) => {
    const dailydip = await dailydipService.getDailyDipById(req.query.Id);
    if (!dailydip) {
      throw new ApiError(httpStatus.NOT_FOUND, 'DailyDip not found');
    }
    res.send({ status: true, message: 'Successfull', dailydip });
});

const updateDailyDip = catchAsync(async (req, res) => {
    const body = req.body;
    // const files=req.files;
  const dailydip = await dailydipService.updateDailyDipById(req.query.Id, body);
  res.send(dailydip);
});

const deleteDailyDip = catchAsync(async (req, res) => {
  let dispenser = await dailydipService.deleteDailyDipById(req.query.Id);
  res.status(httpStatus.OK).send({message: 'DailyDip Deleted Successfully!', dispenser});
});


module.exports = {
    createDailyDip,
    getDailyDips,
    getDailyDip,
    updateDailyDip,
    deleteDailyDip,
  };
  