const httpStatus = require('http-status');
const { Carriage } = require('../models');
const ApiError = require('../utils/ApiError');
var ObjectId = require('mongodb').ObjectID;

/**
 * 
 * @param {Object} userBody 
 * @returns Object
 */
const createCarriage = async (userBody) => {
      const carriage = await Carriage.create(userBody);
      return carriage.toObject();
};

/**
 * 
 * @param {Array} carriages 
 * @returns Objects
 */
const createManyCarriages = async (carriages)=>{
  return await Carriage.insertMany(carriages)
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
const queryCarriages = async (filter, options) => {
  const carriages = await Carriage.paginate(filter, options);
  return carriages;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getCarriageById = async (id) => {
  return await Carriage.findById(id).lean();
};

const carriageExists = async (id) => {
  let carriage = await Carriage.findById(id).lean();
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
const updateCarriageById = async (carriageId, updateBody) => {
  const carriage = await Carriage.findByIdAndUpdate(carriageId,updateBody, {
    new: true,
  });
  return carriage;
};

/**
 * Delete product by id
 * @param {ObjectId} carriageId
 * @returns {Promise<User>}
 */
const deleteCarriageById = async (carriageId) => {
  const carriage = await getcarriageById(carriageId);
  if (!carriage) {
    throw new ApiError(httpStatus.NOT_FOUND, 'carriage not found');
  }
  await Carriage.findOneAndUpdate({_id:carriageId},{$set:{isDocDelete:true}},{new:true})
  
  return carriage;
};

const searchCarriagesByName = async (keyword, page, perPage) => {
  return await Carriage.find({ name: { $regex: keyword, $options: 'i' } })
    .limit(parseInt(perPage))
    .skip(page * perPage);
};


module.exports = {
  createCarriage,
  createManyCarriages,
  queryCarriages,
  getCarriageById,
  carriageExists,
  updateCarriageById,
  deleteCarriageById,
  searchCarriagesByName,

};
