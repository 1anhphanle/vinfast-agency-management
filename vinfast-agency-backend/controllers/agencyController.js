const { Agency } = require('../models');

// Lấy danh sách tất cả đại lý
const getAllAgencies = async (req, res) => {
    try {
        const agencies = await Agency.findAll();
        res.json(agencies);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Lấy thông tin chi tiết đại lý theo ID
const getAgencyById = async (req, res) => {
    try {
        const agency = await Agency.findByPk(req.params.id);
        if (agency) {
            res.json(agency);
        } else {
            res.status(404).json({ error: 'Agency not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Tạo đại lý mới
const createAgency = async (req, res) => {
    try {
        const agency = await Agency.create(req.body);
        res.status(201).json(agency);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
};

// Cập nhật thông tin đại lý theo ID
const updateAgency = async (req, res) => {
    try {
        const agency = await Agency.findByPk(req.params.id);
        if (agency) {
            await agency.update(req.body);
            res.json(agency);
        } else {
            res.status(404).json({ error: 'Agency not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Xóa đại lý theo ID
const deleteAgency = async (req, res) => {
    try {
        const agency = await Agency.findByPk(req.params.id);
        if (agency) {
            await agency.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Agency not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllAgencies,
    getAgencyById,
    createAgency,
    updateAgency,
    deleteAgency,
};