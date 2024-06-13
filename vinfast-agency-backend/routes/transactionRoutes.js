const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Lấy danh sách tất cả giao dịch
router.get('/transactions', transactionController.getAllTransactions);

// Lấy thông tin chi tiết giao dịch theo ID
router.get('/transactions/:id', transactionController.getTransactionById);

// Tạo giao dịch mới
router.post('/transactions', transactionController.createTransaction);

// Cập nhật thông tin giao dịch theo ID
router.put('/transactions/:id', transactionController.updateTransaction);

// Xóa giao dịch theo ID
router.delete('/transactions/:id', transactionController.deleteTransaction);

module.exports = router;