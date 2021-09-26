const path = require('path')
const fs = require('fs/promises')
const contacts = require('./contacts.json')

const listContacts = async () => {
  const pathContacts = path.join(__dirname, '/')
  try {
  } catch (err) {
    console.log('error', err)
  }
}

const getContactById = async (contactId) => {}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
listContacts()
