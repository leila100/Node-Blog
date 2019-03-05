const express = require("express")
const logger = require("morgan")
const usersRouter = require("./users/users-router")

const server = express()

server.use(express.json())
server.use(logger("dev"))

server.use("/api/users", usersRouter)

server.get("/", (req, res) => {
  res.status(200).json("Welcome to Node-Blog")
})

module.exports = server
