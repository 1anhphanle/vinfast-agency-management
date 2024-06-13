const express = require('express');
const app = express();
const cors = require('cors');
const customerRoutes = require('./routes/customerRoutes');
const carRoutes = require('./routes/carRoutes');
const agencyRoutes = require('./routes/agencyRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const promotionRoutes = require('./routes/promotionRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const depositRoutes = require('./routes/depositRoutes');

const { Customer, Car, Agency, Transaction, Promotion, Employee, Deposit } = require('./models');

app.use(express.json());
app.use(cors());

// Sử dụng các route
app.use('/api/customers', customerRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/agencies', agencyRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/promotions', promotionRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/deposits', depositRoutes);

// Kiểm tra kết nối database
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});