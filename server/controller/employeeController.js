//init code
const TemplateAPI = require('./../models/employee');
const state_ = require('../models/State_');
const city = require('../models/City');
const { validationResult } = require('express-validator');
const chalk = require('chalk');

//display data code
exports.getData = (req, res) => { 
    TemplateAPI.find(
        (err, result) => {
            if (err) { res.status(400).send(err); }
            else { res.status(200).send(result); }
        }).sort({ "firstname": 1 });
};

//register employee code
exports.postData = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: false,
            message: 'from validation error....',
            errors: errors.array()
        });
    }

    const temp_api = new TemplateAPI((req.body));
    try {
        await temp_api.save();
        res.send(req.body);
    } catch (err) {
        console.log(err);
    }
}

//login code
exports.login = async (req, res) => {
    let user = req.body.user;
    let password = req.body.password;

    await TemplateAPI.findOne({ user, password })
        .then(profile => {
            debugger
            if (profile.password === password) {
                res.status(200).send("User Authenticated");
                console.log(chalk.greenBright.inverse("Login Successful"));
            }
        }
        )
        .catch(err => {
            console.log("Error is :", err.message);
            res.status(401).send("User Unauthorized Access");
            console.log(chalk.redBright.inverse("Incorrect Username or Password"));
        });
};

//email unique 
exports.getemail = async (req, res) => {
    let email = req.params.email;
   debugger
   console.log(email,"myemail")
    await TemplateAPI.findOne({ email })
        .then(profile => {
            if ((profile.email == email)) {
                    res.status(422).json({
                        status:false
                    })                                
            }})
        .catch(err => {
            res.status(200).json({
                status : true
            });
        });
}

//user unique 
exports.getuser = async (req, res) => {
    let user = req.params.user;
   debugger
    await TemplateAPI.findOne({ user }).then( profile => {
        if(profile.user == user){
            res.status(422).json({
                status:false
            })                                
        }
       }
    ).catch( err => {
        res.status(200).json({
                status : true
            });
    })
}

//state get
exports.getState = async(req, res) => {

    await state_.find().then(result=> {
        res.json({
            result : result
        })
    }).catch(err => {
            res.json({
                error : err
            })
    });

}

//state get by name
exports.getStatebystateName = async(req, res) => {
    let lable = req.params.lable;
    await state_.find({lable}).then(result=> {
        res.json({
            result : result
        })
    }).catch(err => {
            res.json({
                error : err
            })
    });

}

//state insert 
exports.poststate = async (req , res) => {
    
    const temp_api = new state_((req.body));
    try {
        await temp_api.save();
        res.send(req.body);
    } catch (err) {
        console.log(err);
    }
}

//city insert 
exports.postCity = async(req, res) => {
    const CITY = new city(req.body);
    try{
        await CITY.save();
        res.json({
            result: req.body
        })
    }catch(err) {
        console.log(err)
    }
}
//city get 
exports.getCity = async(req, res) => {
    let state = req.params.state;
    await city.find({state}).then(result=> {
        res.json({
            result:result
        })
    }).catch(err=>{
        res.json({
            error: err
        })
    })
}








