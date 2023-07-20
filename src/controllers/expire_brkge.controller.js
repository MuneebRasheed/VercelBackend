const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { expire_brkge_Service } = require('../services');

const createExpireBrkge = catchAsync(async (req, res) => {
  const user = await expire_brkge_Service.createexpirebrkge(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getAllExpireBrkge = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'Permission']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await expire_brkge_Service.queryexpirebrkge(filter, options);
  res.send(result);
});

const getExpireBrkgeById = catchAsync(async (req, res) => {
  const result = await expire_brkge_Service.getexpirebrkgebyId(req.params.id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Expiry not found');
  }
  res.send(result);
});

const updateExpireBrkge = catchAsync(async (req, res) => {
  const result = await expire_brkge_Service.updateShiftById(req.params.id, req.body);
  res.send(result);
});

const deleteExpireBrkge = catchAsync(async (req, res) => {
  await expire_brkge_Service.deleteexpirebrkgeById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send("Delete Expiry item");
});

module.exports = {
  createExpireBrkge,
  getAllExpireBrkge,
  getExpireBrkgeById,
  updateExpireBrkge,
  deleteExpireBrkge,
};
