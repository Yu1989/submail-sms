'use strict'

var SMS = require('../lib/sms')
var should = require('should')
var sms

describe('SMS class', function () {
  beforeEach(function () {
    sms = new SMS('appid', 'secret')
  })

  describe('#addRecipient', function () {
    it('requires phone', function () {
      should(function () { sms.addRecipient(null, {}) }).throw()
    })

    it('does not require vars', function () {
      should(function () { sms.addRecipient('18513993882') }).not.throw()
    })

    it('requires vars to be object if provided', function () {
      should(function () { sms.addRecipient('18513993882', 'a_string') }).throw()
    })

    it('passes with valid arguments', function () {
      should(function () { sms.addRecipient('18513993882', {var1: 20}) }).not.throw()
    })
  })

  describe('#send', function () {
    it('requires project', function () {
      sms.addRecipient('18513993882')
      should(function () { sms.send() }).throw()
    })

    it('requires at least one recipient', function () {
      sms.setProject('f5g6F0')
      should(function () { sms.send() }).throw()
    })
  })
})
