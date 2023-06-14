const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { employeeService } = require('../services');

const createEmployee = catchAsync(async(req,res)=>{
        let body = {...req.body}
        let employee = await employeeService.createEmployee(body);
  
        res.status(httpStatus.CREATED).send({message:"Successfull", employee})
    
  })


const getEmployees = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page','populate']);
  
    const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
   
    if(filter.name){
      const searchRgx = rgx(filter.name) ;
      filter.name = {$regex:searchRgx,$options:'i'}
    }
    filter.isDocDelete = false 

      const result = await employeeService.queryEmployee(filter, options);
      res.status(httpStatus.OK).send(result);
  });
  
const getEmployee = catchAsync(async (req, res) => {
    const employee = await employeeService.getEmployeeById(req.query.Id);
    if (!employee) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Employee not found');
    }
    res.send({ status: true, message: 'Successfull', employee });
});

const updateEmployee = catchAsync(async (req, res) => {
    const body = req.body;
    // const files=req.files;
  const employee = await employeeService.updateEmployeeById(req.query.Id, body);
  res.send(employee);
});

const deleteEmployee = catchAsync(async (req, res) => {
  let customer = await employeeService.deleteEmployeeById(req.query.Id);
  res.status(httpStatus.OK).send({message: 'Employee Deleted Successfully!', customer});
});


module.exports = {
    createEmployee,
    getEmployees,
    getEmployee,
    updateEmployee,
    deleteEmployee,
  };
  