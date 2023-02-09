const bcrypt = require("bcrypt")
const db = require("../config/databaseSetup")

/**
 * a method to hash the password having default 10.
 */
const createPassHash = async (pass) => {
  const salt = await bcrypt.genSalt()
  const hashedpassword = await bcrypt.hash(pass, salt)
  return hashedpassword
}


  /*
Resulting array will contain two elements: the string "Basic" and the base64-encoded credentials. 
The second element of the array (the base64-encoded credentials) is extracted and stored in the "base64Creds" constant.
*/

const getDecryptedCredentials = (authHeader) => {
  const base64Creds = authHeader.split(" ")[1]
  const credentials = Buffer.from(base64Creds, "base64").toString("ascii")

  const userName = credentials.split(":")[0]
  const pass = credentials.split(":")[1]

  return { userName, pass }
}

/**
 * bAuthCheck - returns "true" if the "Authorization" header is either missing or does not start with "Basic "
 */

const userAuthenticationCheck = async (req, res, next) => {
  //Check if auth header is present and is a basic auth header.
  if (
    !req.headers.authorization ||
    req.headers.authorization.indexOf("Basic ") === -1
  ) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  //decode 
  let { userName, pass } = getDecryptedCredentials(req.headers.authorization)
  const id = req?.params?.id

  //Check if user is valid
  let userAccCheck = await validUser(userName, pass)

  if (!userName || !pass || !userAccCheck) {
    return res.status(401).json({
      message: "Unauthorized",
    })
  }

  //Check if user creds match the user at id.
  let dbCheck = await dbCredVal(userName, pass, id)
  if (dbCheck) {
    return res.status(dbCheck == "Forbidden" ? 403 : 404).json({
      message: dbCheck,
    })
  }

  next()
}

const productAuthenticationCheck = async (req, res, next) => {
  //Check if auth header is present and is a basic auth header.
  if (
    !req.headers.authorization ||
    req.headers.authorization.indexOf("Basic ") === -1
  ) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  //decode
  let { userName, pass } = getDecryptedCredentials(req.headers.authorization)
  const id = req?.params?.id

  //Check if user is valid
  let userAccCheck = await validUser(userName, pass)

  if (!userName || !pass || !userAccCheck) {
    return res.status(401).json({
      message: "Unauthorized",
    })
  }

  if (id) {
    //Check if user creds match the user at id.
    let dbCheck = await dbProdVal(userName, pass, id)
    if (dbCheck) {
      return res.status(dbCheck == "Forbidden" ? 403 : 404).json({
        message: dbCheck,
      })
    }
  }

  next()
}

const dbProdVal = async (uName, pass, id) => {
  let userInfo = await db.user.findOne({
    where: { username: uName },
    attributes: ["id"],
  })
  let prodInfo = await db.product.findOne({
    where: { id: id },
    attributes: ["owner_user_id"],
  })
  if (!prodInfo) {
    return "Not Found"
  }

  if (userInfo.dataValues.id !== prodInfo.dataValues.owner_user_id) {
    return "Forbidden"
  }

  return ""
}

const validateEmail = (uName) => {
  var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  if (uName.match(reg)) {
    return true
  }

  return false
}

const validUser = async (userName, pass) => {
  let result = await db.user.findOne({
    where: { username: userName },
    attributes: ["password"],
  })
  if (!result?.dataValues?.password) {
    return false
  }

  let passCheck = await bcrypt.compare(pass, result.dataValues.password)
  if (!passCheck) {
    return false
  }

  return true
}

const dbCredVal = async (uName, pass, id) => {
  let result = await db.user.findOne({
    where: { id: id },
    attributes: ["username", "password"],
  })
  if (!result) {
    return "Not Found"
  }

  let { username, password } = result.dataValues
  let passCheck = await bcrypt.compare(pass, password)
  if (username !== uName || !passCheck) {
    return "Forbidden"
  }

  return ""
}

module.exports = {
  createPassHash,
  userAuthenticationCheck,
  dbCredVal,
  validateEmail,
  validUser,
  getDecryptedCredentials,
  productAuthenticationCheck,
}
