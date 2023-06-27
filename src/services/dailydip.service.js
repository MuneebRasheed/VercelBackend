const httpStatus = require('http-status');
const { DailyDip } = require('../models');
const ApiError = require('../utils/ApiError');
var ObjectId = require('mongodb').ObjectID;

/**
 * 
 * @param {Object} userBody 
 * @returns Object
 */
const createDailyDip = async (userBody) => {
      const dailydip = await DailyDip.create(userBody);
      return dailydip.toObject();
};

/**
 * 
 * @param {Array} dailydips 
 * @returns Objects
 */
const createManyDailyDips = async (dailydips)=>{
  return await DailyDip.insertMany(dailydips)
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
const queryDailyDips = async (filter, options) => {
  const dailydips = await DailyDip.paginate(filter, options);
  return dailydips;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getDailyDipById = async (id) => {
  return await DailyDip.findById(id).lean();
};

const dailydipExists = async (id) => {
  let dailydip = await DailyDip.findById(id).lean();
  if(!dailydip){
    throw new ApiError(httpStatus.BAD_REQUEST,`dailydip with ${id} not exists`)
  }
  return dailydip;
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
const updateDailyDipById = async (dailydipId, updateBody) => {
  const dailydip = await DailyDip.findByIdAndUpdate(dailydipId,updateBody, {
    new: true,
  });
  return dailydip;
};

/**
 * Delete product by id
 * @param {ObjectId} dailydipId
 * @returns {Promise<User>}
 */
const deleteDailyDipById = async (dailydipId) => {
  const dailydip = await getDailyDipById(dailydipId);
  if (!dailydip) {
    throw new ApiError(httpStatus.NOT_FOUND, 'dailydip not found');
  }
  await DailyDip.findOneAndUpdate({_id:dailydipId},{$set:{isDocDelete:true}},{new:true})
  
  return dailydip;
};

const searchDailyDipsByName = async (keyword, page, perPage) => {
  return await DailyDip.find({ name: { $regex: keyword, $options: 'i' } })
    .limit(parseInt(perPage))
    .skip(page * perPage);
};


module.exports = {
  createDailyDip,
  createManyDailyDips,
  queryDailyDips,
  getDailyDipById,
  dailydipExists,
  updateDailyDipById,
  deleteDailyDipById,
  searchDailyDipsByName,

};
