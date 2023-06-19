const User = require("../model/user.model");
const Joi = require("joi");

const payloadSchema = Joi.object({
  password: Joi.string().required(),
  confirm_password: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirm password")
    .messages({ "any.only": "{{#label}} did not match" }),
  contactNumber: Joi.string().required(),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ph", "co"] },
    }),
  fullName: Joi.string().required(),
  completeAddress: Joi.string(),
});

module.exports = validateSignup = async (req, res, next) => {
  const { error } = payloadSchema.validate(req.body);
  if (error) {
    return res.status(422).json({ message: error.details[0].message });
  }

  const { email } = req.body;
  const emailExists = await User.findOne({ email });

  if (emailExists) {
    return res.status(422).json({ message: "Duplicate email" });
  }
  // Validation successful, proceed to the next middleware or route handler
  next();
};
