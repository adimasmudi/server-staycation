const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const category = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ItemId: [
    {
      type: ObjectId,
      ref: "Item",
    },
  ],
});

module.exports = mongoose.model("Category", category);
