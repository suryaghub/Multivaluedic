const mongoose = require('mongoose');

// Customer Schema
const customerSchema = mongoose.Schema({
  
  key: {type: String},

  members: []
  

});

// Define and export
module.exports = mongoose.model('Customer', customerSchema);