//init code
const express = require('express');
const router = express.Router();
const controller = require('./../controller/employeeController');
const {check} = require('express-validator');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

//create route
router.get("/register",controller.getData);
router.post("/register",[
check("fname").not().isEmpty().trim().escape(),
check("lname").not().isEmpty().trim().escape(),
check("user").not().isEmpty().trim().escape(),
check("email").isEmail().normalizeEmail(),
check("password").not().isEmpty().trim().escape()
],controller.postData);
router.get("/email/:email",controller.getemail);
router.get("/user/:user",controller.getuser);
router.post("/login", controller.login);

//state  
router.get("/state",controller.getState);
router.get("/state/:lable",controller.getStatebystateName);
router.post("/state",controller.poststate);

//city 
router.get("/city/:state",controller.getCity);
router.post("/city",controller.postCity);

//exports modules
module.exports = router;