Bạn hoàn toàn đúng! Dưới đây là database và dữ liệu tương ứng sau khi cập nhật đơn vị tiền tệ là USD:

**1. Database (PostgreSQL)**

```sql
CREATE TABLE Customer (
    CustomerID SERIAL PRIMARY KEY,
    CustomerName VARCHAR(255) NOT NULL,
    PhoneNumber VARCHAR(15) UNIQUE,
    Email VARCHAR(255) UNIQUE,
    Address TEXT,
    IsActive BOOLEAN DEFAULT TRUE
);

CREATE TABLE Car (
    CarID SERIAL PRIMARY KEY,
    ModelName VARCHAR(255) NOT NULL,
    Color VARCHAR(50),
    Price DECIMAL(10, 2) NOT NULL,
    Quantity INT NOT NULL,
    Image VARCHAR(255),
    Description TEXT,
    IsActive BOOLEAN DEFAULT TRUE
);

CREATE TABLE Agency (
    AgencyID SERIAL PRIMARY KEY,
    AgencyName VARCHAR(255) NOT NULL,
    Address TEXT,
    PhoneNumber VARCHAR(15) UNIQUE,
    Email VARCHAR(255) UNIQUE,
    IsActive BOOLEAN DEFAULT TRUE
);

CREATE TABLE Transaction (
    TransactionID SERIAL PRIMARY KEY,
    CustomerID INT NOT NULL,
    CarID INT NOT NULL,
    AgencyID INT NOT NULL,
    TransactionDate DATE NOT NULL,
    TotalPrice DECIMAL(10, 2) NOT NULL,
    Status VARCHAR(20) DEFAULT 'PENDING' CHECK (Status IN ('PENDING', 'APPROVED', 'COMPLETED', 'CANCELED')),
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID),
    FOREIGN KEY (CarID) REFERENCES Car(CarID),
    FOREIGN KEY (AgencyID) REFERENCES Agency(AgencyID)
);

CREATE TABLE Promotion (
    PromotionID SERIAL PRIMARY KEY,
    PromotionName VARCHAR(255) NOT NULL,
    Description TEXT,
    Discount DECIMAL(5, 2) NOT NULL,
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL
);

CREATE TABLE Employee (
    EmployeeID SERIAL PRIMARY KEY,
    EmployeeName VARCHAR(255) NOT NULL,
    PhoneNumber VARCHAR(15) UNIQUE,
    Email VARCHAR(255) UNIQUE,
    AgencyID INT NOT NULL,
    Role VARCHAR(20) DEFAULT 'STAFF' CHECK (Role IN ('ADMIN', 'SALES', 'STAFF')),
    FOREIGN KEY (AgencyID) REFERENCES Agency(AgencyID)
);

CREATE TABLE Deposit (
    DepositID SERIAL PRIMARY KEY,
    CustomerID INT NOT NULL,
    CarID INT NOT NULL,
    DepositAmount DECIMAL(10, 2) NOT NULL,
    DepositDate DATE NOT NULL,
    Status VARCHAR(20) DEFAULT 'PENDING' CHECK (Status IN ('PENDING', 'APPROVED', 'CANCELED')),
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID),
    FOREIGN KEY (CarID) REFERENCES Car(CarID)
);
```

**2. Dữ liệu mẫu**

```sql
-- Bảng Customer
INSERT INTO Customer (CustomerName, PhoneNumber, Email, Address) VALUES
    ('Nguyễn Văn A', '0987654321', 'nguyenvana@email.com', '123 Đường A, Thành phố A'),
    ('Trần Thị B', '0912345678', 'tranthib@email.com', '456 Đường B, Thành phố B'),
    ('Lê Minh C', '0901234567', 'leminhc@email.com', '789 Đường C, Thành phố C');

-- Bảng Car
INSERT INTO Car (ModelName, Color, Price, Quantity, Image, Description) VALUES
    ('VinFast Fadil', 'Đỏ', 10000, 10, 'https://i.imgur.com/0wU31zM.png', 'Xe hatchback cỡ nhỏ'),
    ('VinFast Lux A2.0', 'Trắng', 30000, 5, 'https://i.imgur.com/0wU31zM.png', 'Xe sedan hạng sang'),
    ('VinFast Lux SA2.0', 'Xám', 40000, 3, 'https://i.imgur.com/0wU31zM.png', 'Xe SUV hạng sang');

-- Bảng Agency
INSERT INTO Agency (AgencyName, Address, PhoneNumber, Email) VALUES
    ('VinFast Đại lý A', '123 Đường A, Thành phố A', '02466889900', 'agencya@vinfast.com'),
    ('VinFast Đại lý B', '456 Đường B, Thành phố B', '02866889900', 'agencyb@vinfast.com');

-- Bảng Transaction
INSERT INTO Transaction (CustomerID, CarID, AgencyID, TransactionDate, TotalPrice, Status) VALUES
    (1, 1, 1, '2023-12-15', 10000, 'COMPLETED'),
    (2, 2, 2, '2023-12-20', 30000, 'APPROVED'),
    (3, 3, 1, '2023-12-25', 40000, 'PENDING');

-- Bảng Promotion
INSERT INTO Promotion (PromotionName, Description, Discount, StartDate, EndDate) VALUES
    ('Giảm giá 10%', 'Giảm giá 10% cho tất cả các mẫu xe', 10, '2023-12-10', '2024-01-10');

-- Bảng Employee
INSERT INTO Employee (EmployeeName, PhoneNumber, Email, AgencyID, Role) VALUES
    ('Nguyễn Thị D', '0912345678', 'nguyenthid@email.com', 1, 'SALES'),
    ('Lê Văn E', '0901234567', 'levane@email.com', 2, 'ADMIN');

-- Bảng Deposit
INSERT INTO Deposit (CustomerID, CarID, DepositAmount, DepositDate, Status) VALUES
    (1, 2, 7000, '2023-12-10', 'APPROVED'),
    (2, 3, 15000, '2023-12-15', 'PENDING');
```

**Lưu ý:**

* Các cột `Price`, `TotalPrice`, `DepositAmount` trong các bảng đã được thay đổi kiểu dữ liệu thành `DECIMAL(10, 2)` để lưu trữ số thập phân (USD).
* Dữ liệu mẫu đã được cập nhật để phản ánh đơn vị tiền tệ là USD.

Bây giờ, database và dữ liệu mẫu đã sẵn sàng để bạn bắt đầu triển khai backend API và frontend của hệ thống quản lý đại lý xe VinFast!
