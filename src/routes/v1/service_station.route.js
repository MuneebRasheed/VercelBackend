const express = require('express');
const {auth} = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
// const tankValidation = require('../../validations/product.validation');
const service_station_controller = require('../../controllers/service_station.controller');

const router = express.Router();

router.post('/create',
  // auth('manageUsers'), validate(userValidation.createUser),
   service_station_controller.createServiceStation);
  
router.get('/getAll',
// [
  // auth('manageUsers'),
  //  validate(productValidation.getProductsVS)   ],
   service_station_controller.getAllServiceStation)

// router.route('/:userId').delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.getUser);
router.get('/details/:id', 
// validate(userValidation.getUser),
   service_station_controller.getServiceStationById);

router.put('/update/:id',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   service_station_controller.updateServiceStation);

   router.delete('/delete/:id',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   service_station_controller.deleteServiceStation);
  
module.exports = router;
