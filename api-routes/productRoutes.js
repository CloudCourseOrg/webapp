const express = require("express")
const router = express.Router()

const product = require("../services/product")
const helper = require("../config/helper")

/**
 * POST METHOD
 */
router.post("/", helper.productAuthenticationCheck, product.createNewProduct)

/**
 * GET METHOD
 */
router.get("/:id", product.getProduct)

/**
 * PUT METHOD
 */
router.put("/:id", helper.productAuthenticationCheck, product.putProductInfo)

/**
 * PATCH METHOD
 */
router.patch("/:id", helper.productAuthenticationCheck, product.patchProductInfo)

/**
 * PUT METHOD
 */
router.put("/:id", helper.productAuthenticationCheck, product.putProductInfo)

/**
 * DELETE METHOD
 */
router.delete("/:id", helper.productAuthenticationCheck, product.deleteProduct)

module.exports = router
