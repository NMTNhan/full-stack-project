const express = require('express');
const { getFriendInfoByID, unFriendByID} = require("../controllers/userController");
const router = express.Router();

router.get('/:id', getFriendInfoByID);

router.put('/unfriend/:id', unFriendByID)

module.exports = router;
