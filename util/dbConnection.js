const mysql = require("mysql2")
const dotenv = require("dotenv")
dotenv.config()

const databaseName = process.env.DATABASE

var conn

function setConnection() {
  conn = mysql.createConnection({
    host: process.env.DATABASEHOST,
    user: process.env.DATABASEUSER,
    password: process.env.DATABASEPASSWORD,
    database: process.env.DATABASE,
  })

  conn.connect((err) => {
    if (err) {
      throw err
    }
    console.log("connection established")
  })
  // return conn
}

function endConnection() {
  conn.end()
}

const addNewUser = async (userFirstName, userLastName, uName, pass) => {
  setConnection()
  await conn.promise().query(
    `INSERT INTO ${databaseName}.${process.env.USERTABLE} 
        (first_name, last_name, username, password, account_created, account_updated)         
        values ('${userFirstName}','${userLastName}','${uName}','${pass}', now(), now());`
  )
  let res = await getLastUser()
  return res[0][0]
}

const getUserData = async (id) => {
  setConnection()
  let res = await conn
    .promise()
    .query(
      `SELECT id, first_name, last_name, username, account_created, account_updated, password FROM ${databaseName}.${process.env.USERTABLE} where id=${id}`
    )

  endConnection()
  return res[0][0]
}

const getLastUser = async () => {
  let res = await conn
    .promise()
    .query(
      `SELECT * FROM ${databaseName}.${process.env.USERTABLE} where id=LAST_INSERT_ID();`
    )
  endConnection()
  return res
}

const getUserDataCreds = async (username) => {
  setConnection()
  let res = await conn
    .promise()
    .query(
      `SELECT password FROM ${databaseName}.${process.env.USERTABLE} where username='${username}'`
    )
  endConnection()
  return res[0][0]
}

const checkUsername = async (username) => {
  setConnection()
  let res = await conn
    .promise()
    .query(
      `SELECT id FROM ${dbName}.${process.env.USERTABLE} where username=${username}`
    )
  endConnection()
  return res[0][0]
}

const updateUserData = async (userFirstName, userLastName, pass, id) => {
  setConnection()
  let res = await conn
    .promise()
    .query(
      `UPDATE ${databaseName}.${process.env.USERTABLE} SET first_name = '${userFirstName}', last_name = '${userLastName}', password = '${pass}', account_updated = now() WHERE id=${id}`
    )
  endConnection()
  return res[0][0]
}

module.exports = {
  addNewUser,
  getLastUser,
  getUserDataCreds,
  getUserData,
  checkUsername,
  updateUserData,
}
