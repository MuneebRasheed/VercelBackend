const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const roleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      enum : ['Manager','SaleMan','Customer'],
      default: 'Manager'
    },
    Permission: {
        type: String,
        enum : ['Supplier',"UserProfile","FuelRates","Dispenser","Sales","Daily Dip"],
        default: 'UserProfile'
    },
    // role: {
    //   type: String,
    //   enum: roles,
    //   default: 'user',
    // },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Role
 */
const Role = mongoose.model('Roles', roleSchema);

module.exports = Role;

// // add plugin that converts mongoose to json
// roleSchema.plugin(toJSON);
// roleSchema.plugin(paginate);

// /**
//  * Check if email is taken
//  * @param {string} email - The user's email
//  * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
//  * @returns {Promise<boolean>}
//  */
// roleSchema.statics.isEmailTaken = async function (email, excludeUserId) {
//   const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
//   return !!user;
// };

// /**
//  * Check if password matches the user's password
//  * @param {string} password
//  * @returns {Promise<boolean>}
//  */
// roleSchema.methods.isPasswordMatch = async function (password) {
//   const user = this;
//   return bcrypt.compare(password, user.password);
// };

// roleSchema.pre('save', async function (next) {
//   const user = this;
//   if (user.isModified('password')) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }
//   next();
// });


