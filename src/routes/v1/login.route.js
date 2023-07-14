const express = require('express');
// const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
// const userValidation = require('../../validations/user.validation');
const loginCont = require('../../controllers/login.controller');

const router = express.Router();

router
  .route('/')
  .post(loginCont)
  


module.exports = router;