const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { salesmanService } = require('../services');

const createSalesman = catchAsync(async(req,res)=>{
        let body = {...req.body}
        let salesman = await salesmanService.createSalesman(body);
  
        res.status(httpStatus.CREATED).send({message:"Successfull", salesman})
    
  })


const getSalesmen = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page','populate']);
  
    const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
   
    if(filter.name){
      const searchRgx = rgx(filter.name) ;
      filter.name = {$regex:searchRgx,$options:'i'}
    }
    filter.isDocDelete = false 

      const result = await salesmanService.querySalesman(filter, options);
      res.status(httpStatus.OK).send(result);
  });
  
const getSalesman = catchAsync(async (req, res) => {
    const salesman = await salesmanService.getSalesmanById(req.query.Id);
    if (!salesman) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Salesman not found');
    }
    res.send({ status: true, message: 'Successfull', salesman });
});

const updateSalesman = catchAsync(async (req, res) => {
    const body = req.body;
    // const files=req.files;
  const salesman = await salesmanService.updateSalesmanById(req.query.Id, body);
  res.send(salesman);
});

const deleteSalesman = catchAsync(async (req, res) => {
  let customer = await salesmanService.deleteSalesmanById(req.query.Id);
  res.status(httpStatus.OK).send({message: 'Salesman Deleted Successfully!', customer});
});


module.exports = {
    createSalesman,
    getSalesmen,
    getSalesman,
    updateSalesman,
    deleteSalesman,
  };
  