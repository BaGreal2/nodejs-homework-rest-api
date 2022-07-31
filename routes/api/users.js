const express = require('express')
const schemaValidate = require('../../middleware/schemaValidate')
const User = require('../../model/User')
const validationSchemas = require('../../validationSchemas/users')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/signup', schemaValidate(validationSchemas.auth), async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email })
    if (existingUser) {
      res.status(409).json({
        message: 'Email in use',
      })
      return
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12)
    const newUser = await User.create({
      email: req.body.email,
      password: hashedPassword,
    })

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subbscription,
      }
    })
  } catch (error) {
    next(error)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email })
    if (!existingUser || !(await bcrypt.compare(req.body.password, existingUser.password))) {
      res.status(401).json({
        message: 'Email or password is wrong',
      })
      return
    }

    const payload = {
      _id: existingUser._id,
    }
    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })

    res.json({
      token: jwtToken,
      user: {
        email: existingUser.email,
        subscription: existingUser.subscription,
      }
    })
  } catch (error) {
    next(error)
  }
})

router.get('/current', async (req, res, next) => {
  try {

  } catch (error) {
    next(error)
  }
})

module.exports = router
