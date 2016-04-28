'use strict'

var request = require('./request')
var timestampUri = 'https://api.submail.cn/service/timestamp.json'

/**
 * Fetch timestamp from Submail server
 * @param {function} callback - Callback function. Can be omitted
 * @return {Promise} Promise if callback is not passed
 */
var getTimestamp = function (callback) {
  var options = {
    method: 'get',
    uri: timestampUri
  }

  return request(options, callback)
}

module.exports = getTimestamp
