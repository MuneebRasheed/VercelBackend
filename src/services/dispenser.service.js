const httpStatus = require('http-status');
const { Dispenser } = require('../models');
const ApiError = require('../utils/ApiError');
var ObjectId = require('mongodb').ObjectID;

/**
 * 
 * @param {Object} userBody 
 * @returns Object
 */
const createDispenser = async (userBody) => {
      const dispenser = await Dispenser.create(userBody);
      return dispenser.toObject();
};

/**
 * 
 * @param {Array} dispensers 
 * @returns Objects
 */
const createManyDispensers = async (dispensers)=>{
  return await Dispenser.insertMany(dispensers)
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
const queryDispensers = async (filter, options) => {
  const dispensers = await Dispenser.paginate(filter, options);
  return dispensers;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getDispenserById = async (id) => {
  return await Dispenser.findById(id).lean();
};

const dispenserExists = async (id) => {
  let dispenser = await Dispenser.findById(id).lean();
  if(!dispenser){
    throw new ApiError(httpStatus.BAD_REQUEST,`dispenser with ${id} not exists`)
  }
  return dispenser;
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
const updateDispenserById = async (dispenserId, updateBody) => {
  const dispenser = await Dispenser.findByIdAndUpdate(dispenserId,updateBody, {
    new: true,
  });
  return dispenser;
};

const updateManyDispensers = async (dispenserIds, updateBody) => {
  const dispensers = await Dispenser.updateMany({_id:{$in:dispenserIds}},{"$set":updateBody}, {
    new: true,
  });
  return dispensers;
};



const deleteManyDispensers = async (dispenserIds) => {
  const dispensers = await Dispenser.updateMany({_id:dispenserIds},{isDocDelete:true});
  return dispensers;
};



/**
 * Delete product by id
 * @param {ObjectId} dispenserId
 * @returns {Promise<User>}
 */
const deleteDispenserById = async (dispenserId) => {
  const dispenser = await getdispenserById(dispenserId);
  if (!dispenser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'dispenser not found');
  }
  await Dispenser.findOneAndUpdate({_id:dispenserId},{$set:{isDocDelete:true}},{new:true})
  
  return dispenser;
};

const searchDispensersByName = async (keyword, page, perPage) => {
  return await Dispenser.find({ name: { $regex: keyword, $options: 'i' } })
    .limit(parseInt(perPage))
    .skip(page * perPage);
};


module.exports = {
  createDispenser,
  createManyDispensers,
  queryDispensers,
  getDispenserById,
  dispenserExists,
  updateDispenserById,
  updateManyDispensers,
  deleteDispenserById,
  searchDispensersByName,
  deleteManyDispensers,

};
