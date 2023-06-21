const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  aboutInfo: { type: String },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
