const httpStatus = require('http-status');
const { expire_brkge } = require('../models');
const ApiError = require('../utils/ApiError');
// const shift = require('../models/shift.model');
var ObjectId = require('mongodb').ObjectID;

/**
 * 
 * @param {Object} userBody 
 * @returns Object
 */
const createexpirebrkge = async (userBody) => {
      const result = await expire_brkge.create(userBody);
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
const queryexpirebrkge = async (filter, options) => {
  const result = await expire_brkge.paginate(filter, options);
  return result;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getexpirebrkgebyId = async (id) => {
  return await expire_brkge.findById(id).lean();
};


/**
 * Update user by id
 * @param {ObjectId} expire_brkge_id
 * @param {Object} updateBody
 * @returns {Promise<Product>}
 */
const updateShiftById = async (expire_brkge_id, updateBody) => {
  const result = await expire_brkge.findByIdAndUpdate(expire_brkge_id,updateBody, {
    new: true,
  });
  return result;
};

/**
 * Delete product by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const deleteexpirebrkgeById = async (id) => {
  const result = await getexpirebrkgebyId(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'expire_brkge not found');
  }
  await expire_brkge.findOneAndDelete({ _id: id });
  return result;
};





module.exports = {
  createexpirebrkge,
  queryexpirebrkge,
  getexpirebrkgebyId,
  updateShiftById,
  deleteexpirebrkgeById,

};
