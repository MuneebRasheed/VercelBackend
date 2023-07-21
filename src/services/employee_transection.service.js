const httpStatus = require('http-status');
const { Employee_Transection } = require('../models');
const ApiError = require('../utils/ApiError');
// const shift = require('../models/shift.model');
var ObjectId = require('mongodb').ObjectID;

/**
 * 
 * @param {Object} userBody 
 * @returns Object
 */
const createEmployeeTransection = async (userBody) => {
      const result = await Employee_Transection.create(userBody);
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
const queryEmployeeTransection = async (filter, options) => {
  const result = await Employee_Transection.paginate(filter, options);
  return result;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getEmployeeTransection = async (id) => {
  return await Employee_Transection.findById(id).lean();
};


/**
 * Update user by id
 * @param {ObjectId} Employee_Transection_id
 * @param {Object} updateBody
 * @returns {Promise<Product>}
 */
const updateEmployeeTransectionById = async (Employee_Transection_id, updateBody) => {
  const result = await Employee_Transection.findByIdAndUpdate(Employee_Transection_id,updateBody, {
    new: true,
  });
  return result;
};

/**
 * Delete product by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const deleteEmployeeTransectionById = async (id) => {
  const result = await getEmployeeTransection(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee_Transection not found');
  }
  await Employee_Transection.findOneAndDelete({ _id: id });
  return result;
};





module.exports = {
  createEmployeeTransection,
  queryEmployeeTransection,
  getEmployeeTransection,
  updateEmployeeTransectionById,
  deleteEmployeeTransectionById,

};
