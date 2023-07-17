const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { shiftService } = require('../services');

const createShift = catchAsync(async (req, res) => {
  const user = await shiftService.createShift(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getAllShift = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'Permission']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await shiftService.queryShift(filter, options);
  res.send(result);
});

const getShiftbyId = catchAsync(async (req, res) => {
  const shift = await shiftService.getShiftById(req.params.id);
  if (!shift) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Shift not found');
  }
  res.send(shift);
});

const updateShift = catchAsync(async (req, res) => {
  const shift = await shiftService.updateShiftById(req.params.id, req.body);
  res.send(shift);
});

const deleteShift = catchAsync(async (req, res) => {
  await shiftService.deleteShiftById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send("Delete Shift");
});

module.exports = {
  createShift,
  getAllShift,
  getShiftbyId,
  updateShift,
  deleteShift,
};
