
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');


const createProduct = catchAsync(async(req,res)=>{
        console.log(req.body);
        let product = await productService.createProduct(req.body);
        res.status(httpStatus.CREATED).send({message:"Successfull",product})   
  })


const getProducts = catchAsync(async (req, res) => {
  console.log("testing get product")
  const filter = pick(req.query, ['name', ]);
  const options = pick(req.query, ['sortBy', 'limit', 'page','populate']);
  
    const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
    
    if(filter.name){
      const searchRgx = rgx(filter.name) ;
      filter.name = {$regex:searchRgx,$options:'i'}
    }
    filter.isDocDelete = false 
    
      const result = await productService.queryProducts(filter, options);
      res.status(httpStatus.OK).send(result);
  });
  
const getProduct = catchAsync(async (req, res) => {
    const product = await productService.getProductById(req.query.Id);
    if (!product) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }
    res.send({ status: true, message: 'Successfull', product });
});

const updateProduct = catchAsync(async (req, res) => {
    const body = req.body;
  const product = await productService.updateProductById(req.query.Id, body);
  res.send(product);
});

const deleteProduct = catchAsync(async (req, res) => {
  let product = await productService.deleteProductById(req.query.Id);
    res.status(httpStatus.OK).send({message: 'Product Deleted Successfully!',product});
});



module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,

  };
  