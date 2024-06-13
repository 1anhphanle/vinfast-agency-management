require('dotenv').config(); // Load .env file

module.exports = {
    development: {
        dialect: 'postgres',
        host: process.env.DB_HOST, // Ví dụ: localhost
        port: process.env.DB_PORT, // Ví dụ: 5432
        database: process.env.DB_NAME, // Ví dụ: vinfast_agency_management
        username: process.env.DB_USER, // Ví dụ: your_username
        password: process.env.DB_PASSWORD, // Ví dụ: your_password
    },
    // ... other environments
};