const express = require("express")
const logger = require("morgan")
const usersRouter = require("./users/users-router")
const postsRouter = require("./posts/posts-router")

const server = express()

server.use(express.json())
server.use(logger("dev"))

server.use("/api/users", usersRouter)
server.use("/api/posts", postsRouter)

server.get("/", (req, res) => {
  res.status(200).json("Welcome to Node-Blog")
})

module.exports = server
