const express = require('express');
const {auth} = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
// const tankValidation = require('../../validations/product.validation');
const dailydipController = require('../../controllers/dailydip.controller');

const router = express.Router();

router.post('/create',
  // auth('manageUsers'), validate(userValidation.createUser),
   dailydipController.createDailyDip);
  
router.get('/getAll',
// [
  // auth('manageUsers'),
  //  validate(productValidation.getProductsVS)   ],
   dailydipController.getDailyDips)

// router.route('/:userId').delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.getUser);
router.get('/details', 
// validate(userValidation.getUser),
   dailydipController.getDailyDip);

router.put('/update',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   dailydipController.updateDailyDip);

   router.delete('/delete',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   dailydipController.deleteDailyDip);
  
module.exports = router;
