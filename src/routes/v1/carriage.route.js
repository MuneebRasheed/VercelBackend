const express = require('express');
const {auth} = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
// const tankValidation = require('../../validations/product.validation');
const carriageController = require('../../controllers/carriage.controller');

const router = express.Router();

router.post('/create',
  // auth('manageUsers'), validate(userValidation.createUser),
   carriageController.createCarriage);
  
router.get('/getAll',
// [
  // auth('manageUsers'),
  //  validate(productValidation.getProductsVS)   ],
   carriageController.getCarriages)

// router.route('/:userId').delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.getUser);
router.get('/details', 
// validate(userValidation.getUser),
   carriageController.getCarriage);

router.put('/update',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   carriageController.updateCarriage);

   router.delete('/delete',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   carriageController.deleteCarriage);
  
module.exports = router;
