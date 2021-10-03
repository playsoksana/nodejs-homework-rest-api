const {
  listContacts,
  addContact,
  getContactById,
  removeContact,
  updateContact,
} = require("../model/index.js");

const getContacts = async (_req, res, next) => {
  try {
    const [contacts] = await listContacts();
    res.status(200).json({ status: "success", code: 200, data: { contacts } });
  } catch (err) {
    next(err);
  }
};

const postContact = async (req, res, next) => {
  try {
    const newContact = await addContact(req.body);
    res
      .status(201)
      .json({ status: "success", code: 201, data: { newContact } });
  } catch (err) {
    next(err);
  }
};

const getContact = async (req, res, next) => {
  try {
    const contactById = await getContactById(req.params.contactId);
    if (contactById) {
      return res
        .status(200)
        .json({ status: "success", code: 200, data: { contactById } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  } catch (err) {
    next(err);
  }
};

const deleteContactById = async (req, res, next) => {
  try {
    const deletedContact = await removeContact(req.params.contactId);
    if (deletedContact) {
      return res
        .status(200)
        .json({ status: "success", code: 200, data: { deletedContact } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Contact not found" });
  } catch (err) {
    next(err);
  }
};

const putContact = async (req, res, next) => {
  try {
    const newContact = await updateContact(req.params.contactId, req.body);
    if (newContact) {
      return res
        .status(200)
        .json({ status: "success", code: 200, data: { newContact } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Contact not found" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getContacts,
  postContact,
  getContact,
  deleteContactById,
  putContact,
};