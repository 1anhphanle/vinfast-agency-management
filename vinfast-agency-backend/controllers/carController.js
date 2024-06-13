const { Car } = require('../models');

// Lấy danh sách tất cả xe
const getAllCars = async (req, res) => {
    try {
        const cars = await Car.findAll();
        res.json(cars);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Lấy thông tin chi tiết xe theo ID
const getCarById = async (req, res) => {
    try {
        const car = await Car.findByPk(req.params.id);
        if (car) {
            res.json(car);
        } else {
            res.status(404).json({ error: 'Car not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Tạo xe mới
const createCar = async (req, res) => {
    try {
        const car = await Car.create(req.body);
        res.status(201).json(car);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
};

// Cập nhật thông tin xe theo ID
const updateCar = async (req, res) => {
    try {
        const car = await Car.findByPk(req.params.id);
        if (car) {
            await car.update(req.body);
            res.json(car);
        } else {
            res.status(404).json({ error: 'Car not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Xóa xe theo ID
const deleteCar = async (req, res) => {
    try {
        const car = await Car.findByPk(req.params.id);
        if (car) {
            await car.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Car not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar,
};