"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _user = _interopRequireDefault(require("../controllers/user.controller"));
var _middleWare = _interopRequireDefault(require("../middlewares/middleWare"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();
router.post('/user/new', _middleWare["default"].verifyToken, _middleWare["default"].checkRoles, _middleWare["default"].isAdmin, _user["default"].createUser).get('/user/get', _middleWare["default"].verifyToken, _middleWare["default"].isAdmin, _user["default"].getAllUsers).get('/user/get/:userId', _middleWare["default"].verifyToken, _middleWare["default"].isAdmin, _user["default"].getUserById).put('/user/update/:userId', _middleWare["default"].verifyToken, _middleWare["default"].isAdmin, _user["default"].updateUserById)["delete"]('/user/del/:userId', _middleWare["default"].verifyToken, _middleWare["default"].isAdmin, _user["default"].deleteUserById);
var _default = router;
exports["default"] = _default;