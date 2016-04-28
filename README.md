# submail-sms
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Build Status](https://travis-ci.org/Yu1989/submail-sms.svg?branch=master)](https://travis-ci.org/Yu1989/submail-sms)
[![npm version](https://badge.fury.io/js/submail-sms.svg)](https://badge.fury.io/js/submail-sms)

Wrapper for Submail SMS REST APIs.

## How to use
```
var SMS = require('submail-sms')
var sms = new SMS('your_key', 'your_secret')

sms.setTemplate('y6t7uO')
sms.addRecipient('18513993882', {var1: 'foo'})
sms.addRecipient('15831998328', {var1: 'bar'})

// the promise way
sms.send()
  .then(function (result) {
    // do something with result
    // See section below for details
  })
  .catch(function (err) {
    // handle errors (more like exceptions)
  })

// or with a callback
sms.send(function (err, result) {
  if (err) {
    // handle errors
    return
  }

  // do something with result
})
```

## Sample response
The 'success' response from Submail is an array of mixed successes and failures. An example:
```
[ { status: 'success',
    to: '18513993882',
    send_id: 'aba33c824223587ed47988ebfe49b07d',
    fee: 1,
    sms_credits: '33' },
  { status: 'error',
    to: '00000000000',
    code: 252,
    msg: 'Incorrect recipient message address' } ]
```

## Test
1. `npm install mocha -g`
2. `npm install standard -g`
3. `npm test`
