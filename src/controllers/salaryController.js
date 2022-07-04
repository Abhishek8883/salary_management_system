const { Salary,Employee } = require('../models/index')
const { Sequelize } = require('sequelize')
var cron = require('node-cron');
let send = require('../utils/mail')


const getAllSalary = async (req, res, next) => {
    try {
        let p = (req.params.page <= 0) ? 1 : req.params.page 
        let page = Number(p) 
        const Salaries = await Employee.findAll({
            include: [{
                model: Salary
            }],
            limit:10,
            offset:((page-1)*10)
        })
        const isData = (() => {
            if (Salaries.length > 0) {
                return true
            }
            else {
                return false
            }
        })()
        const totalPages = Math.floor(Salaries.length/10) + 1
        const nextPage = (totalPages>page)?((page) + 1):0
        const previousPage = (page<=1)? 0:page-1
        res.render('salary/index',{Salaries,page,nextPage,previousPage,totalPages,isData})
    } catch (error) {
        return res.status(500).json({ error })
    }
}


const createSalaryPage = async (req, res, next) => {
    try {
        const years = [new Date().getFullYear() - 1, new Date().getFullYear(), new Date().getFullYear() + 1]
        const Employees = await Employee.findAll()
        res.render('salary/create', { Employees, years })
    } catch (error) {
        res.status(404).json({ error })
    }
}


const create = async (req, res, next) => {
    try {
        const { employee_id, month, year, total_working_days, total_leave_taken, overtime } = req.body
        const check = await Salary.findAll({
            where: Sequelize.and(
                { employee_id: employee_id },
                { month: month },
                { year: year }
            )
        })
        if (check.length > 0) {
            return res.status(200).json({ messege: "Salary for this month is already calculated" })
        }
        else {

            const addedSalary = await Salary.create({
                employee_id, month, year, total_working_days, total_leave_taken, overtime,
            })
            return res.redirect('/salary/getAll/1')
        }
    }
    catch (error) {
        return res.status(500).json({ error })
    }

}


const isSalaryCalculated = async (req, res, next) => {
    try {
        const { employee_id, month, year } = req.body
        const check = await Salary.findAll({
            where: Sequelize.and(
                { employee_id: employee_id },
                { month: month },
                { year: year }
            )
        })
        if (check.length > 0) {
            return res.json({ state: true })
        }
        else {
            return res.json({ state: false })
        }
    } catch (error) {
        return res.json({ error })
    }
}


const notCalculatedSalary = async (req, res, next) => {
    cron.schedule('* * * /2',async () => {
        try {
            const notCalculatedSalaries = await Salary.findAll({
                where: {
                    Is_salary_calculated: 0
                }
            })
            res.status(200).json({ notCalculatedSalaries })
        }
        catch (error) {
            return res.status(500).json({ error })
        }
    })
}


const makeSalary = async (req, res, next) => {  
    try {
        var email_addresses = []
        const allSalaries = await Employee.findAll({
            include: [{
                model: Salary,
                where: {
                    Is_salary_calculated: 0
                }
            }]
        })
        if(allSalaries.length>0){
            allSalaries.forEach(async (val) => {
            let per_day_salary = (val.base_salary/30)
            let totalSalary = ((per_day_salary) * ((val.Salary.total_working_days - val.Salary.total_leave_taken) + (val.Salary.overtime / 8)))

            await Salary.update(
                { total_salary_made: totalSalary, Is_salary_calculated: 1 },
                { where: { id: val.Salary.id } })
            email_addresses.push(val.email)
        })
        setTimeout(function() {
            send(email_addresses);
        }, 3000)
        console.log(email_addresses);
        console.log("calculated successfully");
        return res.redirect('/salary/getAll/1')
        }
        else{
            console.log("No salaries to calculate");
            return res.redirect('/salary/getAll/1')  
        }
    } catch (error) {
        return res.status(500).json({ error })
    }
}


module.exports = { getAllSalary, createSalaryPage, create, isSalaryCalculated, notCalculatedSalary, makeSalary }