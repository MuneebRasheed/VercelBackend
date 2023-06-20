const httpStatus = require('http-status');
const { FuelSale, OtherSale } = require('../models');
const ApiError = require('../utils/ApiError');
var ObjectId = require('mongodb').ObjectID;

/**
 * 
 * @param {Object} userBody 
 * @returns Object
 */
const createFuel = async (userBody) => {
      const document = await FuelSale.create(userBody);
      return document.toObject();
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
const queryFuel = async (filter, options) => {
  const documents = await FuelSale.paginate(filter, options);
  return documents;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getFuelById = async (id) => {
  return await FuelSale.findById(id).lean();
};


/**
 * Update user by id
 * @param {ObjectId} productId
 * @param {Object} updateBody
 * @returns {Promise<Product>}
 */
const updateFuelById = async (Id, updateBody) => {
  const document = await FuelSale.findByIdAndUpdate(Id,updateBody, {
    new: true,
  });
  return document;
};

/**
 * Delete product by id
 * @param {ObjectId} customerId
 * @returns {Promise<User>}
 */
const deleteFuelById = async (Id) => {
  const document = await getFuelById(Id);
  if (!document) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Fuel Purchase not found');
  }
  await FuelSale.findOneAndUpdate({_id:Id},{$set:{isDocDelete:true}},{new:true})
  return document;
};

// ------------------------- OTHER FUEL SERVICES --------------------------

/**
 * 
 * @param {Object} userBody 
 * @returns Object
 */
const createOther = async (userBody) => {
  const document = await OtherSale.create(userBody);
  return document.toObject();
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
const queryOther = async (filter, options) => {
const document = await OtherSale.paginate(filter, options);
return document;
};

/**
* Get user by id
* @param {ObjectId} id
* @returns {Promise<User>}
*/
const getOtherById = async (id) => {
return await OtherSale.findById(id).lean();
};


/**
* Update user by id
* @param {ObjectId} productId
* @param {Object} updateBody
* @returns {Promise<Product>}
*/
const updateOtherById = async (Id, updateBody) => {
const document = await OtherSale.findByIdAndUpdate(Id,updateBody, {
new: true,
});
return document;
};

/**
* Delete product by id
* @param {ObjectId} Id
* @returns {Promise<User>}
*/
const deleteOtherById = async (Id) => {
const document = await getCustomerById(Id);
if (!document) {
throw new ApiError(httpStatus.NOT_FOUND, 'OtherPurchase not found');
}
await OtherSale.findOneAndUpdate({_id:Id},{$set:{isDocDelete:true}},{new:true})
return document;
};



module.exports = {
  createFuel,
  queryFuel,
  getFuelById,
  updateFuelById,
  deleteFuelById,
  createOther,
  queryOther,
  getOtherById,
  updateOtherById,
  deleteOtherById,

};
