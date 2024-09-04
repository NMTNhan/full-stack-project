const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  isApproved: { 
    type: Boolean, 
    default: false 
  },
  status: {
    type: String,
    default: 'pending',
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  numberOfMembers: {
    type: Number,
    default: 0,
  },
  requestList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
