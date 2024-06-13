const { Transaction } = require('../models');

// Lấy danh sách tất cả giao dịch
const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.findAll();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Lấy thông tin chi tiết giao dịch theo ID
const getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findByPk(req.params.id);
        if (transaction) {
            res.json(transaction);
        } else {
            res.status(404).json({ error: 'Transaction not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Tạo giao dịch mới
const createTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.create(req.body);
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
};

// Cập nhật thông tin giao dịch theo ID
const updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByPk(req.params.id);
        if (transaction) {
            await transaction.update(req.body);
            res.json(transaction);
        } else {
            res.status(404).json({ error: 'Transaction not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Xóa giao dịch theo ID
const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByPk(req.params.id);
        if (transaction) {
            await transaction.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Transaction not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllTransactions,
    getTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction,
};