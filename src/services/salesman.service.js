const httpStatus = require('http-status');
const { Salesman } = require('../models');
const ApiError = require('../utils/ApiError');
var ObjectId = require('mongodb').ObjectID;

/**
 * 
 * @param {Object} userBody 
 * @returns Object
 */
const createSalesman = async (userBody) => {
      const salesman = await Salesman.create(userBody);
      return salesman.toObject();
};

/**
 * 
 * @param {Array} carriages 
 * @returns Objects
 */
const createManyCarriages = async (carriages)=>{
  return await Salesman.insertMany(carriages)
}

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const querySalesman = async (filter, options) => {
  const salesman = await Salesman.paginate(filter, options);
  return salesman;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getSalesmanById = async (id) => {
  return await Salesman.findById(id).lean();
};

const carriageExists = async (id) => {
  let carriage = await Salesman.findById(id).lean();
  if(!carriage){
    throw new ApiError(httpStatus.BAD_REQUEST,`carriage with ${id} not exists`)
  }
  return carriage;
};
// /**
//  * Get user by id
//  * @param {ObjectId} userId
//  * @param {Object} updateBody
//  * @returns {Promise<User>}
//  */
// const blockUserById = async (userId,updateBody)=>{
//   const user = await User.findByIdAndUpdate(userId,updateBody,{new:true}).lean()
//   return user;
// }

/**
 * Update user by id
 * @param {ObjectId} productId
 * @param {Object} updateBody
 * @returns {Promise<Product>}
 */
const updateSalesmanById = async (carriageId, updateBody) => {
  const salesman = await Salesman.findByIdAndUpdate(carriageId,updateBody, {
    new: true,
  });
  return salesman;
};

/**
 * Delete product by id
 * @param {ObjectId} salesmanId
 * @returns {Promise<User>}
 */
const deleteSalesmanById = async (salesmanId) => {
  const salesman = await getSalesmanById(salesmanId);
  if (!salesman) {
    throw new ApiError(httpStatus.NOT_FOUND, 'salesman not found');
  }
  await Salesman.findOneAndUpdate({_id:salesmanId},{$set:{isDocDelete:true}},{new:true})
  return salesman;
};

const searchSalesmanByName = async (keyword, page, perPage) => {
  return await Salesman.find({ name: { $regex: keyword, $options: 'i' } })
    .limit(parseInt(perPage))
    .skip(page * perPage);
};


module.exports = {
  createSalesman,
  createManyCarriages,
  querySalesman,
  getSalesmanById,
  carriageExists,
  updateSalesmanById,
  deleteSalesmanById,
  searchSalesmanByName,

};
