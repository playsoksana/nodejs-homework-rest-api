const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  phone: Joi.string().alphanum().min(10).max(17),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

const validate = async (schema, object, res, next) => {
  try {
    await schema.validateAsync(object);
    next();
  } catch (err) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: err.message.replace(/"/g, ""),
    });
  }
};

const pattern = "\\w{8}-\\w{4}-\\w{4}-\\w{4}-\\w{12}";
const schemaId = Joi.object({
  id: Joi.string().pattern(new RegExp(pattern)).required(),
});

module.exports.validateContacts = async (req, res, next) => {
  return await validate(schema, req.body, res, next);
};

module.exports.validateId = async (req, res, next) => {
  return await validate(schemaId, req.params, res, next);
};
