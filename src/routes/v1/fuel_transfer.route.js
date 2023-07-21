const express = require('express');
const {auth} = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
// const tankValidation = require('../../validations/product.validation');
const fuel_Transfer_controller = require('../../controllers/fuel_transfer.controller');

const router = express.Router();

router.post('/create',
  // auth('manageUsers'), validate(userValidation.createUser),
   fuel_Transfer_controller.createfuelTransfer);
  
router.get('/getAll',
// [
  // auth('manageUsers'),
  //  validate(productValidation.getProductsVS)   ],
   fuel_Transfer_controller.getAllfuelTransfer)

// router.route('/:userId').delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.getUser);
router.get('/details/:id', 
// validate(userValidation.getUser),
   fuel_Transfer_controller.getfuelTransferById);

router.put('/update/:id',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   fuel_Transfer_controller.updatefuelTransfer);

   router.delete('/delete/:id',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   fuel_Transfer_controller.deletefuelTransfer);
  
module.exports = router;
