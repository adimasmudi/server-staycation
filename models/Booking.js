const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const booking = new mongoose.Schema({
  bookingStartDate: {
    type: date,
    required: true,
  },
  bookingEndDate: {
    type: date,
    required: true,
  },
  itemId: [
    {
      _id: {
        type: ObjectId,
        ref: "Item",
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      night: {
        type: Number,
        required: true,
      },
    },
  ],
  memberId: [
    {
      type: ObjectId,
      ref: "Member",
    },
  ],
  bankId: [
    {
      type: ObjectId,
      ref: "Bank",
    },
  ],
  proofPayment: {
    type: String,
    required: true,
  },
  bankFrom: {
    type: String,
    required: true,
  },
  accountHolder: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Booking", booking);
