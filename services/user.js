const dbFuncs = require("../util/dbConnection")

const helper = require("../configuration/hash-helper")

const createNewUser = async (req, res) => {
  if (
    !req.body.first_name ||
    !req.body.last_name ||
    !req.body.last_name ||
    !req.body.username ||
    !helper.validateEmail(req.body.username || !req.body.password)
  ) {
    return res.status(400).json({
      message: "Bad request",
    })
  }

  let userFirstName = req.body.first_name
  let userLastName = req.body.last_name
  let uName = req.body.username
  let pass = await helper.createPassHash(req.body.password)

  let result = await dbFuncs.getUserDataCreds(uName)
  if (result) {
    return res.status(400).json({
      message: "Bad request",
    })
  }

  let data = await dbFuncs.addNewUser(userFirstName, userLastName, uName, pass)

  let fdata = {
    id: data.id,
    username: data.username,
    first_name: data.first_name,
    last_name: data.last_name,
    account_created: data.account_created,
    account_updated: data.account_updated,
  }
  return res.status(201).json(fdata)
}

const getUser = async (req, res) => {
  check = true
  if (!req.params.id) {
    check = false
  }

  if (Object.keys(req.body).length) {
    check = false
  }

  if (!check) {
    return res.status(400).json({
      message: "Bad request",
    })
  }

  let id = req.params.id

  let result = await dbFuncs.getUserData(id)
  if (!result) {
    return res.status(400).json({
      message: "Bad Request",
    })
  }
  let finalData = {
    id: result.id,
    username: result.username,
    first_name: result.first_name,
    last_name: result.last_name,
    account_created: result.account_created,
    account_updated: result.account_updated,
  }

  return res.status(200).json(finalData)
}

const updateUser = async (req, res) => {
  let check = true

  if (!req.body.first_name) {
    check = false
  }

  if (!req.body.last_name) {
    check = false
  }

  if (!req.body.password) {
    check = false
  }

  if (Object.keys(req.body).length !== 3) {
    check = false
  }

  if (!check) {
    return res.status(400).json({
      message: "Bad request",
    })
  }

  let id = req.params.id
  let userFirstName = req.body.first_name
  let userLastName = req.body.last_name
  let pass = await helper.createPassHash(req.body.password)

  await dbFuncs.updateUserData(userFirstName, userLastName, pass, id)
  return res.status(204).send()

}

module.exports = { createNewUser, getUser, updateUser }
