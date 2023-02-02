const bcrypt = require("bcrypt")
const databasefunctionalities = require("../util/dbConnection")

/**
 * a method to hash the password having default 10.
 */
const createPassHash = async (pass) => {
  const salt = await bcrypt.genSalt()
  const hashedpassword = await bcrypt.hash(pass, salt)
  return hashedpassword
}



const validateEmail = (uName) => {
  var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  if (uName.match(reg)) {
    return true
  }

  return false
}

/**
 * bAuthCheck - returns "true" if the "Authorization" header is either missing or does not start with "Basic "
 */

const bAuthCheck = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    req.headers.authorization.indexOf("Basic ") === -1
  ) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  /*
Resulting array will contain two elements: the string "Basic" and the base64-encoded credentials. 
The second element of the array (the base64-encoded credentials) is extracted and stored in the "base64Creds" constant.
*/
  const base64Creds = req.headers.authorization.split(" ")[1]

  /*
  Converting the resultant buffer in plain text using the "toString()" method with "ascii" as the encoding format
  */

  const credentials = Buffer.from(base64Creds, "base64").toString("ascii")

  const userName = credentials.split(":")[0]
  const pass = credentials.split(":")[1]
  const id = req.params.id

  let userAccCheck = await validUser(userName, pass)

  if (!userName || !pass || !userAccCheck) {
    return res.status(401).json({
      message: "Unauthorized",
    })
  }

  let dbCheck = await dbCredValidation(userName, pass, id)
  if (dbCheck) {
    return res.status(dbCheck == "Forbidden" ? 403 : 400).json({
      message: dbCheck,
    })
  }

  next()
}

 const validUser = async (userName, pass) => {
   
   let result = await databasefunctionalities.getUserDataCreds(userName)
   if (!result) {
     return false
   }

   let passCheck = await bcrypt.compare(pass, result.password)
   if (!passCheck) {
     return false
   }

   return true

    
 }

 const  dbCredValidation = async (userName, pass, id) => {
   let result = await databasefunctionalities.getUserData(id)
   if (!result) {
     return "Bad Request"
   }

   let { username, password } = result
   let passCheck = await bcrypt.compare(pass, password)
   if (username !== userName || !passCheck) {
     return "Forbidden"
   }

   return ""
 }

module.exports = {
  createPassHash,
  bAuthCheck,
   dbCredValidation,
  validUser,
  validateEmail
}
