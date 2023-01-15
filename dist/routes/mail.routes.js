"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _mailer = _interopRequireDefault(require("nodemailer/lib/mailer"));
var _mail = _interopRequireDefault(require("../mailing/mail"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();
router.post('/email', _mail["default"].sendEmail);
var _default = router;
exports["default"] = _default;