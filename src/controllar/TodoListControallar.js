const TodoListModel = require("../models/TodoListModel.js")

exports.CreateTodo = (req, res)=>{

    let reqBody = req.body;

    let TodoSubject = reqBody['TodoSubject'];
    let TodoDescription = reqBody['TodoDescription'];
    let UserName = req.headers['username'];
    let TodoStatus = 'New';
    let TodoCreateDate = Date.now();
    let TodoUpdateDate = Date.now();


    let PostBody = {UserName,TodoSubject,TodoDescription,TodoStatus,TodoCreateDate, TodoUpdateDate}
    TodoListModel.create(PostBody, (err, data) => {
        if (err) {
            res.status(400).json({status: "fail", data: err})
        } else {
            res.status(200).json({status: "success", data: data})
        }
    })

}

exports.SelectTodo = (req, res)=>{

    let UserName = req.headers['username'];

    TodoListModel.find({ UserName: UserName}, (err, data) => {
        if (err) {
            res.status(400).json({status: "fail", data: err})
        } else {
            res.status(200).json({status: "Success", data: data})
        }
    })
}

exports.UpdateTodo = (req, res)=>{
    let TodoSubject = req.body['TodoSubject'];
    let TodoDescription = req.body['TodoDescription'];
    let _id = req.body['_id'];
    let TodoUpdateDate = Date.now();

    let PostBody = {TodoSubject,TodoDescription, TodoUpdateDate}

    TodoListModel.updateOne({ _id: _id }, { $set: PostBody }, {upsert: true}, (err, data) => {
        if (err) {
            res.status(400).json({status: "fail", data: err})
        } else {
            res.status(200).json({status: "Success", data: data})
        }
    })
}
exports.UpdateStatusTodo = (req, res)=>{
    let TodoStatus = req.body['TodoStatus'];
    let _id = req.body['_id'];
    let TodoUpdateDate = Date.now();

    let PostBody = {TodoStatus, TodoUpdateDate}

    TodoListModel.updateOne({ _id: _id }, { $set: PostBody }, {upsert: true}, (err, data) => {
        if (err) {
            res.status(400).json({status: "fail", data: err})
        } else {
            res.status(200).json({status: "Success", data: data})
        }
    })
}
exports.RemoveTodo = (req, res)=>{
    let _id = req.body['_id'];

    TodoListModel.remove({ _id: _id }, (err, data) => {
        if (err) {
            res.status(400).json({status: "fail", data: err})
        } else {
            res.status(200).json({status: "Success", data: data})
        }
    })
}

exports.SelectTodoByStatus = (req, res)=>{

    // let UserName = req.headers['username'];
    let TodoStatus = req.body['TodoStatus'];

    TodoListModel.find({ TodoStatus}, (err, data) => {
        if (err) {
            res.status(400).json({status: "fail", data: err})
        } else {
            res.status(200).json({status: "Success", data: data})
        }
    })
}
exports.SelectTodoByDate = (req, res)=>{

    let FormDate = req.body['FormDate'];
    let ToDate = req.body['ToDate'];

    TodoListModel.find({ TodoCreateDate: {$gte: new Date(FormDate), $lte: new Date(ToDate)}}, (err, data) => {
        if (err) {
            res.status(400).json({status: "fail", data: err})
        } else {
            res.status(200).json({status: "Success", data: data})
        }
    })
}