// controllers/customerController.js
const { Customer } = require('../models');

const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id);
        if (customer) {
            res.json(customer);
        } else {
            res.status(404).json({ error: 'Customer not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createCustomer = async (req, res) => {
    try {
        const customer = await Customer.create(req.body);
        res.status(201).json(customer);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
};

const updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id);
        if (customer) {
            await customer.update(req.body);
            res.json(customer);
        } else {
            res.status(404).json({ error: 'Customer not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id);
        if (customer) {
            await customer.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Customer not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
};