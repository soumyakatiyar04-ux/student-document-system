const express= require('express');
const userRouter = express.Router();

const {getUserById, getUser, postUser} = require('../controller/userController');

userRouter.get("/users/:user_id", getUserById);
userRouter.get("/users", getUser);
userRouter.post("/users", postUser);


module.exports = userRouter;