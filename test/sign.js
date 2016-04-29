'use strict'

var sign = require('../lib/sign')
var should = require('should')
var crypto = require('crypto')

describe('Sign', function () {
  it('requires data to be object', function () {
    should(function () { sign(null) }).throw()
    should(function () { sign('a_string') }).throw()
  })

  it('returns correct signature', function () {
    var data = {
      b: 1,
      a: 'c'
    }
    var appid = 'appid'
    var secret = 'secret'
    var str = 'appidsecreta=c&b=1appidsecret'
    var signature = crypto.createHash('sha1').update(str).digest('hex')
    sign(data, appid, secret).should.equal(signature)
  })
})
