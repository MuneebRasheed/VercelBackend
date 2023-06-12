
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { productService, workspaceService } = require('../services');
const { uploadToAws } = require('../utils/helpers');
var excelToJson = require('convert-excel-to-json')
const fs = require('fs');
const EVENT = require('../triggers/custom-events').customEvent;
const { NOTIFICATION_TYPE } = require('../utils/enums');
const {roleAuthorization}=require('../middlewares/auth');
const { Product } = require('../models');
const { queryProducts } = require('../services/product.service');
const mongoose = require('mongoose')

const createProduct = catchAsync(async(req,res)=>{
    let workspace = await workspaceService.getWorkspaceById(req.body.workspace);
    if(workspace){
      
      const body = {...req.body};
      let imgData ;
      let location ;
      
      if(body?.image?.includes('base64')){
        let buf = Buffer.from(req.body.image.replace(/^data:image\/\w+;base64,/, ""),'base64')
        const type = body.image.split(';')[0].split('/')[1];
        if (type == 'jpg' ||type == 'gif' || type == 'png' || type == 'jpeg' || type == 'mp4' || type == 'mpeg'){
          imgData = await uploadToAws(buf,`${Date.now()}-product-pic.${type}`);
          location = imgData.Location
        }
        body.image=location
      }
      let productsVariationBody = []
      let variationsProduct;
      if(body.variations?.length){
        await Promise.all(body.variations.map(async (variation) => {
          let variationBody = {}//...body
          let product_name = body.name
          variationBody['parent_product_name'] = product_name
          variationBody['name'] = variation.name
          variationBody.selling_price = variation.selling_price
          variationBody.sku = variation.sku
          variationBody.barcode = variation.barcode
          variationBody.workspace = body.workspace
          variationBody.user = body.user
          variationBody.category = body.category
          variationBody.parent = body.parent
          if(variation?.image?.includes('base64')){
            let location;
            let buf = Buffer.from(variation.image.replace(/^data:image\/\w+;base64,/, ""),'base64')
            const type = variation.image.split(';')[0].split('/')[1];
            if (type == 'jpg' ||type == 'gif' || type == 'png' || type == 'jpeg' || type == 'mp4' || type == 'mpeg'){
              imgData = await uploadToAws(buf,`${Date.now()}-product-pic.${type}`);
              location = imgData.Location
            }
            variationBody.image = location
          }
          productsVariationBody.push(variationBody);
        }))
  
          variationsProduct = await productService.createManyProducts(productsVariationBody);
          let variationsProductslist = variationsProduct.map(variationProduct => variationProduct._id )
          body.variations = variationsProductslist
        
        }
        let product = await productService.createProduct(body);
  
        await workspaceService.updateWorkspaceById(product.workspace,{$set:{product_bool:true}})
        res.status(httpStatus.CREATED).send({message:"Successfull",product})
  
      // Add - variations - parent - product ------------
      if(body.variations){
        EVENT.emit('add-variation-parent-product',{
        variations:product.variations,
        productId : product._id
      });
    }

    }
    
  })


const getProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'category', 'parent','selling_price','workspace','_id','is_parent_product']);
  const options = pick(req.query, ['sortBy', 'limit', 'page','populate']);
  
    const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
    if(filter.category){
      const searchRgx = rgx(filter.category) ;
      filter.category = {$regex:searchRgx,$options:'i'}
    }
    if(filter.name){
      const searchRgx = rgx(filter.name) ;
      filter.name = {$regex:searchRgx,$options:'i'}
    }
    if(filter.selling_price){
      const searchRgx = rgx(filter.selling_price) ;
      filter.selling_price = {$regex:searchRgx,$options:'i'}
    }

    filter.isDocDelete = false 
    filter.is_parent_product = true

      const result = await productService.queryProducts(filter, options);
      res.status(httpStatus.OK).send(result);
  });
  
const getProduct = catchAsync(async (req, res) => {
    const product = await productService.getProductById(req.query.productId);
    if (!product) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }
    res.send({ status: true, message: 'Successfull', product });
});

const updateProduct = catchAsync(async (req, res) => {
    const body = req.body;
    // const files=req.files;
    var imgData ;
    var location ;
  // if (req.files !== undefined && req.files.length > 0 ) {
  //   const ext = files[i].originalname.split('.').pop();
  //   let img = await uploadToAws(req.files[0].buffer, `${Date.now}-product-pic.${ext}`);
  //   body.image = img.Location;
  // }
  if(body?.image?.includes('base64')){
    var buf = Buffer.from(req.body.image.replace(/^data:image\/\w+;base64,/, ""),'base64')
    const type = body.image.split(';')[0].split('/')[1];
    if (type == 'jpg' ||type == 'gif' || type == 'png' || type == 'jpeg' || type == 'mp4' || type == 'mpeg'){
      imgData = await uploadToAws(buf,`${Date.now()}-product-pic.${type}`);
      location = imgData.Location
    }
    body.image=location
  }
  const product = await productService.updateProductById(req.query.productId, body);
  res.send(product);
});

const updateProductMany = catchAsync (async (req,res)=>{
  const updatedDocs = await productService.updateManyProducts(req.body.products,req.body.updateBody);
  res.status(httpStatus.OK).send({message:'Updated Successfully!',updatedDocs});
})

