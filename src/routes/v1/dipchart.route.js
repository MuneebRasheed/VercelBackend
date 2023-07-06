const express = require('express');
const {auth} = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
// const tankValidation = require('../../validations/product.validation');
const dipchartController = require('../../controllers/dipchart.controller');

const router = express.Router();

router.post('/create',
  // auth('manageUsers'), validate(userValidation.createUser),
   dipchartController.createDipchart);
  
router.get('/getAll',
// [
  // auth('manageUsers'),
  //  validate(productValidation.getProductsVS)   ],
   dipchartController.getDipcharts)

// router.route('/:userId').delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.getUser);
router.get('/details', 
// validate(userValidation.getUser),
   dipchartController.getDipchart);

router.put('/update',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   dipchartController.updateDipchart);

   router.delete('/delete',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   dipchartController.deleteDipchart);
  
module.exports = router;
