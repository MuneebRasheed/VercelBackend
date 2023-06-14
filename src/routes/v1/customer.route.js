const express = require('express');
const {auth} = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
// const tankValidation = require('../../validations/product.validation');
const customerController = require('../../controllers/customer.controller');

const router = express.Router();

router.post('/create',
  // auth('manageUsers'), validate(userValidation.createUser),
   customerController.createCustomer);
  
router.get('/getAll',
// [
  // auth('manageUsers'),
  //  validate(productValidation.getProductsVS)   ],
   customerController.getCustomers)

// router.route('/:userId').delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.getUser);
router.get('/details', 
// validate(userValidation.getUser),
   customerController.getCustomer);

router.put('/update',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   customerController.updateCustomer);

   router.delete('/delete',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   customerController.deleteCustomer);
  
module.exports = router;
