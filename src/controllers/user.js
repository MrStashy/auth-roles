const { PrismaClientKnownRequestError } = require("@prisma/client")
const prisma = require('../utils/prisma.js')
const { createUserDb } = require('../domains/user.js')

const createUser = async (req, res) => {
  const {
    username,
    password
  } = req.body

  if (!username || !password) {
    return res.status(400).json({
      error: "Missing fields in request body"
    })
  }

  try {
    const createdUser = await createUserDb(username, password)

    return res.status(201).json({ user: createdUser })
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(409).json({ error: "A user with the provided username already exists" })
      }
    }

    res.status(500).json({ error: e.message })
  }
}

async function getUsers (req, res) {
  const users = await prisma.user.findMany()
  return res.status(200).json({ users })
}

async function deleteUser(req, res) {
  const user = await prisma.user.delete({
    where: {
      id: Number(req.params.id)
    }
  })
  return res.status(200).json({ user })
}

module.exports = {
  createUser,
  getUsers,
  deleteUser
}
