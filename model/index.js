const { v4: uuidv4 } = require("uuid");
const DB = require("./db");
const db = new DB("./contacts.json");

const listContacts = async () => {
  return await db.readFile();
};

const getContactById = async (contactId) => {
  const contacts = await db.readFile();
  const [result] = contacts.filter(({ id }) => id === contactId);
  if (result) {
    return result;
  }
  return null;
};

const addContact = async (body) => {
  const contacts = await db.readFile();
  const newContact = {
    id: uuidv4(),
    ...body,
  };
  await db.writeFile([...contacts, newContact]);
  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await db.readFile();
  const index = contacts.findIndex(({ id }) => id === contactId);

  if (index !== -1) {
    const [result] = contacts.splice(index, 1);
    await db.writeFile(contacts);
    return result;
  }
  return null;
};

const updateContact = async (contactId, body) => {
  const contacts = await db.readFile();
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index !== -1) {
    contacts[index] = { ...contacts[index], ...body };
    await db.writeFile(contacts);
    return contacts[index];
  }
  return null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
