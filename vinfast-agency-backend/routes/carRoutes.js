const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

// Lấy danh sách tất cả xe
router.get('/cars', carController.getAllCars);

// Lấy thông tin chi tiết xe theo ID
router.get('/cars/:id', carController.getCarById);

// Tạo xe mới
router.post('/cars', carController.createCar);

// Cập nhật thông tin xe theo ID
router.put('/cars/:id', carController.updateCar);

// Xóa xe theo ID
router.delete('/cars/:id', carController.deleteCar);

module.exports = router;