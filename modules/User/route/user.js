
const express = require('express');
const router = express.Router();
const userController = require('../controller/user');

// const JwtController = require('../../JsonWebToken/controller/jwt');

router.post('/user/register', userController.create);
// router.use(JwtController.verifyJwt());
router.get('/user/:id', userController.find);
router.get('/user/navers/:id', userController.findAllUserNavers);
router.put('/user/update/:id', userController.update);
router.delete('/user/delete/:id', userController.remove);

module.exports = router;
