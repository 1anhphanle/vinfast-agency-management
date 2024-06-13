const { Promotion } = require('../models');

// Lấy danh sách tất cả ưu đãi
const getAllPromotions = async (req, res) => {
    try {
        const promotions = await Promotion.findAll();
        res.json(promotions);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Lấy thông tin chi tiết ưu đãi theo ID
const getPromotionById = async (req, res) => {
    try {
        const promotion = await Promotion.findByPk(req.params.id);
        if (promotion) {
            res.json(promotion);
        } else {
            res.status(404).json({ error: 'Promotion not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Tạo ưu đãi mới
const createPromotion = async (req, res) => {
    try {
        const promotion = await Promotion.create(req.body);
        res.status(201).json(promotion);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
};

// Cập nhật thông tin ưu đãi theo ID
const updatePromotion = async (req, res) => {
    try {
        const promotion = await Promotion.findByPk(req.params.id);
        if (promotion) {
            await promotion.update(req.body);
            res.json(promotion);
        } else {
            res.status(404).json({ error: 'Promotion not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Xóa ưu đãi theo ID
const deletePromotion = async (req, res) => {
    try {
        const promotion = await Promotion.findByPk(req.params.id);
        if (promotion) {
            await promotion.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Promotion not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllPromotions,
    getPromotionById,
    createPromotion,
    updatePromotion,
    deletePromotion,
};