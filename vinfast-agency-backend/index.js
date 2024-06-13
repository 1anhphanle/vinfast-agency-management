const express = require('express');
const app = express();
const cors = require('cors');
const { Customer, Car, Agency, Transaction, Promotion, Employee, Deposit } = require('./models');
const authMiddleware = require('./middleware/authMiddleware');
const errorHandler = require('./middleware/errorHandler');
const generateToken = require('./utils/generateToken');
const validateData = require('./utils/validateData');
const router = express.Router();
const customerRoutes = require('./routes/customerRoutes');
const carRoutes = require('./routes/carRoutes');
const agencyRoutes = require('./routes/agencyRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const promotionRoutes = require('./routes/promotionRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const depositRoutes = require('./routes/depositRoutes');

//  Khởi tạo kết nối database
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        // Khởi động server sau khi kết nối database thành công
        app.use(express.json());
        app.use(cors());
        app.use('/api/customers', customerRoutes);
        app.use('/api/cars', carRoutes);
        app.use('/api/agencies', agencyRoutes);
        app.use('/api/transactions', transactionRoutes);
        app.use('/api/promotions', promotionRoutes);
        app.use('/api/employees', employeeRoutes);
        app.use('/api/deposits', depositRoutes);

        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

app.use(errorHandler);