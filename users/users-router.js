const express = require("express")
const usersDB = require("./userDb")

const router = express.Router()
router.use(express.json())

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

router.post("/", async (req, res) => {
  const user = req.body
  if (!user.name) {
    res.status(400).json({ errorMessage: "Please provide name for the user." })
  } else {
    try {
      const newUser = await usersDB.insert(user)
      res.status(201).json(newUser)
    } catch {
      res.status(500).json({
        error: "There was an error while saving the user to the database"
      })
    }
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const user = await usersDB.getById(id)
    if (!user) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." })
    } else {
      const userInfo = req.body
      if (!userInfo.name) {
        res
          .status(400)
          .json({ errorMessage: "Please provide name for the user." })
      } else {
        await usersDB.update(id, userInfo)
        const updatedUser = await usersDB.getById(id)
        res.status(200).json(updatedUser)
      }
    }
  } catch {
    res
      .status(500)
      .json({ error: "The user information could not be modified." })
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const user = await usersDB.getById(id)
    if (!user) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." })
    } else {
      await usersDB.remove(id)
      res.status(200).json(user)
    }
  } catch {
    res.status(500).json({ error: "The user could not be removed" })
  }
})

module.exports = router
