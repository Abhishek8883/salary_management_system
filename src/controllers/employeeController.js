const { Employee } = require('../models/index')


const getAllEmployee = async (req, res, next) => {
    try {
        let p = (req.params.page <= 0) ? 1 : req.params.page
        let page = Number(p)
        const Employees = await Employee.findAndCountAll({
            limit: 10,
            offset: ((page - 1) * 10)
        })
        const isData = (() => {
            if (Employees.rows.length > 0) {
                return true
            }
            else {
                return false
            }
        })()
        const totalPages = Math.floor(Employees.count / 10) + 1
        const nextPage = (totalPages>(page))?((page) + 1):0
        const previousPage = (page <= 1) ? 0 : page - 1
        res.render('employee/index', { Employees, page, previousPage, nextPage, totalPages, isData })
    } catch (err) {
        return res.status(500).json({ error: err })
    }
}


const createEmployeePage = (req, res, next) => {
    try {
        res.render('employee/create')
    } catch (error) {
        return res.status(400).json({ error })
    }
}

const createEmployee = async (req, res, next) => {
    try {
        const { Name, email, mobile, address, base_salary } = req.body
        const createdEmployee = await Employee.create({
            Name, email, mobile, address, base_salary
        })

        return res.redirect('/employee/getAll/1')
    } catch (err) {
        return res.status(500).json({ Error: err })
    }
}


const editEmployeePage = async (req, res, next) => {
    try {
        const foundEmployee = await Employee.findAll({
            where: {
                id: req.params.employeeid
            }
        })
        const employee = foundEmployee[0].dataValues
        res.render('employee/edit', { employee })
    } catch (error) {
        return res.status(500).json({ error })
    }

}


const editEmployee = async (req, res, next) => {
    try {
        const { Name, email, mobile, address, base_salary } = req.body
        let editedEmployee = await Employee.update(
            { Name, email, mobile, address, base_salary },
            { where: { id: req.params.employeeid } })

        res.redirect('/employee/getAll/1')
    } catch (error) {
        return res.status(500).json({ error })
    }
}


const deleteEmployee = async (req, res, next) => {
    try {
        const deletedEmployee = await Employee.destroy({
            where: {
                id: req.params.employeeid
            }
        })
        return res.redirect('/employee/getAll/1')
    }
    catch (error) {
        return res.status(500).json({ error })
    }


}

module.exports = { getAllEmployee, createEmployee, editEmployeePage, editEmployee, deleteEmployee, createEmployeePage }