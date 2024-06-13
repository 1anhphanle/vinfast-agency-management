const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Lấy danh sách tất cả nhân viên
router.get('/employees', employeeController.getAllEmployees);

// Lấy thông tin chi tiết nhân viên theo ID
router.get('/employees/:id', employeeController.getEmployeeById);

// Tạo nhân viên mới
router.post('/employees', employeeController.createEmployee);

// Cập nhật thông tin nhân viên theo ID
router.put('/employees/:id', employeeController.updateEmployee);

// Xóa nhân viên theo ID
router.delete('/employees/:id', employeeController.deleteEmployee);

module.exports = router;