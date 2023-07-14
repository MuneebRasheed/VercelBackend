const { User } = require('../models');
const bcrypt = require('bcryptjs');
const JWT =require("jsonwebtoken")


const loginCont = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user is registered
    let user = await User.findOne({ email });
    if (!user) {
      return res.send({
        message: 'Please register',
      });
    } else {
      // Compare password
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.send({
          message: 'Incorrect password',
        });
      }

      // Password is correct, proceed with JWT
      const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1D' });
      res.status(201).send({
          message: "User Successfully Login",
          user: {
              name: user.name,
              email: user.email
          },
          token
      });
      return res.send({
        message: 'User Successfully Login',
        user: {
          name: user.name,
          email: user.email,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = loginCont;
