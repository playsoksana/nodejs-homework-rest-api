const { error } = require("console");
const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const contacts = require("./data/contacts.json");

const listContacts = async (_req, res) => {
  try {
    res.status(200).json({ contacts, status: "success" });
  } catch (err) {
    error();
  }
};

const getContactById = async (req, res) => {
  const {
    params: { contactId },
  } = req;
  const contactById = contacts.filter(({ id }) => id.toString() === contactId);
  try {
    if (!contactById[0]) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ contactById, status: "success" });
  } catch (err) {
    error();
  }
};

const removeContact = async (req, res) => {
  const {
    params: { contactId },
  } = req;
  const contactsPath = path.join(__dirname, "../src/data/contacts.json");
  try {
    const listContacts = await JSON.parse(
      await fs.readFile(contactsPath, "utf8")
    );
    const removedContact = listContacts.filter(({ id }) => id === contactId);
    if (!removedContact[0]) {
      return res.status(404).json({ message: "Not found" });
    }
    const newListContact = listContacts.filter(({ id }) => id !== contactId);
    if (!newListContact[0]) {
      return res
        .status(200)
        .json({ message: "No contacts", status: "success" });
    }

    await fs.writeFile(contactsPath, JSON.stringify(newListContact));
    res.status(200).json({ message: "contact deleted", status: "success" });
  } catch (err) {
    error();
  }
};

const addContact = async (req, res) => {
  const { name, phone, email } = req.body;

  const newContact = { name, phone, email, id: uuidv4() };
  const contactsPath = path.join(__dirname, "../src/data/contacts.json");
  try {
    const listContacts = await JSON.parse(
      await fs.readFile(contactsPath, "utf8")
    );

    await fs.writeFile(
      contactsPath,
      JSON.stringify([...listContacts, newContact])
    );
    res.status(201).json({ status: "success", newContact });
  } catch (err) {
    error();
  }
};

const updateContact = async (req, res) => {
  const { name, phone, email } = req.body;
  const {
    params: { contactId },
  } = req;
  const contactsPath = path.join(__dirname, "../src/data/contacts.json");
  try {
    const listContacts = await JSON.parse(
      await fs.readFile(contactsPath, "utf8")
    );

    listContacts.forEach((el) => {
      if (el.id === contactId) {
        el.name = name;
        el.phone = phone;
        el.mail = email;
      } else {
        return res.status(404).json({ message: "Not found" });
      }
    });
    await fs.writeFile(contactsPath, JSON.stringify(listContacts));
    res.status(201).json({ status: "success" });
  } catch (err) {
    error();
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
