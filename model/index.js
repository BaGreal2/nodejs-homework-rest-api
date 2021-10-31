const Contact = require('./Contact')

const listContacts = async () => {
  const contacts = await Contact.find()
  return {
    status: 'success',
    code: 200,
    data: contacts,
  }
}

const getContactById = async (contactId) => {
  const targetContact = await Contact.findById(contactId)

  if (targetContact) {
    return {
      status: 'success',
      code: 200,
      data: targetContact,
    }
  } else {
    return {
      status: 'error',
      code: 404,
      data: 'Not found'
    }
  }
}

const removeContact = async (contactId) => {
  const targetContact = await Contact.findById(contactId)
  if (targetContact) {
    await Contact.findByIdAndDelete(contactId)

    return {
      status: 'success',
      code: 200,
      data: { message: 'Contact deleted' },
    }
  } else {
    return {
      status: 'error',
      code: 404,
      data: 'Not found'
    }
  }
}

const addContact = async (body) => {
  const newContact = await Contact.create(body)

  return newContact
}

const updateContact = async (contactId, body) => {
  const targetContact = await Contact.findById(contactId)
  if (targetContact) {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, { new: true, })

    return {
      status: 'success',
      code: 200,
      data: updatedContact,
    }
  } else {
    return {
      status: 'error',
      code: 404,
      data: 'Not found'
    }
  }
}

const updateStatusContact = async (contactId, body) => {
  const targetContact = await Contact.findById(contactId)
  if (targetContact) {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, { new: true, })
    if (!updateContact.favorite) {
      updateContact.favorite = false
    }
    return {
      status: 'success',
      code: 200,
      data: updatedContact,
    }
  } else {
    return {
      status: 'error',
      code: 404,
      data: {
        message: 'missing field favourite'
      }
    }
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
}
