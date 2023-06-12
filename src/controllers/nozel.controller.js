
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { nozelService } = require('../services');
const EVENT = require('../triggers/custom-events').customEvent;

const createNozel = catchAsync(async(req,res)=>{
        let body = {...req}
        let nozel = await nozelService.createNozel(body);
  
        res.status(httpStatus.CREATED).send({message:"Successfull",nozel})
    
  })


const getNozels = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page','populate']);
  
    const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
   
    if(filter.name){
      const searchRgx = rgx(filter.name) ;
      filter.name = {$regex:searchRgx,$options:'i'}
    }
    filter.isDocDelete = false 

      const result = await nozelService.queryNozels(filter, options);
      res.status(httpStatus.OK).send(result);
  });
  
const getNozel = catchAsync(async (req, res) => {
    const nozel = await nozelService.getNozelById(req.query.tankId);
    if (!nozel) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Nozel not found');
    }
    res.send({ status: true, message: 'Successfull', nozel });
});

const updateNozel = catchAsync(async (req, res) => {
    const body = req.body;
    // const files=req.files;
  const nozel = await nozelService.updateNozelById(req.query.nozelId, body);
  res.send(nozel);
});

const deleteNozel = catchAsync(async (req, res) => {
  let nozel = await nozelService.deleteNozelById(req.query.tankId);
  
  res.status(httpStatus.OK).send({message: 'Nozel Deleted Successfully!',tank: nozel});
});


module.exports = {
    createNozel,
    getNozels,
    getNozel,
    updateNozel,
    deleteNozel,

  };
  