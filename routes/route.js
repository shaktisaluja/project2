const express = require("express");
const router = express.Router();
const codecontroller = require("../controller/codecontroller");

router.post("/functionup/colleges", codecontroller.collegeData);
router.post("/functionup/interns", codecontroller.internData);
router.get("/functionup/collegeDetails", codecontroller.getCollegeDetails);

module.exports = router;
