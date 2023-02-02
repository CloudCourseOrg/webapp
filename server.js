const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const methodOverride = require("method-override")

app.use(bodyParser.json())

const userRoutes = require("./api-routes/userRoutes")

app.get("/healthz", function (req, res) {
  res.status(200).send()
})

app.use("/v1/user", userRoutes)

app.use(methodOverride())
app.use((err, req, res, next) => {
  return res.status(400).json({ message: "Bad Request" })
})


module.exports = app
