var router = require('express').Router();
const {auth} = require('../middlewares/authorisation')
const {
    getAllEmployee,
    createEmployee,
    deleteEmployee,
    editEmployee,
    editEmployeePage,
    createEmployeePage
} = require('../controllers/employeeController')


/**
* @desc get all employees
* @route GET /employee/getAll/:page
* @access private
*/
router.get('/getAll/:page',auth,getAllEmployee);


/**
* @desc get create Employee Page
* @route GET /employee/createEmployeePage
* @access private
*/
router.get('/createEmployeePage',auth,createEmployeePage);


/**
* @desc get all employees
* @route GET /employee/create
* @access private
*/
router.post('/create',auth,createEmployee);


/**
* @desc get all employees
* @route GET /employee/delete/:employeeid
* @access private
*/
router.get('/delete/:employeeid',auth,deleteEmployee);

/**
* @desc get edit Employee Page
* @route GET /employee/:editEmployeePage
* @access private
*/
router.get('/editEmployeePage/:employeeid',auth,editEmployeePage);


/**
* @desc edit Employee
* @route GET /employee/editEmployee/:employeeid
* @access private
*/
router.post('/editEmployee/:employeeid',auth,editEmployee);


module.exports = router;
