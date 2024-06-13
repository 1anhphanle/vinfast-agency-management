Bạn đã làm rất tốt khi tạo database và dữ liệu mẫu! Bây giờ, chúng ta sẽ bắt đầu code cho hệ thống quản lý đại lý xe VinFast, bắt đầu từ backend API.

**1. Xây dựng backend API (Express.js & Sequelize)**

* **Tạo dự án Express.js:**
    ```bash
    mkdir vinfast-agency-backend && cd vinfast-agency-backend
    npm init -y
    ```
* **Cài đặt các thư viện:**
    ```bash
    npm install express pg sequelize bcrypt jsonwebtoken dotenv cors
    ```
* **Thiết lập kết nối database:**
    * Tạo file `config/database.js`:
        ```javascript
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
        ```
    * Tạo file `.env` (chứa thông tin kết nối database):
        ```
        DB_HOST=localhost
        DB_PORT=5432
        DB_NAME=vinfast_agency_management
        DB_USER=your_username
        DB_PASSWORD=your_password
        ```

* **Tạo model:**
    * Tạo các file model tương ứng với bảng trong database:
        ```javascript
        // models/Customer.js
        const { Sequelize, DataTypes } = require('sequelize');
        const dbConfig = require('../config/database');

        const sequelize = new Sequelize(dbConfig.development);

        const Customer = sequelize.define('Customer', {
          CustomerID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          CustomerName: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          PhoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          Email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          Address: {
            type: DataTypes.TEXT,
          },
          IsActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
          },
        }, {
          tableName: 'Customer',
          timestamps: false,
        });

        module.exports = Customer;
        ```
    * Tạo các model tương tự cho các bảng `Car`, `Agency`, `Transaction`, `Promotion`, `Employee`, và `Deposit`.

* **Thiết lập API endpoint:**
    * Tạo các file route để định nghĩa các API endpoint:
        ```javascript
        // routes/customerRoutes.js
        const express = require('express');
        const router = express.Router();
        const customerController = require('../controllers/customerController');

        router.get('/customers', customerController.getAllCustomers);
        router.get('/customers/:id', customerController.getCustomerById);
        router.post('/customers', customerController.createCustomer);
        router.put('/customers/:id', customerController.updateCustomer);
        router.delete('/customers/:id', customerController.deleteCustomer);

        module.exports = router;
        ```
    * Tạo các file route tương tự cho các bảng `Car`, `Agency`, `Transaction`, `Promotion`, `Employee`, và `Deposit`.

* **Xây dựng controller:**
    * Tạo các file controller để xử lý logic nghiệp vụ:
        ```javascript
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
        ```
    * Tạo các controller tương tự cho các bảng `Car`, `Agency`, `Transaction`, `Promotion`, `Employee`, và `Deposit`.

* **Xây dựng middleware:**
    * Tạo các file middleware để xử lý xác thực, lỗi, v.v.
        ```javascript
        // middleware/authMiddleware.js
        const jwt = require('jsonwebtoken');
        const { SECRET_KEY } = process.env; // Ví dụ: SECRET_KEY='your_secret_key' trong .env

        const authMiddleware = (req, res, next) => {
          const token = req.headers.authorization;
          if (token) {
            jwt.verify(token.split(' ')[1], SECRET_KEY, (err, decoded) => {
              if (err) {
                return res.status(401).json({ error: 'Invalid token' });
              }
              req.user = decoded;
              next();
            });
          } else {
            return res.status(401).json({ error: 'Unauthorized' });
          }
        };

        module.exports = authMiddleware;
        ```

