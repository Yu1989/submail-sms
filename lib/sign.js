'use strict'

var crypto = require('crypto')
var _ = require('lodash')
var isObject = _.isObject

/**
 * Generate signature for Submail requests
 * @param {object} data - Data to sign
 * @param {string} appid - Id of app on Submail
 * @param {string} secret - Secret of app on Submail
 * @return {string} Signature generated
 */
var sign = function (data, appid, secret) {
  if (!isObject(data)) throw new Error('Data to sign should be object')

  var keys = _(data).keys().sortBy().value()
  var parts = []
  for (var i = 0; i < keys.length; ++i) {
    var key = keys[i]
    parts.push(key + '=' + data[key])
  }
  var strToSign = appid + secret + parts.join('&') + appid + secret
  return crypto.createHash('sha1').update(strToSign).digest('hex')
}

module.exports = sign
