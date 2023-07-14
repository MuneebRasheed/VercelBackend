const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { roleService } = require('../services');

const createRole = catchAsync(async (req, res) => {
  const user = await roleService.createRoles(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getRoles = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'Permission']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await roleService.queryRoles(filter, options);
  res.send(result);
});

const getRole = catchAsync(async (req, res) => {
  const role = await roleService.getRoleById(req.params.id);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }
  res.send(role);
});

const updateRole = catchAsync(async (req, res) => {
  const user = await roleService.updateRolesById(req.params.id, req.body);
  res.send(user);
});

const deleteRole = catchAsync(async (req, res) => {
  await roleService.deleteRoleById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send("Delete User");
});

module.exports = {
  createRole,
  getRoles,
  getRole,
  updateRole,
  deleteRole,
};
