const httpStatus = require('http-status');
const { Roles } = require('../models');
const ApiError = require('../utils/ApiError');
var ObjectId = require('mongodb').ObjectID;

/**
 * 
 * @param {Object} userBody 
 * @returns Object
 */
const createRoles = async (userBody) => {
      const role = await Roles.create(userBody);
      return role.toObject();
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
// const queryRoles = async (filter, options) => {
//   const role = await Roles.paginate(filter, options);
//   return role;
// };
const queryRoles = async (filter, options) => {
    const { sortBy, limit = 10, page = 1 } = options;
    const sort = sortBy ? { [sortBy.split(':')[0]]: sortBy.split(':')[1] === 'desc' ? -1 : 1 } : {};
  
    const roles = await Roles.find(filter)
      .sort(sort)
      .limit(limit)
      .skip(limit * (page - 1))
      .exec();
  
    return roles;
  };
/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getRoleById = async (id) => {
  return await Roles.findById(id);
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
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<Product>}
 */
const updateRolesById = async (id, updateBody) => {
  const role = await Roles.findByIdAndUpdate(id,updateBody, {
    new: true,
  });
  return role;
};

/**
 * Delete product by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const deleteRoleById = async (id) => {
  const role = await getRoleById(id);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await role.remove();
  return role;
};

const searchRolesByName = async (keyword, page, perPage) => {
  return await Roles.find({ name: { $regex: keyword, $options: 'i' } })
    .limit(parseInt(perPage))
    .skip(page * perPage);
};


module.exports = {
  createRoles,
  queryRoles,
  getRoleById,
  updateRolesById,
  deleteRoleById,
  searchRolesByName,

};
