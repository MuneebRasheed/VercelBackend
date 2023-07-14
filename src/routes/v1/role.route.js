const express = require('express');
const {auth} = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
// const tankValidation = require('../../validations/product.validation');
const rolesController = require('../../controllers/role.controller');

const router = express.Router();

router.post('/create',
  // auth('manageUsers'), validate(userValidation.createUser),
   rolesController.createRole);
  
router.get('/getAll',
// [
  // auth('manageUsers'),
  //  validate(productValidation.getProductsVS)   ],
   rolesController.getRoles)

// router.route('/:userId').delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.getUser);
router.get('/details/:id', 
// validate(userValidation.getUser),
   rolesController.getRole);

router.put('/update/:id',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   rolesController.updateRole);

   router.delete('/delete/:id',
//  [auth('manageUsers'), validate(userValidation.updateUser)],
   rolesController.deleteRole);
  
module.exports = router;
