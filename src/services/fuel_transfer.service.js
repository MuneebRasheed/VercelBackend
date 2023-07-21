const httpStatus = require('http-status');
const { fuel_Transfer } = require('../models');
const ApiError = require('../utils/ApiError');
// const shift = require('../models/shift.model');
var ObjectId = require('mongodb').ObjectID;

/**
 * 
 * @param {Object} userBody 
 * @returns Object
 */
const createfuel_Transfer = async (userBody) => {
      const result = await fuel_Transfer.create(userBody);
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
const queryfuel_Transfer = async (filter, options) => {
  const result = await fuel_Transfer.paginate(filter, options);
  return result;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getfuel_Transfer = async (id) => {
  return await fuel_Transfer.findById(id).lean();
};


/**
 * Update user by id
 * @param {ObjectId} fuel_Transfer_id
 * @param {Object} updateBody
 * @returns {Promise<Product>}
 */
const updatefuel_TransferById = async (fuel_Transfer_id, updateBody) => {
  const result = await fuel_Transfer.findByIdAndUpdate(fuel_Transfer_id,updateBody, {
    new: true,
  });
  return result;
};

/**
 * Delete product by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const deletefuel_TransferById = async (id) => {
  const result = await getfuel_Transfer(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'fuel_Transfer not found');
  }
  await fuel_Transfer.findOneAndDelete({ _id: id });
  return result;
};





module.exports = {
  createfuel_Transfer,
  queryfuel_Transfer,
  getfuel_Transfer,
  updatefuel_TransferById,
  deletefuel_TransferById,

};
