const express = require('express');
const {auth} = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
// const tankValidation = require('../../validations/product.validation');
const expire_brkgeController = require('../../controllers/expire_brkge.controller');

const router = express.Router();

router.post('/create',
  // auth('manageUsers'), validate(userValidation.createUser),
   expire_brkgeController.createExpireBrkge);
  
router.get('/getAll',
// [
  // auth('manageUsers'),
  //  validate(productValidation.getProductsVS)   ],
   expire_brkgeController.getAllExpireBrkge)

// router.route('/:userId').delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.getUser);
router.get('/details/:id', 
// validate(userValidation.getUser),
   expire_brkgeController.getExpireBrkgeById);

router.put('/update/:id',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   expire_brkgeController.updateExpireBrkge);

   router.delete('/delete/:id',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   expire_brkgeController.deleteExpireBrkge);
  
module.exports = router;
