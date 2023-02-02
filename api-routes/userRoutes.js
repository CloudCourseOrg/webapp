const express = require("express")
const router = express.Router()

const user = require("../services/user")
const helper = require("../configuration/hash-helper")

/**
 * POST METHOD.
 */
router.post("/", user.createNewUser)

/**
 * GET METHOD
 */
router.get("/:id", helper.bAuthCheck, user.getUser)

/**
 * PUT METHOD
 */
router.put("/:id", helper.bAuthCheck, user.updateUser)

module.exports = router
