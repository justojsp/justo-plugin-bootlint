"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 








op;var _os = require("os");var _os2 = _interopRequireDefault(_os);var _path = require("path");var _path2 = _interopRequireDefault(_path);var _child_process = require("child_process");var _child_process2 = _interopRequireDefault(_child_process);var _justoFs = require("justo-fs");var fs = _interopRequireWildcard(_justoFs);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function op(params) {
  var cmd, args = [], res;


  if (params.length === 0) {
    params = { src: [] };} else 
  if (params.length === 1) {
    if (typeof params[0] == "string") params = { src: [params[0]] };else 
    params = params[0];} else 
  if (params.length >= 2) {
    params = { src: params };}


  if (typeof params.src == "string") params.src = [params.src];
  if (typeof params.ignore == "string") params.ignore = [params.ignore];
  if (typeof params.disable == "string") params.disable = [params.disable];
  if (!params.hasOwnProperty("output")) params.output = true;


  if (/^win/.test(_os2.default.platform())) cmd = "bootlint.cmd";else 
  cmd = "bootlint";

  if (params.disable) {
    args.push("--disable");
    args.push(params.disable.join(","));}var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {


    for (var _iterator = params.src[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var f = _step.value;
      if (f.endsWith("/")) addDirToArgs(f);else 
      addFileToArgs(f);}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}



  res = _child_process2.default.spawnSync(cmd, args);

  if (params.output) {
    var msg = undefined;

    msg = res.stdout.toString();
    if (!/\s0 lint error\(s\) found across/.test(msg)) console.log(msg);

    msg = res.stderr.toString();
    if (msg !== "") console.log(msg);}



  return res.status;


  function addFileToArgs(file) {
    if (params.ignore) {var _iteratorNormalCompletion2 = true;var _didIteratorError2 = false;var _iteratorError2 = undefined;try {
        for (var _iterator2 = params.ignore[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {var entry = _step2.value;
          if (_path2.default.normalize(file).startsWith(_path2.default.normalize(entry))) {
            return;}}} catch (err) {_didIteratorError2 = true;_iteratorError2 = err;} finally {try {if (!_iteratorNormalCompletion2 && _iterator2.return) {_iterator2.return();}} finally {if (_didIteratorError2) {throw _iteratorError2;}}}}




    args.push(file);}


  function addDirToArgs(dir) {var _iteratorNormalCompletion3 = true;var _didIteratorError3 = false;var _iteratorError3 = undefined;try {
      for (var _iterator3 = new fs.Dir(dir).entries[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {var entry = _step3.value;
        if (entry instanceof fs.File) addFileToArgs(entry.path);else 
        if (entry instanceof fs.Dir) addDirToArgs(entry.path);}} catch (err) {_didIteratorError3 = true;_iteratorError3 = err;} finally {try {if (!_iteratorNormalCompletion3 && _iterator3.return) {_iterator3.return();}} finally {if (_didIteratorError3) {throw _iteratorError3;}}}}}