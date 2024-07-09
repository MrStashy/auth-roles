const express = require("express");
const {
  createUser,
  getUsers,
  deleteUser
} = require('../controllers/user');
const { verifyToken, verifyAdmin } = require('../middleware/users')

const router = express.Router();

router.post("/", createUser);
router.get("/", verifyToken, verifyAdmin, getUsers)
router.delete("/:id", verifyToken, verifyAdmin, deleteUser)

module.exports = router;
