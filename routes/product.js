const express = require('express')
const db = require('../db')
const utils = require('../utils')

const router = express.Router()

router.get('/', (request, response) => {
  const statement = `select * from product`
  db.execute(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

router.post('/', (request, response) => {
  const {title, price, description, category} = request.body
  const statement = `insert into product (title, price, description, category_id) values
    ('${title}', '${price}', '${description}', '${category}')`
  db.execute(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

module.exports = router