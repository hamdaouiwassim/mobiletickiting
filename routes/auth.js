
var express = require('express');
var router = express.Router();
const AuthController = require('../controllers/UserController')
router.post('/signin', AuthController.signin )
router.post('/signup', AuthController.signup )
router.post('/admin/signin', AuthController.signinAdmin )

module.exports = router;
