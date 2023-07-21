const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { fuel_transfer_service } = require('../services');

const createfuelTransfer = catchAsync(async (req, res) => {
  const user = await fuel_transfer_service.createfuel_Transfer(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getAllfuelTransfer = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'Permission']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await fuel_transfer_service.queryfuel_Transfer(filter, options);
  res.send(result);
});

const getfuelTransferById = catchAsync(async (req, res) => {
  const result = await fuel_transfer_service.getfuel_Transfer(req.params.id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'employee transection not found');
  }
  res.send(result);
});

const updatefuelTransfer = catchAsync(async (req, res) => {
  const result = await fuel_transfer_service.updatefuel_TransferById(req.params.id, req.body);
  res.send(result);
});

const deletefuelTransfer = catchAsync(async (req, res) => {
  await fuel_transfer_service.deletefuel_TransferById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send("Delete Succesfully");
});

module.exports = {
  createfuelTransfer,
  getAllfuelTransfer,
  getfuelTransferById,
  updatefuelTransfer,
  deletefuelTransfer,
};
