const express = require('express');
const {auth} = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
// const tankValidation = require('../../validations/product.validation');
const employeeController = require('../../controllers/employee.controller');

const router = express.Router();

router.post('/create',
  // auth('manageUsers'), validate(userValidation.createUser),
   employeeController.createEmployee);
  
router.get('/getAll',
// [
  // auth('manageUsers'),
  //  validate(productValidation.getProductsVS)   ],
   employeeController.getEmployees)

// router.route('/:userId').delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.getUser);
router.get('/details', 
// validate(userValidation.getUser),
   employeeController.getEmployee);

router.put('/update',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   employeeController.updateEmployee);

   router.delete('/delete',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   employeeController.deleteEmployee);
  
module.exports = router;
