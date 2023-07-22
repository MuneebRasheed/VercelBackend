const httpStatus = require('http-status');
const { service_Station } = require('../models');
const ApiError = require('../utils/ApiError');
var ObjectId = require('mongodb').ObjectID;

/**
 * 
 * @param {Object} userBody 
 * @returns Object
 */
const createServiceStation = async (userBody) => {
      const result = await service_Station.create(userBody);
      return result.toObject();
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
const queryServiceStation = async (filter, options) => {
  const result = await service_Station.paginate(filter, options);
  return result;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getServiceStation = async (id) => {
  return await service_Station.findById(id).lean();
};


/**
 * Update user by id
 * @param {ObjectId} service_Station_id
 * @param {Object} updateBody
 * @returns {Promise<Product>}
 */
const updateServiceStationById = async (service_Station_id, updateBody) => {
  const result = await service_Station.findByIdAndUpdate(service_Station_id,updateBody, {
    new: true,
  });
  return result;
};

/**
 * Delete product by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const deleteServiceStationById = async (id) => {
  const result = await getServiceStation(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'service_Station not found');
  }
  await service_Station.findOneAndDelete({ _id: id });
  return result;
};





module.exports = {
  createServiceStation,
  queryServiceStation,
  getServiceStation,
  updateServiceStationById,
  deleteServiceStationById,

};
