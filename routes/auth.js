const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');


authRouter.get('/login', authController.getLoginPage)