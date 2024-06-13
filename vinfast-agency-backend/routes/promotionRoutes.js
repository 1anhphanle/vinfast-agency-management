const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/promotionController');

// Lấy danh sách tất cả ưu đãi
router.get('/promotions', promotionController.getAllPromotions);

// Lấy thông tin chi tiết ưu đãi theo ID
router.get('/promotions/:id', promotionController.getPromotionById);

// Tạo ưu đãi mới
router.post('/promotions', promotionController.createPromotion);

// Cập nhật thông tin ưu đãi theo ID
router.put('/promotions/:id', promotionController.updatePromotion);

// Xóa ưu đãi theo ID
router.delete('/promotions/:id', promotionController.deletePromotion);

module.exports = router;