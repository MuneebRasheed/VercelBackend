const express = require('express');
const {auth} = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
// const tankValidation = require('../../validations/product.validation');
const salesmanController = require('../../controllers/salesman.controller');

const router = express.Router();

router.post('/create',
  // auth('manageUsers'), validate(userValidation.createUser),
   salesmanController.createSalesman);
  
router.get('/getAll',
// [
  // auth('manageUsers'),
  //  validate(productValidation.getProductsVS)   ],
   salesmanController.getSalesmen)

// router.route('/:userId').delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.getUser);
router.get('/details', 
// validate(userValidation.getUser),
   salesmanController.getSalesman);

router.put('/update',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   salesmanController.updateSalesman);

   router.delete('/delete',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   salesmanController.deleteSalesman);
  
module.exports = router;
