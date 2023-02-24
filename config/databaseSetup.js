const Sequelize = require("sequelize")
const dotenv = require("dotenv")
dotenv.config()

const createUserModel = require("../models/user.model")
const createProductModel = require("../models/product.model")

// ORM Sequelize for the database connection using env

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DBUSER,
  process.env.DBPASS,
  {
    host: process.env.DBHOST,
    dialect: "mysql",
    define: {
      freezeTableName: true,
    },
  }
)

/**
 * clubbing the database details into one object db and using it as a global object
 */
let db = {}

db.sequelize = sequelize

db.user = createUserModel(sequelize)
db.product = createProductModel(sequelize)

module.exports = db
