const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// routers
const routeUser = require('./routes/user')
const routeProduct = require('./routes/product')
const routeCategory = require('./routes/category')

const app = express()
app.use(bodyParser.json())
app.use(cors('*'))

// add routes
app.use('/user', routeUser)
app.use('/product', routeProduct)
app.use('/category', routeCategory)

app.listen(4000, '0.0.0.0', () => {
  console.log('server started on port 4000')
})