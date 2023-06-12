const httpStatus = require('http-status');
const { Supplier } = require('../models');
const ApiError = require('../utils/ApiError');
var ObjectId = require('mongodb').ObjectID;

/**
 * 
 * @param {Object} userBody 
 * @returns Object
 */
const createSupplier = async (userBody) => {
      const supplier = await Supplier.create(userBody);
      return supplier.toObject();
};

/**
 * 
 * @param {Array} suppliers 
 * @returns Objects
 */
const createManySuppliers = async (suppliers)=>{
  return await Supplier.insertMany(suppliers)
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
const querySuppliers = async (filter, options) => {
  const suppliers = await Supplier.paginate(filter, options);
  return suppliers;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getSupplierById = async (id) => {
  return await Supplier.findById(id).lean();
};

const supplierExists = async (id) => {
  let supplier = await Supplier.findById(id).lean();
  if(!supplier){
    throw new ApiError(httpStatus.BAD_REQUEST,`supplier with ${id} not exists`)
  }
  return supplier;
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
const updateSupplierById = async (supplierId, updateBody) => {
  const supplier = await Supplier.findByIdAndUpdate(supplierId,updateBody, {
    new: true,
  });
  return supplier;
};

/**
 * Delete product by id
 * @param {ObjectId} supplierId
 * @returns {Promise<User>}
 */
const deleteSupplierById = async (supplierId) => {
  const supplier = await getsupplierById(supplierId);
  if (!supplier) {
    throw new ApiError(httpStatus.NOT_FOUND, 'supplier not found');
  }
  await Supplier.findOneAndUpdate({_id:supplierId},{$set:{isDocDelete:true}},{new:true})
  
  return supplier;
};

const searchSuppliersByName = async (keyword, page, perPage) => {
  return await Supplier.find({ name: { $regex: keyword, $options: 'i' } })
    .limit(parseInt(perPage))
    .skip(page * perPage);
};


module.exports = {
  createSupplier,
  createManySuppliers,
  querySuppliers,
  getSupplierById,
  supplierExists,
  updateSupplierById,
  deleteSupplierById,
  searchSuppliersByName,

};
