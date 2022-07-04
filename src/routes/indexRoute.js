var express = require('express');
var router = express.Router();
const {auth} = require('../middlewares/authorisation')
const {
  getLoginPage,
  Login,
  Logout,
  getHomepage
} = require('../controllers/indexController')


/**
* @desc get login page
* @route GET /
* @access public
*/
router.get('/', getLoginPage);


/**
* @desc get dashboard
* @route GET /dashboard
* @access private
*/
router.get('/dashboard',auth, getHomepage);


/**
* @desc login route
* @route Post /login
* @access public
*/
router.post('/login', Login);


/**
* @desc logout
* @route GET /logout
* @access public
*/
router.get('/logout', Logout);


module.exports = router;
