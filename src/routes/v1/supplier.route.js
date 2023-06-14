const express = require('express');
const {auth} = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
// const SupplierValidation = require('../../validations/Supplier.validation');
const supplierController = require('../../controllers/supplier.controller');

const router = express.Router();

router.post('/create',
  // auth('manageUsers'), validate(userValidation.createUser),
   supplierController.create);
  
router.get('/getAll',
// [
  // auth('manageUsers'),
  //  validate(SupplierValidation.getSuppliersVS)   ],
   supplierController.getSuppliers)

// router.route('/:userId').delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.getUser);
router.get('/details', 
// validate(userValidation.getUser),
   supplierController.getSupplier);

router.put('/update',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   supplierController.updateSupplier);

   router.delete('/delete',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   supplierController.deleteSupplier);
   
   
module.exports = router;
