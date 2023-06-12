const express = require('express');
const {auth} = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
// const tankValidation = require('../../validations/product.validation');
const tankController = require('../../controllers/tank.controller');

const router = express.Router();

router.post('/create',
  // auth('manageUsers'), validate(userValidation.createUser),
   tankController.createTank);

router.post('/add-dip',
  // auth('manageUsers'), validate(userValidation.createUser),
   tankController.addDipChart);
  
router.get('/getTanks',
// [
  // auth('manageUsers'),
  //  validate(productValidation.getProductsVS)   ],
   tankController.getTanks)

router.get('/getDipCharts',
// [
  // auth('manageUsers'),
  //  validate(productValidation.getProductsVS)   ],
   tankController.getDipCharts)

// router.route('/:userId').delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.getUser);
router.get('/details', 
// validate(userValidation.getUser),
   tankController.getTank);

router.put('/update',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   tankController.updateTank);

router.put('/update',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   tankController.updateDipChart);

   router.delete('/delete',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   tankController.deleteTank);

   router.delete('/delete',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   tankController.deleteDipChart);
  
module.exports = router;
