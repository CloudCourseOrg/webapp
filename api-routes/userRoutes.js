const express = require("express")
const router = express.Router()

const user = require("../services/user")
const helper = require("../config/helper")

/**
 * POST METHOD
 */
router.post("/", user.createNewUser)

/**
 * GET METHOD
 */
router.get("/:id", helper.userAuthenticationCheck, user.getUser)

/**
 * PUT METHOD
 */
router.put("/:id", helper.userAuthenticationCheck, user.updateUser)

module.exports = router
