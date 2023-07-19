const express = require('express');
const {auth} = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
// const tankValidation = require('../../validations/product.validation');
const SalesReturnController = require('../../controllers/sale_return.controller');

const router = express.Router();

router.post('/create',
  // auth('manageUsers'), validate(userValidation.createUser),
   SalesReturnController.createSalesReturn);
  
router.get('/getAll',
// [
  // auth('manageUsers'),
  //  validate(productValidation.getProductsVS)   ],
   SalesReturnController.getAllSalesReturn)

// router.route('/:userId').delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.getUser);
router.get('/details/:id', 
// validate(userValidation.getUser),
   SalesReturnController.getSalesReturnbyId);

router.put('/update/:id',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   SalesReturnController.updateSalesReturn);

   router.delete('/delete/:id',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   SalesReturnController.deleteSalesReturn);
  
module.exports = router;
