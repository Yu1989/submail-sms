'use strict';

var Promise_ = require('bluebird');
var request = require('request-promise');

exports.client = function (key, secret) {
  this.key = key;
  this.secret = secret;
  return this;
}
