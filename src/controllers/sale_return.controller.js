const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { sale_Return_Service } = require('../services');

const createSalesReturn = catchAsync(async (req, res) => {
  const SalesReturn = await sale_Return_Service.create_Sale_Return(req.body);
  res.status(httpStatus.CREATED).send(SalesReturn);
});

const getAllSalesReturn = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'Permission']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await sale_Return_Service.query_Sale_Return(filter, options);
  res.send(result);
});

const getSalesReturnbyId = catchAsync(async (req, res) => {
  const SalesReturn = await sale_Return_Service.get_Sale_Return_ById(req.params.id);
  if (!SalesReturn) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sale Return not found');
  }
  res.send(SalesReturn);
});

const updateSalesReturn = catchAsync(async (req, res) => {
  const SalesReturn = await sale_Return_Service.updateSale_ReturnById(req.params.id, req.body);
  res.send(SalesReturn);
});

const deleteSalesReturn = catchAsync(async (req, res) => {
  await sale_Return_Service.deleteSale_ReturnById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send("Delete Sale Return");
});

module.exports = {
  createSalesReturn,
  getAllSalesReturn,
  getSalesReturnbyId,
  updateSalesReturn,
  deleteSalesReturn,
};
