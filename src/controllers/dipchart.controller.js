const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { dipchartService } = require('../services');

const createDipchart = catchAsync(async(req,res)=>{
        let body = {...req.body}
        let dipchart = await dipchartService.createDipchart(body);
  
        res.status(httpStatus.CREATED).send({message:"Successfull", dipchart})
    
  })


const getDipcharts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page','populate']);
  
    const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
   
    if(filter.name){
      const searchRgx = rgx(filter.name) ;
      filter.name = {$regex:searchRgx,$options:'i'}
    }
    filter.isDocDelete = false 

      const result = await dipchartService.queryDipcharts(filter, options);
      res.status(httpStatus.OK).send(result);
  });
  
const getDipchart = catchAsync(async (req, res) => {
    const dipchart = await dipchartService.getDipchartById(req.query.Id);
    if (!dipchart) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Dipchart not found');
    }
    res.send({ status: true, message: 'Successfull', dipchart });
});

const updateDipchart = catchAsync(async (req, res) => {
    const body = req.body;
    // const files=req.files;
  const dipchart = await dipchartService.updateDipchartById(req.query.Id, body);
  res.send(dipchart);
});

const deleteDipchart = catchAsync(async (req, res) => {
  let dispenser = await dipchartService.deleteDipchartById(req.query.Id);
  res.status(httpStatus.OK).send({message: 'Dipchart Deleted Successfully!', dispenser});
});


module.exports = {
    createDipchart,
    getDipcharts,
    getDipchart,
    updateDipchart,
    deleteDipchart,
  };
  