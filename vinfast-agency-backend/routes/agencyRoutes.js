const express = require('express');
const router = express.Router();
const agencyController = require('../controllers/agencyController');

// Lấy danh sách tất cả đại lý
router.get('/agencies', agencyController.getAllAgencies);

// Lấy thông tin chi tiết đại lý theo ID
router.get('/agencies/:id', agencyController.getAgencyById);

// Tạo đại lý mới
router.post('/agencies', agencyController.createAgency);

// Cập nhật thông tin đại lý theo ID
router.put('/agencies/:id', agencyController.updateAgency);

// Xóa đại lý theo ID
router.delete('/agencies/:id', agencyController.deleteAgency);

module.exports = router;