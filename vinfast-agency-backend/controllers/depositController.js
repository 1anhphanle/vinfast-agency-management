const { Deposit } = require('../models');

// Lấy danh sách tất cả đặt cọc
const getAllDeposits = async (req, res) => {
    try {
        const deposits = await Deposit.findAll();
        res.json(deposits);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Lấy thông tin chi tiết đặt cọc theo ID
const getDepositById = async (req, res) => {
    try {
        const deposit = await Deposit.findByPk(req.params.id);
        if (deposit) {
            res.json(deposit);
        } else {
            res.status(404).json({ error: 'Deposit not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Tạo đặt cọc mới
const createDeposit = async (req, res) => {
    try {
        const deposit = await Deposit.create(req.body);
        res.status(201).json(deposit);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
};

// Cập nhật thông tin đặt cọc theo ID
const updateDeposit = async (req, res) => {
    try {
        const deposit = await Deposit.findByPk(req.params.id);
        if (deposit) {
            await deposit.update(req.body);
            res.json(deposit);
        } else {
            res.status(404).json({ error: 'Deposit not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Xóa đặt cọc theo ID
const deleteDeposit = async (req, res) => {
    try {
        const deposit = await Deposit.findByPk(req.params.id);
        if (deposit) {
            await deposit.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Deposit not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllDeposits,
    getDepositById,
    createDeposit,
    updateDeposit,
    deleteDeposit,
};