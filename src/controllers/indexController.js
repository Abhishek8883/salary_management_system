require('dotenv').config({ path: '../../.env' })
const { Admin, Employee, Salary,sequelize } = require('../models/index')
const jwt = require('jsonwebtoken')
const { comparepassword } = require('../utils/bcrypt')


const getLoginPage = (req, res, next) => {
    return res.render('login/index')
}

const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const admin = await Admin.findAll({
            where: {
                email: String(email)
            }
        })
        if (admin.length <= 0) {
            return res.json({ messege: "No such user " })
        }
        else {
            var foundUser = admin[0]
            const validate = comparepassword(password, foundUser.password)
            if (validate) {
                const token = jwt.sign({
                    loggedUser: foundUser.id,
                }, process.env.jwt_secret, { expiresIn: '1h' });
                return res
                    .cookie("salary_access_token", token, {
                        httpOnly: true,
                    })
                    .redirect('/dashboard')
            }
            else {
                return res.json({ messege: "incorrect password" })
            }
        }

    } catch (err) {
        return res.status(400).json({ error: err })
    }
}

const Logout = (req, res, next) => {
    return res
        .clearCookie("salary_access_token")
        .status(200)
        .redirect('/');
}

const getHomepage = async (req, res, next) => {
    try {
        let lastMonth  = new Date().getMonth()
        let currentMonth  = lastMonth + 1
        const totalEmployees = await Employee.count()
        const this_month_total_working_days = await Salary.findAll({
            attributes: [[sequelize.fn('sum', sequelize.col('total_working_days')), 'total']],
            where:{
                month:currentMonth
            },
            raw: true,
          });

        const last_month_total_working_days = await Salary.findAll({
            attributes: [[sequelize.fn('sum', sequelize.col('total_working_days')), 'total']],
            where:{
                month:lastMonth
            },
            raw: true,
          });

        let thisMonthAttendance =  Math.floor((this_month_total_working_days[0].total/(30*totalEmployees))*100)

        let lastMonthAttendance = Math.floor((last_month_total_working_days[0].total/(30*totalEmployees))*100)

        const loggedUser = req.user
        return res.render('home/dashboard',{totalEmployees,thisMonthAttendance,lastMonthAttendance})
    }
    catch (err) {
        return res.status(404).json({ error: err })
    }
}


module.exports = { getLoginPage, Login, Logout, getHomepage }