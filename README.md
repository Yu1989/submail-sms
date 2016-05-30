# submail-sms
[![npm version](https://img.shields.io/npm/v/submail-sms.svg?style=flat-square)](https://www.npmjs.com/package/submail-sms)
[![npm downloads](https://img.shields.io/npm/dt/submail-sms.svg?style=flat-square)](https://www.npmjs.com/package/submail-sms)
[![Build Status](https://img.shields.io/travis/Yu1989/submail-sms/master.svg?style=flat-square)](https://travis-ci.org/Yu1989/submail-sms)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)

Wrapper for [Submail](http://submail.cn) SMS-sending REST APIs.

## Install
```
$ npm install submail-sms --save
```

## How to use
```javascript
var SMS = require('submail-sms')
var sms = new SMS('your_key', 'your_secret')

// call set methods separately or chain them together
sms.setProject('y6t7uO').addRecipient('18513993882', {var1: 'foo'})
sms.addRecipient('15831998328', {var1: 'bar'})

sms.getProject() // -> 'y6t7uO'
sms.getRecipients() // -> [ {to: '18513993882', vars: {var1: 'foo'}}, {to: '15831998328', vars: {var1: 'bar'}} ]

// the promise way
sms.send()
  .then(function (res) {
    /**
     * do something with the response here
     * see section below for response details
     */
  })
  .catch(function (err) {
    /* handle errors (more like exceptions) */
  })

// or with a callback
sms.send(function (err, res) {
  if (err) {
    /* handle errors */
    return
  }

  /* do something with response */
})
```

## Sample response
The *success* response from Submail is an array of mixed successes and failures. An example:
```json5
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
```
$ npm test
```
