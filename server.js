const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const methodOverride = require("method-override")


app.use(bodyParser.json())

const userRoutes = require("./api-routes/userRoutes")
const productRoutes = require("./api-routes/productRoutes")
const db = require("./config/databaseSetup")
db.user.hasMany(db.product, { foreignKey: "owner_user_id" })

db.sequelize
  .sync({ force: false })
  .then(() => console.log("Database setup complete."))
  .catch((err) => console.log("Database setup failed.", err))

app.get("/healthz", function (req, res) {
  res.status(200).send()
})

app.use(methodOverride())
app.use((err, req, res, next) => {
  return res.status(400).json({ message: "Bad Request" })
})

app.use("/v1/user", userRoutes)
app.use("/v1/product", productRoutes)


module.exports = app
