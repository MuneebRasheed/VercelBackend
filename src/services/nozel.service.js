const httpStatus = require('http-status');
const { Nozel } = require('../models');
const ApiError = require('../utils/ApiError');
var ObjectId = require('mongodb').ObjectID;

/**
 * 
 * @param {Object} body 
 * @returns Object
 */
const createNozel = async (body) => {
      const nozel = await Nozel.create(body);
      return nozel.toObject();
};

/**
 * 
 * @param {Array} nozels 
 * @returns Objects
 */
const createManyNozels = async (nozels)=>{
  return await Nozel.insertMany(nozels)
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
const queryNozels = async (filter, options) => {
  const nozels = await Nozel.paginate(filter, options);
  return nozels;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getNozelById = async (id) => {
  return await Nozel.findById(id).lean();
};

const nozelExists = async (id) => {
  let nozel = await Nozel.findById(id).lean();
  if(!nozel){
    throw new ApiError(httpStatus.BAD_REQUEST,`nozel with ${id} not exists`)
  }
  return nozel;
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
const updateNozelById = async (nozelId, updateBody) => {
  const nozel = await Nozel.findByIdAndUpdate(nozelId,updateBody, {
    new: true,
  });
  return nozel;
};

const updateManyNozels = async (nozelIds, updateBody) => {
  const nozels = await Nozel.updateMany({_id:{$in:nozelIds}},{"$set":updateBody}, {
    new: true,
  });
  return nozels;
};



const deleteManyNozels = async (nozelIds) => {
  const nozels = await Nozel.updateMany({_id:nozelIds},{isDocDelete:true});
  return nozels;
};



/**
 * Delete product by id
 * @param {ObjectId} nozelId
 * @returns {Promise<User>}
 */
const deleteNozelById = async (nozelId) => {
  const nozel = await getNozelById(nozelId);
  if (!nozel) {
    throw new ApiError(httpStatus.NOT_FOUND, 'nozel not found');
  }
  await Nozel.findOneAndUpdate({_id:nozelId},{$set:{isDocDelete:true}},{new:true})
  
  return nozel;
};

const searchNozelsByName = async (keyword, page, perPage) => {
  return await Nozel.find({ name: { $regex: keyword, $options: 'i' } })
    .limit(parseInt(perPage))
    .skip(page * perPage);
};


module.exports = {
  createNozel,
  createManyNozels,
  queryNozels,
  getNozelById,
  nozelExists,
  updateNozelById,
  updateManyNozels,
  deleteNozelById,
  searchNozelsByName,
  deleteManyNozels,

};
