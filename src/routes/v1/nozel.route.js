const express = require('express');
const {auth} = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
// const tankValidation = require('../../validations/product.validation');
const nozelController = require('../../controllers/nozel.controller');

const router = express.Router();

router.post('/create',
  // auth('manageUsers'), validate(userValidation.createUser),
   nozelController.createNozel);
  
router.get('/getNozels',
// [
  // auth('manageUsers'),
  //  validate(productValidation.getProductsVS)   ],
   nozelController.getNozels)

// router.route('/:userId').delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.getUser);
router.get('/details', 
// validate(userValidation.getUser),
   nozelController.getNozel);

router.put('/update',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   nozelController.updateNozel);

   router.delete('/delete',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   nozelController.deleteNozel);
  
module.exports = router;