const deleteProductMany = catchAsync (async (req,res)=>{
  const updatedDocs = await productService.deleteManyProducts(req.body.products);
  res.status(httpStatus.OK).send({message:'Updated Successfully!',updatedDocs});
})

const deleteProduct = catchAsync(async (req, res) => {
  let product
  if(req.body.productIds?.length){
    await productService.deleteProducts(req.body.productIds);
  }else{
    product = await productService.deleteProductById(req.query.productId);
  }
  if(!product.is_parent_product){
    EVENT.emit('remove-variation-product',{
      productId: product.parent_product_id,
      variationId: product._id,
    })
  }
  // EVENT.emit('remove-product-workspace',{
  //   productId:product._id,
  //   workspace:product.workspace
  // });
  res.status(httpStatus.OK).send({message: 'Product Deleted Successfully!'});
});

const addOption = catchAsync(async (req,res)=>{
  const optionAdded = await productService.addOption(req.query.productId,req.body)
  res.status(httpStatus.OK).send({message:'Successful', optionAdded})
})

const editOption = catchAsync(async(req,res)=>{
  const edited = await productService.editOption(req.query,req.body.option_value)
  res.status(httpStatus.OK).send({message:'Successful', edited })
})

const removeOptionValue = catchAsync(async(req,res)=>{
  const edited = await productService.removeOptionValue(req.query,req.body.option_value)
  res.status(httpStatus.OK).send({message:'Successful', edited })
})

const deleteOption = catchAsync(async(req,res)=>{
  const deleted = await productService.deleteOption(req.query)
  res.status(httpStatus.OK).send({message:'Successful', deleted })
})

const addVariation = catchAsync(async (req,res)=>{
  const variationAdded = await productService.addVariation(req.query.productId,req.body)
  res.status(httpStatus.OK).send({message:'Successful', optionAdded: variationAdded})
})

const deleteVariation = catchAsync(async (req,res)=>{
  const variationAdded = await productService.deleteVariation(req.query,req.body)
  res.status(httpStatus.OK).send({message:'Successful', optionAdded: variationAdded})
})

const saveExcelData = catchAsync(async (req,res)=>{
  const {workspace} = req.body;
  const excelFile = req.files[0];
  const ext = req.files[0].originalname.split('.').pop();
  if(ext == 'xls' || ext == 'xlsx'){
    const excelData = excelToJson({
      source:  excelFile.buffer,
      sheets:[{
      // Excel Sheet Name
      name: 'Sheet1',
      // Header Row -> be skipped and will not be present at our result object.
      header:{
      rows: 1
      },
      // Mapping columns to keys
      columnToKey: {
      A: 'No',
      B: 'name',
      C: 'option_name',
      D: 'option_value',
      E: 'category',
      F: 'sku',
      G: 'barcode',
      H: 'selling_price',
      I: 'image',
      J: 'unit',
      K: 'tax'
      }
      }]
      });
      // -> Log Excel Data to Console
      // Insert Json-Object to MongoDB
      let importData = excelData.Sheet1;
      // let variations= []
      let products = []
       importData.forEach((jsonObj,index,arr)=>{
        // if(index < 3){
        if(jsonObj.name != '' || jsonObj.name != undefined || jsonObj.name != null){
          arr.split(index,1);
        }else {
          
        
        let findindex = null  
        let result = 0 
        let matched = false
        products.forEach((item,pIndex)=>{
          findindex = pIndex
          if(item?.length > 0){
            console.log(item[0].name.toLowerCase().trim() == jsonObj.name.toLowerCase().trim());
            
            // return item.filter( x =>{
            //     if(x.name == jsonObj.name){
            //       findindex = pIndex
            //       return
            //     }
            //   })
              }
            })
            // console.log("MatchedAt: ", findindex);
            // console.log("----------------------------",result)
          if(result > 0 && findindex){
            console.log('first ', {result, findindex});
            products[findindex].push(jsonObj)
          }else{
            console.log('second ', {result, findindex});
            products.push([jsonObj])
          }
        }
        // }
      })
      // console.log("products=>>>>",products)
      // let products = importData.forEach(( eachObj, index )=>{
      //   if(variations.indexOf(obj=> obj))  
      //   variations.push(eachObj)

      //   let newObj = {}
      //   let sameProducts = importData.find(( innerObj ) => {
      //     if( eachObj.name == innerObj.name && index != nestedIndex ){
      //         return eachObj
      //     }
      //   // console.log(sameProducts);
      //   })
      //   console.log("sameProducts===>>>>>>>>>",sameProducts);
      //   products.push(sameProducts);
      //   })
      // console.log("Products===>>>>>>>>>",importData);
        // const [, ...rest] = excel
        // excel.forEach((row,index,arr)=>{
        //   if(index == 1){
        //     products.push(row)
        //   }
        //   rest.forEach((newRow,newIndex)=>{  
        //     if (row.name == newRow.name){
        //       row.variations.push(newRow)
        //       arr.splice(newIndex++)
        //       products.push(row)
        //     }

        //   })
        // })
      
      // const products = await productService.createManyProducts(excelData.Sheet1)
      if(products){
        res.status(httpStatus.CREATED).send({message:'Successfull',products});
      }
      ;
       
  }
});


module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    updateProductMany,
    deleteProduct,
    addOption,
    editOption,
    removeOptionValue,
    deleteOption,
    addVariation,
    deleteVariation,
    saveExcelData,
    deleteProductMany

  };
  