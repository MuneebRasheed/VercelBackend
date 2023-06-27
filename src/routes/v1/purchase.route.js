const express = require('express');
const {auth} = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
// const tankValidation = require('../../validations/product.validation');
const purchaseController = require('../../controllers/purchase.controller');

const router = express.Router();

router.post('/createFuel',
  // auth('manageUsers'), validate(userValidation.createUser),
   purchaseController.createFuel);
  
router.get('/getAllFuel',
// [
  // auth('manageUsers'),
  //  validate(productValidation.getProductsVS)   ],
   purchaseController.getFuels)

// router.route('/:userId').delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.getUser);
router.get('/detailsFuel', 
// validate(userValidation.getUser),
   purchaseController.getFuel);

router.put('/updateFuel',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   purchaseController.updateFuel);

   router.delete('/deleteFuel',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   purchaseController.deleteFuel);

// --------------------- OTHER --------------------------


  router.post('/createOther',
  // auth('manageUsers'), validate(userValidation.createUser),
   purchaseController.createOther);
  
router.get('/getAllOther',
// [
  // auth('manageUsers'),
  //  validate(productValidation.getProductsVS)   ],
   purchaseController.getOthers)

// router.route('/:userId').delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.getUser);
router.get('/detailsOther', 
// validate(userValidation.getUser),
   purchaseController.getOther);

router.put('/updateOther',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   purchaseController.updateOther);

   router.delete('/deleteOther',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   purchaseController.deleteOther);
  
module.exports = router;
