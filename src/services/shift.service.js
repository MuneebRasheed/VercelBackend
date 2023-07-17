const httpStatus = require('http-status');
const { Shift } = require('../models');
const ApiError = require('../utils/ApiError');
// const shift = require('../models/shift.model');
var ObjectId = require('mongodb').ObjectID;

/**
 * 
 * @param {Object} userBody 
 * @returns Object
 */
const createShift = async (userBody) => {
      const userShift = await Shift.create(userBody);
      return userShift.toObject();
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
const queryShift = async (filter, options) => {
  const userShift = await Shift.paginate(filter, options);
  return userShift;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getShiftById = async (id) => {
  return await Shift.findById(id).lean();
};


/**
 * Update user by id
 * @param {ObjectId} shiftId
 * @param {Object} updateBody
 * @returns {Promise<Product>}
 */
const updateShiftById = async (shiftId, updateBody) => {
  const shift = await Shift.findByIdAndUpdate(shiftId,updateBody, {
    new: true,
  });
  return shift;
};

/**
 * Delete product by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const deleteShiftById = async (id) => {
  const shift = await getShiftById(id);
  if (!shift) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Shift not found');
  }
  await Shift.findOneAndDelete({ _id: id });
  return shift;
};





module.exports = {
  createShift,
  queryShift,
  getShiftById,
  updateShiftById,
  deleteShiftById,

};
