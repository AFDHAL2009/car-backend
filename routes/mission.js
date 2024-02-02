const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  selectAll,
  search,
  create,
  accept,
  start,
  finish,
  clear,
  accepted_missions,
  started_missions,
  finished_missions,
} = require("../controllers/mission");
router.get("/all", auth, selectAll);
router.get("/search", auth, search);
router.post("/create", auth, create);
router.post("/accept", auth, accept);
router.post("/start", auth, start);
router.post("/finish", auth, finish);
router.post("/delete", auth, clear);
router.get("/accepted-missions", auth, accepted_missions);
router.get("/started-missions", auth, started_missions);
router.get("/finished-missions", auth, finished_missions);

module.exports = router;
