const express = require("express")

const server = express()
const logger = require("morgan")

server.use(express.json())
server.use(logger("dev"))

server.get("/", (req, res) => {
  res.status(200).json("Welcome to Node-Blog")
})

module.exports = server
