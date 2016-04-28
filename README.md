# submail-sms
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Wrapper for Submail SMS REST APIs.

## Usage
```
var SMS = require('submail-sms')
var sms = new SMS('your_key', 'your_secret')

sms.setTemplate('y6t7uO')
sms.addRecipient('18513993882', {var1: 'foo'})
sms.addRecipient('15831998328', {var1: 'bar'})

// the promise way
sms.send()
  .then(function () {
    // do something
  })
  .catch(function (err) {
    // handle errors
  })

// or with a callback
sms.send(function (err) {
  if (err) {
    // handle errors
    return
  }

  // do something
})
```
