const { Employee } = require('../models');

// Lấy danh sách tất cả nhân viên
const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Lấy thông tin chi tiết nhân viên theo ID
const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (employee) {
            res.json(employee);
        } else {
            res.status(404).json({ error: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Tạo nhân viên mới
const createEmployee = async (req, res) => {
    try {
        const employee = await Employee.create(req.body);
        res.status(201).json(employee);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
};

// Cập nhật thông tin nhân viên theo ID
const updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (employee) {
            await employee.update(req.body);
            res.json(employee);
        } else {
            res.status(404).json({ error: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Xóa nhân viên theo ID
const deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (employee) {
            await employee.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
};