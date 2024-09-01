const express = require('express');
const {createGroup, getAllGroup, getGroupByID, addMemberToRequestList, removeMember, addMemberFromRequestListToGroup,
  removerUserFromRequestList, getAllMembers, getAllRequest, approveGroup
} = require("../controllers/groupController");
const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/adminMiddleware');

const router = express.Router();

// Create a new group
router.post('/createGroup', createGroup);

// Get all groups
router.get('/', getAllGroup);

// Get group by ID
router.get('/:groupId', getGroupByID);

// Add members to the request list in a group
router.post('/:groupId/requests/:userId', addMemberToRequestList);

// Remove a member from a group
router.delete('/:groupId/members/:memberId', removeMember);

// Add members from request list to a group
router.post('/:groupId/members/:userId', addMemberFromRequestListToGroup);

// Remove users from request list
router.delete('/:groupId/requests/:userId', removerUserFromRequestList);

// Get all members of a group
router.get('/:groupId/members', getAllMembers);

// Get all requests of a group
router.get('/:groupId/requests', getAllRequest);

router.put('/approve/:groupId', protect, isAdmin, approveGroup);

module.exports = router;