const express = require('express')
const volleyball = require('volleyball')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
// const path = require('path')

const contacts = require('./routes/api/contacts')
const users = require('./routes/api/users')

const app = express()
app.use(volleyball)
app.use(cors({
  origin: '*'
}))

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Database connection successfully'))
  .catch((error) => console.log(error))

app.use(express.json())

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())

app.use('/api/contacts', contacts)
app.use('/api/users', users)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})
// app.use(express.static(path.join(__dirname + '../public')))
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
