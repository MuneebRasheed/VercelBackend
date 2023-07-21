const express = require('express');
const {auth} = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
// const tankValidation = require('../../validations/product.validation');
const employee_transection_controller = require('../../controllers/employee_transection.controller');

const router = express.Router();

router.post('/create',
  // auth('manageUsers'), validate(userValidation.createUser),
   employee_transection_controller.createemployeetransection);
  
router.get('/getAll',
// [
  // auth('manageUsers'),
  //  validate(productValidation.getProductsVS)   ],
   employee_transection_controller.getAllemployeetransection)

// router.route('/:userId').delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.getUser);
router.get('/details/:id', 
// validate(userValidation.getUser),
   employee_transection_controller.getemployeetransectionById);

router.put('/update/:id',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   employee_transection_controller.updateemployeetransection);

   router.delete('/delete/:id',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   employee_transection_controller.deleteemployeetransection);
  
module.exports = router;
