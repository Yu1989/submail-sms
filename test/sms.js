'use strict'

var SMS = require('../lib/sms')
var should = require('should')
var sms

describe('SMS class', function () {
  beforeEach(function () {
    sms = new SMS('appid', 'secret')
  })

  it('should be able to chain set methods', function () {
    var result = sms.setProject('a3b4c5')
      .addRecipient('18513993882', {var1: 1})
      .addRecipient('18513993881', {var2: 1})
    result.should.be.eql(sms)
  })

  it('should allow setting and getting project', function () {
    var project = '6t7y8u'
    sms.setProject(project)
    sms.getProject().should.be.eql(project)
  })

  describe('#addRecipient', function () {
    it('should require phone', function () {
      should(function () { sms.addRecipient(null, {}) }).throw()
    })

    it('should not require vars', function () {
      should(function () { sms.addRecipient('18513993882') }).not.throw()
    })

    it('should require vars to be object if provided', function () {
      should(function () { sms.addRecipient('18513993882', 'a_str') }).throw()
    })

    it('should pass with valid arguments', function () {
      should(function () { sms.addRecipient('18513993882', {var1: 20}) }).not.throw()
    })
  })

  describe('#getRecipients', function () {
    it('should get recipients', function () {
      sms.addRecipient('18513993882', {var1: 1})
      var recipients = sms.getRecipients()
      recipients.should.be.Array().and.have.length(1)
    })
  })

  describe('#send', function () {
    it('should require project', function () {
      sms.addRecipient('18513993882')
      should(function () { sms.send() }).throw()
    })

    it('should require at least one recipient', function () {
      sms.setProject('f5g6F0')
      should(function () { sms.send() }).throw()
    })
  })
})
