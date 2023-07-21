const express = require('express');
const {auth} = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
// const tankValidation = require('../../validations/product.validation');
const customer_leadger = require('../../controllers/customer_leadger.controller');

const router = express.Router();

router.post('/create',
  // auth('manageUsers'), validate(userValidation.createUser),
   customer_leadger.createCustomerLeadger);
  
router.get('/getAll',
// [
  // auth('manageUsers'),
  //  validate(productValidation.getProductsVS)   ],
   customer_leadger.getAllCustomerLeadger)

// router.route('/:userId').delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.getUser);
router.get('/details/:id', 
// validate(userValidation.getUser),
   customer_leadger.getCustomerLeadgerById);

router.put('/update/:id',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   customer_leadger.updateCustomerLeadger);

   router.delete('/delete/:id',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   customer_leadger.deleteCustomerLeadger);
  
module.exports = router;
