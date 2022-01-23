const express = require('express')
let router = express.Router()

const dynamodbCrud = require('./dynamodbCrud/categoryCrud')

router.use('/crud', dynamodbCrud)

module.exports = router;