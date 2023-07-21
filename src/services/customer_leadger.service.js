const httpStatus = require('http-status');
const { Customer_leadger } = require('../models');
const ApiError = require('../utils/ApiError');
// const shift = require('../models/shift.model');
var ObjectId = require('mongodb').ObjectID;

/**
 * 
 * @param {Object} userBody 
 * @returns Object
 */
const createCustomerLeadger = async (userBody) => {
      const result = await Customer_leadger.create(userBody);
      return result.toObject();
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
const queryCustomerLeadger = async (filter, options) => {
  const result = await Customer_leadger.paginate(filter, options);
  return result;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getCustomerLeadger = async (id) => {
  return await Customer_leadger.findById(id).lean();
};


/**
 * Update user by id
 * @param {ObjectId} Customer_leadger_id
 * @param {Object} updateBody
 * @returns {Promise<Product>}
 */
const updateCustomerLeadgerById = async (Customer_leadger_id, updateBody) => {
  const result = await Customer_leadger.findByIdAndUpdate(Customer_leadger_id,updateBody, {
    new: true,
  });
  return result;
};

/**
 * Delete product by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const deleteCustomerLeadgerById = async (id) => {
  const result = await getCustomerLeadger(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Customer_leadger not found');
  }
  await Customer_leadger.findOneAndDelete({ _id: id });
  return result;
};





module.exports = {
  createCustomerLeadger,
  queryCustomerLeadger,
  getCustomerLeadger,
  updateCustomerLeadgerById,
  deleteCustomerLeadgerById,

};
