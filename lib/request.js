'use strict'

var Promise = require('bluebird')
var request = require('request')

/**
 * Helper function that wraps requests to Submail
 * to call callback or return a promise if callback is not passed
 * @param {object} options - Request options
 * @param {function} callback - Callback function. Can be omitted
 * @return {Promise} Promise if callback is not passed
 */
var submailRequest = function (options, callback) {
  if (options.json == null) options.json = true

  if (callback) {
    return request(options, function (err, response, body) {
      callback(err, body)
    })
  }

  return new Promise(function (resolve, reject) {
    request(options, function (err, response, body) {
      if (err) return reject(err)
      resolve(body)
    })
  })
}

module.exports = submailRequest
