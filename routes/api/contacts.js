const express = require("express");
// const { required } = require("joi");
const router = express.Router();
const { updateContact } = require("../../model/index.js");

const {
  getContacts,
  postContact,
  getContact,
  deleteContactById,
  putContact,
} = require("../../controllers/controllersContacts.js");

const { validateContacts } = require("./validation.js");

router.get("/", getContacts);

router.get("/:contactId", getContact);

router.post("/", validateContacts, postContact);

router.delete("/:contactId", deleteContactById);

router.put("/:contactId", validateContacts, putContact);

module.exports = router;
