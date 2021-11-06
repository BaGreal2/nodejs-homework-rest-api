const express = require('express')
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
} = require('../../model/index')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const contacts = await listContacts()
    res.json(contacts)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

router.get('/:contactId', async (req, res) => {
  try {
    const targetContact = await getContactById(req.params.contactId)

    res.json(targetContact)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

router.post('/', async (req, res) => {
  try {
    const newContact = await addContact(req.body)

    res.json(newContact)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

router.delete('/:contactId', async (req, res) => {
  try {
    await removeContact(req.params.contactId)

    res.status(200).send('Contact was deleted')
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

router.put('/:contactId', async (req, res) => {
  try {
    const targetContact = await updateContact(req.params.contactId, req.body)

    res.json(targetContact)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

router.patch('/:contactId/favorite', async (req, res) => {
  try {
    if (req.body.favorite) {
      const targetContact = await updateStatusContact(req.params.contactId, req.body)
      res.json(targetContact)
    } else {
      res.status(400).send('Field "favorite" is required')
    }
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

module.exports = router
