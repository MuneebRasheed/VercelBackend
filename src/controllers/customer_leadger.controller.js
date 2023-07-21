const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { customer_leadger_Service } = require('../services');

const createCustomerLeadger = catchAsync(async (req, res) => {
  const user = await customer_leadger_Service.createCustomerLeadger(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getAllCustomerLeadger = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'Permission']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await customer_leadger_Service.queryCustomerLeadger(filter, options);
  res.send(result);
});

const getCustomerLeadgerById = catchAsync(async (req, res) => {
  const result = await customer_leadger_Service.getCustomerLeadger(req.params.id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Expiry not found');
  }
  res.send(result);
});

const updateCustomerLeadger = catchAsync(async (req, res) => {
  const result = await customer_leadger_Service.updateCustomerLeadgerById(req.params.id, req.body);
  res.send(result);
});

const deleteCustomerLeadger = catchAsync(async (req, res) => {
  await customer_leadger_Service.deleteCustomerLeadgerById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send("Delete Expiry item");
});

module.exports = {
  createCustomerLeadger,
  getAllCustomerLeadger,
  getCustomerLeadgerById,
  updateCustomerLeadger,
  deleteCustomerLeadger,
};
