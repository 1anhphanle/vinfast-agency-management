const express = require('express');
const router = express.Router();
const depositController = require('../controllers/depositController');

// Lấy danh sách tất cả đặt cọc
router.get('/deposits', depositController.getAllDeposits);

// Lấy thông tin chi tiết đặt cọc theo ID
router.get('/deposits/:id', depositController.getDepositById);

// Tạo đặt cọc mới
router.post('/deposits', depositController.createDeposit);

// Cập nhật thông tin đặt cọc theo ID
router.put('/deposits/:id', depositController.updateDeposit);

// Xóa đặt cọc theo ID
router.delete('/deposits/:id', depositController.deleteDeposit);

module.exports = router;