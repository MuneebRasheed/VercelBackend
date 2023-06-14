const httpStatus = require('http-status');
const { Tank,DipChart } = require('../models');
const ApiError = require('../utils/ApiError');
var ObjectId = require('mongodb').ObjectID;

/**
 * 
 * @param {Object} userBody 
 * @returns Object
 */
const createTank = async (userBody) => {
      const tank = await Tank.create(userBody);
      return tank.toObject();
};

const addDipChart = async (userBody) => {
      const addDipChart = await DipChart.create(userBody);
      return addDipChart.toObject();
};

const updateDipChart = async (id,body) => {
      const updateDipChart = await DipChart.findByIdAndUpdate(id,body,{new:true});
      return updateDipChart
};

const deleteDipChart = async (id,body) => {
      const deleteDipChart = await DipChart.findByIdAndDelete(id);
      return deleteDipChart.toObject();
};

/**
 * 
 * @param {Array} tanks 
 * @returns Objects
 */
const createManyTanks = async (tanks)=>{
  return await Tank.insertMany(tanks)
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
const queryTanks = async (filter, options) => {
  const tanks = await Tank.paginate(filter, options);
  return tanks;
};

const getDipCharts = async (filter, options) => {
  const dips = await DipChart.paginate(filter, options);
  return dips;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getTankById = async (id) => {
  return await Tank.findById(id).lean();
};

const tankExists = async (id) => {
  let tank = await Tank.findById(id).lean();
  if(!tank){
    throw new ApiError(httpStatus.BAD_REQUEST,`Tank with ${id} not exists`)
  }
  return tank;
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
const updateTankById = async (tankId, updateBody) => {
  const tank = await Tank.findByIdAndUpdate(tankId,updateBody, {
    new: true,
  });
  return tank;
};

const updateManyTanks = async (tankIds, updateBody) => {
  const tanks = await Tank.updateMany({_id:{$in:tankIds}},{"$set":updateBody}, {
    new: true,
  });
  return tanks;
};



const deleteManyTanks = async (tankIds) => {
  const tanks = await Tank.updateMany({_id:tankIds},{isDocDelete:true});
  return tanks;
};



/**
 * Delete product by id
 * @param {ObjectId} tankId
 * @returns {Promise<User>}
 */
const deleteTankById = async (tankId) => {
  const tank = await getTankById(tankId);
  if (!tank) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tank not found');
  }
  await Tank.findOneAndUpdate({_id:tankId},{$set:{isDocDelete:true}},{new:true})
  
  return tank;
};

const searchProductsByName = async (keyword, page, perPage) => {
  return await Tank.find({ name: { $regex: keyword, $options: 'i' } })
    .limit(parseInt(perPage))
    .skip(page * perPage);
};


module.exports = {
  createTank,
  createManyTanks,
  queryTanks,
  getTankById,
  tankExists,
  updateTankById,
  updateManyTanks,
  deleteTankById,
  searchProductsByName,
  deleteManyTanks,
  addDipChart,
  getDipCharts,
  updateDipChart,
  deleteDipChart
};
