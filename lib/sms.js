'use strict'

var isString = require('lodash/isString')
var isObject = require('lodash/isObject')
var request = require('./request')
var sign = require('./sign')
var getTimestamp = require('./timestamp')

var multiSendUri = 'https://api.submail.cn/message/multixsend.json'

/**
 * Class of Submail SMS, the instance of which should be initialized to send sms
 * @constructor
 * @param {string} appid - Id of your app on Submail
 * @param {string} secret - Secret of your app on Submail
 * @return {object} Instance of SMS
 */
var SMS = function (appid, secret) {
  if (!isString(appid)) throw new Error('appid should be string')
  if (!isString(secret)) throw new Error('secret should be string')

  this._appid = appid
  this._secret = secret
  this._recipients = []
  return this
}

/**
 * Set project(template) for the SMS
 * @param {string} project - The name of the project(template)
 * @return {object} The SMS instance itself
 */
SMS.prototype.setProject = function (project) {
  this._project = project
  return this
}

/**
 * Add a recipient for the SMS. Recipients can be more than one.
 * @param {string} phone
 * @param {object} vars - Vars for this particular recipient, needed for template
 * @return {object} The SMS instance itself
 */
SMS.prototype.addRecipient = function (phone, vars) {
  if (!isString(phone)) throw new Error('phone should be string')
  if (!isObject(vars)) throw new Error('vars should be object')

  this._recipients.push({
    to: phone,
    vars: vars
  })
  return this
}

/**
 * Send sms
 * @param {function} callback - Callback once request is returned. It can be null
 * @return {Promise} Promise if callback is not provided, undefined otherwise
 */
SMS.prototype.send = function (callback) {
  if (!isString(this._project)) throw new Error('project should be string.')
  if (this._recipients.length === 0) throw new Error('no recipients set.')

  var data = {
    appid: this._appid,
    multi: JSON.stringify(this._recipients),
    project: this._project,
    sign_type: 'sha1'
  }
  var options = {
    method: 'post',
    uri: multiSendUri
  }
  var self = this
  var completeData = function (timestamp) {
    data.timestamp = timestamp
    data.signature = sign(data, self._appid, self._secret)
    options.body = data
  }

  if (callback) {
    return getTimestamp(function (err, body) {
      if (err) return callback(err)
      completeData(body.timestamp)
      request(options, callback)
    })
  }

  return getTimestamp().then(function (body) {
    completeData(body.timestamp)
    return request(options)
  })
}

module.exports = SMS
