const express = require('express');
const router = express.Router();
 const codecontroller = require('../controller/codecontroller')

router.post ('/functionup/colleges' , codecontroller.collegeData)










module.exports = router;