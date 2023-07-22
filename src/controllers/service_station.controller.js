const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { service_station_service } = require('../services');

const createServiceStation = catchAsync(async (req, res) => {
  const user = await service_station_service.createServiceStation(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getAllServiceStation = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'Permission']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await service_station_service.queryServiceStation(filter, options);
  res.send(result);
});

const getServiceStationById = catchAsync(async (req, res) => {
  const result = await service_station_service.getServiceStation(req.params.id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'employee transection not found');
  }
  res.send(result);
});

const updateServiceStation = catchAsync(async (req, res) => {
  const result = await service_station_service.updateServiceStationById(req.params.id, req.body);
  res.send(result);
});

const deleteServiceStation = catchAsync(async (req, res) => {
  await service_station_service.deleteServiceStationById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send("Delete Succesfully");
});

module.exports = {
  createServiceStation,
  getAllServiceStation,
  getServiceStationById,
  updateServiceStation,
  deleteServiceStation,
};
