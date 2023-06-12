const express = require('express');
const {auth} = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
// const tankValidation = require('../../validations/product.validation');
const dispenserController = require('../../controllers/dispenser.controller');

const router = express.Router();

router.post('/create',
  // auth('manageUsers'), validate(userValidation.createUser),
   dispenserController.createDispenser);
  
router.get('/getDispensers',
// [
  // auth('manageUsers'),
  //  validate(productValidation.getProductsVS)   ],
   dispenserController.getDispensers)

// router.route('/:userId').delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.getUser);
router.get('/details', 
// validate(userValidation.getUser),
   dispenserController.getDispenser);

router.put('/update',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   dispenserController.updateDispenser);

   router.delete('/delete',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   dispenserController.deleteDispenser);
  
module.exports = router;
