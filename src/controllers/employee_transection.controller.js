const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { employee_transection_Service } = require('../services');

const createemployeetransection = catchAsync(async (req, res) => {
  const user = await employee_transection_Service.createEmployeeTransection(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getAllemployeetransection = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'Permission']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await employee_transection_Service.queryEmployeeTransection(filter, options);
  res.send(result);
});

const getemployeetransectionById = catchAsync(async (req, res) => {
  const result = await employee_transection_Service.getEmployeeTransection(req.params.id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'employee transection not found');
  }
  res.send(result);
});

const updateemployeetransection = catchAsync(async (req, res) => {
  const result = await employee_transection_Service.updateEmployeeTransectionById(req.params.id, req.body);
  res.send(result);
});

const deleteemployeetransection = catchAsync(async (req, res) => {
  await employee_transection_Service.deleteEmployeeTransectionById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send("Delete Succesfully");
});

module.exports = {
  createemployeetransection,
  getAllemployeetransection,
  getemployeetransectionById,
  updateemployeetransection,
  deleteemployeetransection,
};
