var jwt = require('jsonwebtoken')
const ProfileModel = require("../models/ProfileModel.js")

exports.testApi = (req, res)=>{
    res.status(200).json({status: "success", data: "secessfully Deploy"})
}
exports.CreateProfile = (req, res)=>{

    let reqBody = req.body;
    ProfileModel.create(reqBody, (err, data) => {
        if (err) {
            res.status(400).json({status: "fail", data: err})
        } else {
            res.status(200).json({status: "success", data: data})
        }
    })

}
exports.UserLogin = (req, res)=>{

    let UserName = req.body['UserName'];
    let Password = req.body['Password'];

    ProfileModel.find({ UserName: UserName, Password: Password }, (err, data) => {
        if (err) {
            res.status(400).json({status: "fail", data: err})
        } else {
            if (data.length) {
                let Payload = {exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),data: data[0]}
                let token = jwt.sign(Payload, 'nawaNoor')
                res.status(200).json({status: "login success", token: token, data: data})
            } else {
                res.status(401).json({status: "unauthorized", data: err})
            }
        }
        
    })

}
exports.SelectProfile = (req, res)=>{

    let UserName = req.headers['username'];

    ProfileModel.find({ UserName: UserName}, (err, data) => {
        if (err) {
            res.status(400).json({status: "fail", data: err})
        } else {
            res.status(200).json({status: "Success", data: data})
        }
    })
}

exports.UpdateProfile = (req, res)=>{

    let UserName = req.headers['username'];
    let reqBody = req.body

    ProfileModel.updateOne({ UserName: UserName}, {$set: reqBody}, {upsert: true}, (err, data) => {
        if (err) {
            res.status(400).json({status: "fail", data: err})
        } else {
            res.status(200).json({status: "Success", data: data})
        }
    })
}