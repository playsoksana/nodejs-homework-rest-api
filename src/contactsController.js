const { error } = require('console')
const fs = require('fs/promises')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const contacts = require('./data/contacts.json')

const listContacts = async (req, res, next) => {
  try {
    res.status(200).json({ contacts, status: 'success' })
  } catch (err) {
    next(err)
  }
}

const getContactById = async (req, res, next) => {
  const {
    params: { contactId },
  } = req
  const contactById = await contacts.filter(
    ({ id }) => id.toString() === contactId
  )
  try {
    if (!contactById[0]) {
      return res.status(404).json({ message: 'Not found' })
    }
    res.status(200).json({ contactById, status: 'success' })
  } catch (err) {
    return res.status(404).json({ message: 'Not found', error })
  }
}

const removeContact = async (req, res, next) => {}

const addContact = async (req, res, next) => {
  const { name, phone, email } = await req.body
  const newContact = { name, phone, email, id: uuidv4() }
  const contactsPath = path.resolve('../src/data/contacts.json')
  try {
    const listContacts = JSON.parse(await fs.readFile(contactsPath, 'utf8'))
    await fs.writeFile(
      contactsPath,
      JSON.stringify([...listContacts, newContact])
    )
    return res.status(201).json({ status: 'success' })
  } catch (err) {
    return res.status(400).json({ status: err })
  }
}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
