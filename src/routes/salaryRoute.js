var router = require('express').Router()
const {auth} = require('../middlewares/authorisation')
const {
    getAllSalary,
    createSalaryPage,
    create,
    isSalaryCalculated,
    notCalculatedSalary,
    makeSalary
} = require('../controllers/salaryController')

    

/**
* @desc get all salaries
* @route GET /salary/getAll/:page
* @access private
*/
router.get('/getAll/:page',auth,getAllSalary);
/**
* @desc render create salary page
* @route GET /salary/createSalaryPage
* @access private
*/
router.get('/createSalaryPage',auth,createSalaryPage);


/**
* @desc add salary 
* @route GET /salary/create
* @access private
*/
router.post('/create',auth,create);



/**
* @desc check weather salary is calculated
* @route GET /salary/isSalaryCalculated
* @access private
*/
router.post('/isSalaryCalculated',auth,isSalaryCalculated);


/**
* @desc check weather salary is calculated
* @route GET /salary/notCalculatedSalary
* @access private
*/
router.get('/notCalculatedSalary',auth,notCalculatedSalary);


/**
* @desc check weather salary is calculated
* @route GET /salary/makeSalary
* @access private
*/
router.get('/makeSalary',auth,makeSalary)

module.exports = router