const httpStatus = require('http-status');
const { sale_return } = require('../models');
const ApiError = require('../utils/ApiError');
// const shift = require('../models/shift.model');
var ObjectId = require('mongodb').ObjectID;

/**
 * 
 * @param {Object} userBody 
 * @returns Object
 */
const create_Sale_Return = async (userBody) => {
      const customer_Sale_Return = await sale_return.create(userBody);
      return customer_Sale_Return.toObject();
};


  
/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const query_Sale_Return = async (filter, options) => {
  const customer_Sale_Return = await sale_return.paginate(filter, options);
  return customer_Sale_Return;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const get_Sale_Return_ById = async (id) => {
  return await sale_return.findById(id).lean();
};


/**
 * Update user by id
 * @param {ObjectId} Sale_Return_Id
 * @param {Object} updateBody
 * @returns {Promise<Product>}
 */
const updateSale_ReturnById = async (Sale_Return_Id, updateBody) => {
  const customer_Sale_Return = await sale_return.findByIdAndUpdate(Sale_Return_Id,updateBody, {
    new: true,
  });
  return customer_Sale_Return;
};

/**
 * Delete product by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const deleteSale_ReturnById = async (id) => {
  const customer_Sale_Return = await get_Sale_Return_ById(id);
  if (!customer_Sale_Return) {
    throw new ApiError(httpStatus.NOT_FOUND, 'customer_Sale_Return not found');
  }
  await sale_return.findOneAndDelete({ _id: id });
  return customer_Sale_Return;
};





module.exports = {
  create_Sale_Return,
  query_Sale_Return,
  get_Sale_Return_ById,
  updateSale_ReturnById,
  deleteSale_ReturnById,

};
