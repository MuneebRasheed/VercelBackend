const httpStatus = require('http-status');
const { Customer } = require('../models');
const ApiError = require('../utils/ApiError');
var ObjectId = require('mongodb').ObjectID;

/**
 * 
 * @param {Object} userBody 
 * @returns Object
 */
const createCustomer = async (userBody) => {
      const salesman = await Customer.create(userBody);
      return salesman.toObject();
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
const queryCustomer = async (filter, options) => {
  const customer = await Customer.paginate(filter, options);
  return customer;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getCustomerById = async (id) => {
  return await Customer.findById(id).lean();
};


/**
 * Update user by id
 * @param {ObjectId} productId
 * @param {Object} updateBody
 * @returns {Promise<Product>}
 */
const updateCustomerById = async (customerId, updateBody) => {
  const customer = await Customer.findByIdAndUpdate(customerId,updateBody, {
    new: true,
  });
  return customer;
};

/**
 * Delete product by id
 * @param {ObjectId} customerId
 * @returns {Promise<User>}
 */
const deleteCustomerById = async (customerId) => {
  const customer = await getCustomerById(customerId);
  if (!customer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'customer not found');
  }
  await Customer.findOneAndUpdate({_id:customerId},{$set:{isDocDelete:true}},{new:true})
  return customer;
};




module.exports = {
  createCustomer,
  queryCustomer,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,

};
