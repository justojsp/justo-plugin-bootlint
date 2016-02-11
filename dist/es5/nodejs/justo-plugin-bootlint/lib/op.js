"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 






op;var _os = require("os");var _os2 = _interopRequireDefault(_os);var _child_process = require("child_process");var _child_process2 = _interopRequireDefault(_child_process);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function op(params) {
  var cmd, args = [], res;


  if (params.length === 0) {
    params = { src: [] };} else 
  if (params.length === 1) {
    if (typeof params[0] == "string") params = { src: [params[0]] };else 
    params = params[0];} else 
  if (params.length >= 2) {
    params = { src: params };}


  if (typeof params.src == "string") params.src = [params.src];
  if (typeof params.disable == "string") params.disable = [params.disable];
  if (!params.hasOwnProperty("output")) params.output = true;


  if (/^win/.test(_os2.default.platform())) cmd = "bootlint.cmd";else 
  cmd = "bootlint";

  if (params.disable) {
    args.push("--disable");
    args.push(params.disable.join(","));}var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {


    for (var _iterator = params.src[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var f = _step.value;args.push(f);}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}


  res = _child_process2.default.spawnSync(cmd, args);

  if (params.output) {
    var msg = undefined;

    msg = res.stdout.toString();
    if (!/\s0 lint error\(s\) found across/.test(msg)) console.log(msg);

    msg = res.stderr.toString();
    if (msg !== "") console.log(msg);}



  return res.status;}