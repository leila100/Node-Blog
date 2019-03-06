const express = require("express")
const postsDB = require("./postDb")
const usersDB = require("../users/userDb")

const router = express.Router()
router.use(express.json())

router.get("/", async (req, res) => {
  try {
    const posts = await postsDB.get()
    res.status(200).json(posts)
  } catch {
    res
      .status(500)
      .json({ error: "The posts information could not be retrieved." })
  }
})

router.get("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const post = await postsDB.getById(id)
    if (post) {
      res.status(200).json(post)
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." })
    }
  } catch {
    res
      .status(500)
      .json({ error: "The post information could not be retrieved." })
  }
})

router.post("/", async (req, res) => {
  const post = req.body
  if (!post.text || !post.user_id) {
    res
      .status(400)
      .json({ errorMessage: "Please provide title and user_id for the post." })
  } else {
    try {
      const user = await usersDB.getById(post.user_id)
      if (!user) {
        res.status(404).json({
          message: "The user with the specified user_id does not exist."
        })
      } else {
        const newPost = await postsDB.insert(post)
        res.status(201).json(newPost)
      }
    } catch {
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      })
    }
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const post = await postsDB.getById(id)
    if (!post) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." })
    } else {
      const postInfo = req.body
      if (!postInfo.text || !postInfo.user_id) {
        res.status(400).json({
          errorMessage: "Please provide text and user_id for the post."
        })
      } else {
        const user = await usersDB.getById(postInfo.user_id)
        if (!user) {
          res.status(404).json({
            message: "The user with the specified user_id does not exist."
          })
        } else {
          await postsDB.update(id, postInfo)
          const updatedPost = await postsDB.getById(id)
          res.status(200).json(updatedPost)
        }
      }
    }
  } catch {
    res
      .status(500)
      .json({ error: "The post information could not be modified." })
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const post = await postsDB.getById(id)
    if (!post) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." })
    } else {
      await postsDB.remove(id)
      res.status(200).json(post)
    }
  } catch {
    res.status(500).json({ error: "The post could not be removed" })
  }
})

module.exports = router
