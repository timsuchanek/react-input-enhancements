"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = deprecated;
var WARNED = [];

function deprecated(message) {
  if (WARNED.indexOf(message) === -1) {
    console.warn(message); // eslint-disable-line no-console
    WARNED.push(message);
  }
}