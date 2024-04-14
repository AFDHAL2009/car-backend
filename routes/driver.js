const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const {
  sign_up,
  sign_in,
  get_profile,
  update_profile,
} = require("../controllers/driver");
router.post("/register", sign_up);
router.post("/login", sign_in);
router.get("/get-profile", auth, get_profile);
router.put("/update-profile", auth, update_profile);
module.exports = router;
