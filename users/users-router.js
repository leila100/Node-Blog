const express = require("express")
const usersDB = require("./userDb")

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const users = await usersDB.get()
    res.status(200).json(users)
  } catch {
    res
      .status(500)
      .json({ error: "The users information could not be retrieved." })
  }
})

router.get("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const user = await usersDB.getById(id)
    if (user) {
      res.status(200).json(user)
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." })
    }
  } catch {
    res
      .status(500)
      .json({ error: "The user information could not be retrieved." })
  }
})

module.exports = router
