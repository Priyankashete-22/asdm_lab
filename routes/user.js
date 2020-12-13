const express = require('express')
const db = require('../db')
const utils = require('../utils')
const crypto = require('crypto-js')

const router = express.Router()

router.post('/signin', (request, response) => {
  const {email, password} = request.body

  const encryptedPassword = crypto.SHA256(password)
  const statement = `select id, firstName, lastName from user where email = '${email}' and password = '${encryptedPassword}'`
  db.query(statement, (error, users) => {
    const result = {}
    if (error) {
      result['status'] = 'error'
      result['error'] = error
    } else {
      if (users.length == 0) {
        result['status'] = 'error'
        result['error'] = 'invalid email or password'
      } else {
        const user = users[0]
        result['status'] = 'success'
        result['data'] = user
      }
    }

    response.send(result)
  })
})

router.post('/signup', (request, response) => {
  const {firstName, lastName, email, password, address, phone} = request.body

  const encryptedPassword = crypto.SHA256(password)
  const statement = `insert into user (firstName, lastName, email, password, address, phone) values 
    ('${firstName}', '${lastName}', '${email}', '${encryptedPassword}', '${address}', '${phone}')`

  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

module.exports = router