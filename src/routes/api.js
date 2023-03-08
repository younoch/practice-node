const express = require('express');
const ProfileControllar = require('../controllar/ProfileControallar.js');
const TodoListControallar = require('../controllar/TodoListControallar');
const AuthVerifiyMiddlewere = require('../middleware/AuthVerifiyMiddlewere');

const router = express.Router();

router.get("/testApi", ProfileControllar.testApi);
router.post("/CreateProfile", ProfileControllar.CreateProfile);
router.post("/UserLogin", ProfileControllar.UserLogin);


router.get("/SelectProfile",AuthVerifiyMiddlewere, ProfileControllar.SelectProfile);
router.post ("/UpdateProfile",AuthVerifiyMiddlewere, ProfileControllar.UpdateProfile);



router.post ("/CreateTodo",AuthVerifiyMiddlewere, TodoListControallar.CreateTodo);
router.get ("/SelectTodo",AuthVerifiyMiddlewere, TodoListControallar.SelectTodo);
router.post ("/UpdateTodo",AuthVerifiyMiddlewere, TodoListControallar.UpdateTodo);
router.post ("/UpdateStatusTodo",AuthVerifiyMiddlewere, TodoListControallar.UpdateStatusTodo);
router.post ("/RemoveTodo",AuthVerifiyMiddlewere, TodoListControallar.RemoveTodo);
router.post ("/SelectTodoByDate",AuthVerifiyMiddlewere, TodoListControallar.SelectTodoByDate);


module.exports = router