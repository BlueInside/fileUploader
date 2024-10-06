const express = require('express');
const fileRouter = express.Router();

fileRouter.get('/', (req, res, next) => {
    res.send('/GET FILES');
})

fileRouter.post('/', (req, res, next) => {
    res.send('/POST FILE');
})

fileRouter.PUT('/', (req, res, next) => {
    res.send(`/UPDATE ${req.params.id} FILE`);
})

fileRouter.delete('/', (req, res, next) => {
    res.send(`/delete ${req.params.id} FILE`);
})