const httpStatus = require('http-status');
const { Product} = require('../models');
const ApiError = require('../utils/ApiError');
var ObjectId = require('mongodb').ObjectID;

/**
 * 
 * @param {Object} userBody 
 * @returns Object
 */
const createProduct = async (userBody) => {
      const product = await Product.create(userBody);
      console.log(product)
      return product.toObject();

};

/**
 * 
 * @param {Array} products 
 * @returns Objects
 */
const createManyProducts = async (products)=>{
  return await Product.insertMany(products)
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
const queryProducts = async (filter, options) => {
  const products = await Product.paginate(filter, options);
  return products;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getProductById = async (id) => {
  return await Product.findById(id).lean();
  
};

const productExists = async (id) => {
  let product = await Product.findById(id).lean();
  console.log("products test")
  if(!product){
    throw new ApiError(httpStatus.BAD_REQUEST,`Product with ${id} not exists`)
  }
  return product;
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
const updateProductById = async (userId, updateBody) => {
  const product = await Product.findByIdAndUpdate(userId,updateBody, {
    new: true,
  });
  return product;
};

const updateManyProducts = async (productIds, updateBody) => {
  const products = await Product.updateMany({_id:{$in:productIds}},{"$set":updateBody}, {
    new: true,
  });
  return products;
};

const updateManyProductsCategory = async ({parent,name}, updateBody) => {
  const products = await Product.updateMany({category:{$in:name},parent:{$in:parent}},{"$set":updateBody}, {
    new: true,
  });
  return products;
};

const deleteManyProducts = async (productIds) => {
  const products = await Product.updateMany({_id:productIds},{isDocDelete:true});
  return products;
};



/**
 * Delete product by id
 * @param {ObjectId} productId
 * @returns {Promise<User>}
 */
const deleteProductById = async (productId) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  console.log('In_doc_delete')
  await Product.findOneAndUpdate({_id:productId},{$set:{isDocDelete:true}},{new:true})
  
  return product;
};

const deleteProducts = async (productIds)=>{
  const deleted = await Product.deleteMany({_id:{$in:productIds}});
  return true;
}

const searchProductsByName = async (keyword, page, perPage) => {
  return await Product.find({ name: { $regex: keyword, $options: 'i' } })
    .limit(parseInt(perPage))
    .skip(page * perPage);
};

const addCategories = async(userId,categories,selectedSubCategoryPercentage)=>{
  const product = await Product.findByIdAndUpdate(userId,
    {category:categories,sub_category_percentage:selectedSubCategoryPercentage},
    {new:true});
  return product;
}

const getCategoriesGroups = async (workspaceId)=>{
  const countCategories = await Product.aggregate([{
    $match:{
      "workspace":new ObjectId(workspaceId),
      "is_parent_product":true
    }},
    {$group:{
      "_id":{"category":"$category","parent":"$parent"},
      "count":{$sum:1}
    }
  },{ $sort : { parent : 1 } }])
  return countCategories;
}
const addOption = async ( productId , optionsBody)=>{
  const optionAdd = await Product.findByIdAndUpdate(productId,{$push:{options:optionsBody}},{new:true})
  return optionAdd;
}

const editOption = async ( query , optionsBody)=>{
  const {productId, optionId} = query;
  const optionEdit = await Product.findOneAndUpdate({_id:productId,'options._id':optionId},{$push:{'options.$.option_value':optionsBody}},{new:true})
  return optionEdit;
}

const removeOptionValue = async ( query , optionsBody)=>{
  const {productId, optionId} = query;
  const optionEdit = await Product.findOneAndUpdate({_id:productId,'options._id':optionId},{$pull:{'options.$.option_value':optionsBody}},{new:true});  
  return optionEdit;
}

const deleteOption = async ( query)=>{
  const {productId, optionId} = query;
  const optionRemove = await Product.findOneAndUpdate({_id:productId},{$pull:{'options':{'_id':optionId}}},{new:true}) 
  return optionRemove;
}

const addVariation = async ( productId , variationsBody)=>{
  const variationAdd = await Product.findByIdAndUpdate(productId,{$push:{variations:variationsBody}},{new:true})  
  return variationAdd;
}

// const editVariation = async ( productId , variationsBody)=>{
//   const variationAdd = await Product.findByIdAndUpdate(productId,{$push:{variations:variationsBody}},{new:true})
//   console.log(variationAdd);  
//   return variationAdd;
// }

const deleteVariation = async ( query,)=>{
  const {productId, variationId} = query;
  const variationRemove = await Product.findByIdAndUpdate({_id:productId},{$pull:{'variations':{'_id':variationId}}},{new:true})
  return variationRemove;
}

const countOptionProducts = async (workspace,optionName)=>{
  const productCount = await Product.countDocuments({workspace,'options.option_name':optionName})
  return productCount;
} 

module.exports = {
  createProduct,
  createManyProducts,
  queryProducts,
  getProductById,
  productExists,
  updateProductById,
  updateManyProducts,
  updateManyProductsCategory,
  deleteProductById,
  deleteProducts,
  searchProductsByName,
  addCategories,
  getCategoriesGroups,
  addOption,
  addVariation,
  editOption,
  deleteOption,
  deleteVariation,
  removeOptionValue,
  deleteManyProducts,
  countOptionProducts,


};
