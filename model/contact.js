const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/contact-app");

// create schema
const Contact = mongoose.model("Contact", {
  name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
});

module.exports = Contact;