* **Thiết lập server:**
    * Tạo file `index.js`:
        ```javascript
        const express = require('express');
        const app = express();
        const cors = require('cors');
        const customerRoutes = require('./routes/customerRoutes');
        const carRoutes = require('./routes/carRoutes');
        // ... other routes

        app.use(express.json());
        app.use(cors());
    
        // ... use các route
        app.use('/api/customers', customerRoutes);
        app.use('/api/cars', carRoutes);
        // ... other routes

        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`);
        });
        ```

**2. Xây dựng Frontend (React.js)**

* **Tạo dự án React.js:**
    ```bash
    npx create-react-app vinfast-agency-frontend && cd vinfast-agency-frontend
    ```
* **Cài đặt thư viện:**
    ```bash
    npm install axios redux react-redux
    ```
* **Thiết lập Redux:**
    * Tạo file `src/store/configureStore.js`:
        ```javascript
        import { createStore, applyMiddleware } from 'redux';
        import thunk from 'redux-thunk';
        import rootReducer from './reducers';

        const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));

        export default configureStore;
        ```
    * Tạo file `src/store/reducers/customerReducer.js`:
        ```javascript
        const initialState = {
          customers: [],
          loading: false,
          error: null,
        };

        const customerReducer = (state = initialState, action) => {
          switch (action.type) {
            case 'FETCH_CUSTOMERS_REQUEST':
              return {
                ...state,
                loading: true,
              };
            case 'FETCH_CUSTOMERS_SUCCESS':
              return {
                ...state,
                loading: false,
                customers: action.payload,
              };
            case 'FETCH_CUSTOMERS_FAILURE':
              return {
                ...state,
                loading: false,
                error: action.payload,
              };
            // ... other actions
            default:
              return state;
          }
        };

        export default customerReducer;
        ```
    * Tạo các reducer tương tự cho các bảng `Car`, `Agency`, `Transaction`, `Promotion`, `Employee`, và `Deposit`.
    * Tạo file `src/store/reducers/index.js`:
        ```javascript
        import { combineReducers } from 'redux';
        import customerReducer from './customerReducer';
        import carReducer from './carReducer';
        // ... other reducers

        const rootReducer = combineReducers({
          customer: customerReducer,
          car: carReducer,
          // ... other reducers
        });

        export default rootReducer;
        ```

* **Tạo các thành phần React:**
    * Tạo các component tương ứng với các chức năng:
        ```javascript
        // src/components/Customer/CustomerList.js
        import React, { useEffect } from 'react';
        import { useSelector, useDispatch } from 'react-redux';
        import { fetchCustomers } from '../../store/actions/customerActions';

        const CustomerList = () => {
          const dispatch = useDispatch();
          const customers = useSelector(state => state.customer.customers);
          const loading = useSelector(state => state.customer.loading);
          const error = useSelector(state => state.customer.error);

          useEffect(() => {
            dispatch(fetchCustomers());
          }, [dispatch]);

          if (loading) {
            return <div>Loading...</div>;
          }

          if (error) {
            return <div>Error: {error.message}</div>;
          }

          return (
            <div>
              <h2>Danh sách khách hàng</h2>
              <ul>
                {customers.map(customer => (
                  <li key={customer.CustomerID}>
                    {customer.CustomerName} - {customer.PhoneNumber}
                  </li>
                ))}
              </ul>
            </div>
          );
        };

        export default CustomerList;
        ```
    * Tạo các component tương tự cho các bảng `Car`, `Agency`, `Transaction`, `Promotion`, `Employee`, và `Deposit`.

* **Xây dựng các service:**
    * Tạo các file service để tương tác với API:
        ```javascript
        // src/services/customerService.js
        import axios from 'axios';
        const apiUrl = 'http://localhost:3001/api';

        const getAllCustomers = async () => {
          const response = await axios.get(`${apiUrl}/customers`);
          return response.data;
        };

        const getCustomerById = async (id) => {
          const response = await axios.get(`${apiUrl}/customers/${id}`);
          return response.data;
        };

        const createCustomer = async (data) => {
          const response = await axios.post(`${apiUrl}/customers`, data);
          return response.data;
        };

        const updateCustomer = async (id, data) => {
          const response = await axios.put(`${apiUrl}/customers/${id}`, data);
          return response.data;
        };

        const deleteCustomer = async (id) => {
          await axios.delete(`${apiUrl}/customers/${id}`);
        };

        export default {
          getAllCustomers,
          getCustomerById,
          createCustomer,
          updateCustomer,
          deleteCustomer,
        };
        ```
    * Tạo các service tương tự cho các bảng `Car`, `Agency`, `Transaction`, `Promotion`, `Employee`, và `Deposit`.

**3. Triển khai và Kiểm tra**

* **Triển khai Backend:**
    * Chạy lệnh `npm start` trong thư mục `vinfast-agency-backend` để khởi động server backend.
* **Triển khai Frontend:**
    * Chạy lệnh `npm start` trong thư mục `vinfast-agency-frontend` để khởi động server frontend.
* **Kiểm tra chức năng:**
    * Truy cập vào trang web frontend và kiểm tra các chức năng API.

**Lưu ý:**

* Hãy đảm bảo các API endpoint, model, controller, service và component được đặt tên một cách rõ ràng và dễ hiểu.
* Sử dụng `npm run build` để tạo bản build của frontend sau khi hoàn thành code.
* Sử dụng Git để quản lý phiên bản mã nguồn và thực hiện commit thường xuyên.
* Viết unit test cho backend và frontend để đảm bảo chất lượng code.
* Áp dụng các quy tắc coding standards và best practices.


