const httpStatus = require('http-status');
const { Dipchart } = require('../models');
const ApiError = require('../utils/ApiError');
var ObjectId = require('mongodb').ObjectID;

/**
 * 
 * @param {Object} userBody 
 * @returns Object
 */
const createDipchart = async (userBody) => {
      const dipchart = await Dipchart.create(userBody);
      return dipchart.toObject();
};

/**
 * 
 * @param {Array} dipcharts 
 * @returns Objects
 */
const createManyDipcharts = async (dipcharts)=>{
  return await Dipchart.insertMany(dipcharts)
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
const queryDipcharts = async (filter, options) => {
  const dipcharts = await Dipchart.paginate(filter, options);
  return dipcharts;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getDipchartById = async (id) => {
  return await Dipchart.findById(id).lean();
};

const dipchartExists = async (id) => {
  let dipchart = await Dipchart.findById(id).lean();
  if(!dipchart){
    throw new ApiError(httpStatus.BAD_REQUEST,`dipchart with ${id} not exists`)
  }
  return dipchart;
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
const updateDipchartById = async (dipchartId, updateBody) => {
  const dipchart = await Dipchart.findByIdAndUpdate(dipchartId,updateBody, {
    new: true,
  });
  return dipchart;
};

/**
 * Delete product by id
 * @param {ObjectId} dipchartId
 * @returns {Promise<User>}
 */
const deleteDipchartById = async (dipchartId) => {
  const dipchart = await getDipchartById(dipchartId);
  if (!dipchart) {
    throw new ApiError(httpStatus.NOT_FOUND, 'dipchart not found');
  }
  await Dipchart.findOneAndUpdate({_id:dipchartId},{$set:{isDocDelete:true}},{new:true})
  
  return dipchart;
};

const searchDipchartsByName = async (keyword, page, perPage) => {
  return await Dipchart.find({ name: { $regex: keyword, $options: 'i' } })
    .limit(parseInt(perPage))
    .skip(page * perPage);
};


module.exports = {
  createDipchart,
  createManyDipcharts,
  queryDipcharts,
  getDipchartById,
  dipchartExists,
  updateDipchartById,
  deleteDipchartById,
  searchDipchartsByName,

};
