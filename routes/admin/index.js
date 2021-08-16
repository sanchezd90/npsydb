const express = require('express');
const router = express.Router();

const adminHub = async (req,res) =>{
    res.render('admin');
  } 

router.get('/', adminHub);

module.exports = router;