const express = require('express');
const { getFriendInfoByID } = require("../controllers/userController");
const router = express.Router();

router.get('/:id', getFriendInfoByID);

module.exports = router;
