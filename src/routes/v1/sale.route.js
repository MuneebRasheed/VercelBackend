const express = require('express');
const {auth} = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
// const tankValidation = require('../../validations/product.validation');
const saleController = require('../../controllers/sale.controller');

const router = express.Router();

router.post('/createFuel',
  // auth('manageUsers'), validate(userValidation.createUser),
   saleController.createFuel);
  
router.get('/getAllFuel',
// [
  // auth('manageUsers'),
  //  validate(productValidation.getProductsVS)   ],
   saleController.getFuels)

// router.route('/:userId').delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.getUser);
router.get('/detailsFuel', 
// validate(userValidation.getUser),
   saleController.getFuel);

router.put('/updateFuel',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   saleController.updateFuel);

   router.delete('/deleteFuel',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   saleController.deleteFuel);

// --------------------- OTHER --------------------------


  router.post('/createOther',
  // auth('manageUsers'), validate(userValidation.createUser),
   saleController.createOther);
  
router.get('/getAllOther',
// [
  // auth('manageUsers'),
  //  validate(productValidation.getProductsVS)   ],
   saleController.getOthers)

// router.route('/:userId').delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.getUser);
router.get('/detailsOther', 
// validate(userValidation.getUser),
   saleController.getOther);

router.put('/updateFuel',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   saleController.updateOther);

   router.delete('/deleteOther',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   saleController.deleteOther);
  
module.exports = router;
