const mongoose = require("mongoose");
const validator = require("validator");

const inventorySchema = mongoose.Schema({
  itemId: {
    type: Number,
  },
  itemName: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Inventory", inventorySchema);
