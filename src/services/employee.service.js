const httpStatus = require('http-status');
const { Employee } = require('../models');
const ApiError = require('../utils/ApiError');
var ObjectId = require('mongodb').ObjectID;

/**
 * 
 * @param {Object} userBody 
 * @returns Object
 */
const createEmployee = async (userBody) => {
      const employee = await Employee.create(userBody);
      return employee.toObject();
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
const queryEmployee = async (filter, options) => {
  const employee = await Employee.paginate(filter, options);
  return employee;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getEmployeeById = async (id) => {
  return await Employee.findById(id).lean();
};


/**
 * Update user by id
 * @param {ObjectId} productId
 * @param {Object} updateBody
 * @returns {Promise<Product>}
 */
const updateEmployeeById = async (employeeId, updateBody) => {
  const employee = await Employee.findByIdAndUpdate(employeeId,updateBody, {
    new: true,
  });
  return employee;
};

/**
 * Delete product by id
 * @param {ObjectId} customerId
 * @returns {Promise<User>}
 */
const deleteEmployeeById = async (customerId) => {
  const customer = await getEmployeeById(customerId);
  if (!customer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee not found');
  }
  await Employee.findOneAndUpdate({_id:customerId},{$set:{isDocDelete:true}},{new:true})
  return customer;
};




module.exports = {
  createEmployee,
  queryEmployee,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,

};