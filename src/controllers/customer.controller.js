const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { customerService } = require('../services');

const createCustomer = catchAsync(async(req,res)=>{
        let body = {...req.body}
        let carriage = await customerService.createCustomer(body);
  
        res.status(httpStatus.CREATED).send({message:"Successfull", carriage})
    
  })


const getCustomers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page','populate']);
  
    const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
   
    if(filter.name){
      const searchRgx = rgx(filter.name) ;
      filter.name = {$regex:searchRgx,$options:'i'}
    }
    filter.isDocDelete = false 

      const result = await customerService.queryCustomer(filter, options);
      res.status(httpStatus.OK).send(result);
  });
  
const getCustomer = catchAsync(async (req, res) => {
    const customer = await customerService.getCustomerById(req.query.Id);
    if (!customer) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Customer not found');
    }
    res.send({ status: true, message: 'Successfull', customer });
});

const updateCustomer = catchAsync(async (req, res) => {
    const body = req.body;
    // const files=req.files;
  const customer = await customerService.updateCustomerById(req.query.Id, body);
  res.send(customer);
});

const deleteCustomer = catchAsync(async (req, res) => {
  let customer = await customerService.deleteCustomerById(req.query.Id);
  res.status(httpStatus.OK).send({message: 'Customer Deleted Successfully!', customer});
});


module.exports = {
    createCustomer,
    getCustomers,
    getCustomer,
    updateCustomer,
    deleteCustomer,
  };
  