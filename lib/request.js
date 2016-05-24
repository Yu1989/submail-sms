'use strict'

var Promise = require('bluebird')
var request = require('request')
var req = request.defaults({
  baseUrl: 'https://api.submail.cn',
  json: true
})

/**
 * Helper function that wraps requests to Submail
 * to call callback or return a promise if callback is not passed
 * @param {object} options - Request options
 * @param {function} callback - Callback function. Can be omitted
 * @return {Promise} Promise if callback is not passed
 */
var submailRequest = function (options, callback) {
  if (callback) {
    return req(options, function (err, response, body) {
      callback(err, body)
    })
  }

  return new Promise(function (resolve, reject) {
    req(options, function (err, response, body) {
      if (err) return reject(err)
      resolve(body)
    })
  })
}

module.exports = submailRequest
