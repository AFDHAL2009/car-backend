const express = require("express");
const router = express.Router();
const { sign_up, sign_in } = require("../controllers/driver");
router.post("/register", sign_up);
router.post("/login", sign_in);
module.exports = router;
