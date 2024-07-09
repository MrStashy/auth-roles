const express = require("express");
const {
  createPost
} = require('../controllers/post');
const { verifyToken } = require('../middleware/users')

const router = express.Router();

router.post("/", verifyToken, createPost);

module.exports = router;
