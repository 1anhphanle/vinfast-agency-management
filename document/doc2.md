## Tài liệu thiết kế chi tiết hệ thống quản lý đại lý xe VinFast

### 1. Giới thiệu

Tài liệu này cung cấp thiết kế chi tiết cho hệ thống quản lý đại lý xe VinFast. Hệ thống được thiết kế để hỗ trợ các đại lý VinFast trong việc quản lý hoạt động kinh doanh, từ việc quản lý thông tin khách hàng, quản lý xe, quản lý giao dịch đến quản lý doanh thu và lợi nhuận.

Hệ thống được xây dựng trên nền tảng web, sử dụng ngôn ngữ lập trình PHP, framework Laravel và cơ sở dữ liệu MySQL.

### 2. Mô hình dữ liệu

#### 2.1. Bảng Customer (Khách hàng)

| Cột          | Kiểu dữ liệu | Mô tả                                                          |
| ------------ | ------------ | -------------------------------------------------------------- |
| CustomerID   | INT          | Mã khách hàng (khóa chính)                                     |
| CustomerName | VARCHAR(255) | Tên khách hàng                                                 |
| PhoneNumber  | VARCHAR(15)  | Số điện thoại                                                  |
| Email        | VARCHAR(255) | Địa chỉ email                                                  |
| Address      | TEXT         | Địa chỉ                                                        |
| IsActive     | BOOLEAN      | Trạng thái hoạt động (true: hoạt động, false: không hoạt động) |

#### 2.2. Bảng Car (Xe)

| Cột         | Kiểu dữ liệu  | Mô tả                                                          |
| ----------- | ------------- | -------------------------------------------------------------- |
| CarID       | INT           | Mã xe (khóa chính)                                             |
| ModelName   | VARCHAR(255)  | Tên mẫu xe                                                     |
| Color       | VARCHAR(50)   | Màu sắc                                                        |
| Price       | DECIMAL(10,2) | Giá bán                                                        |
| Quantity    | INT           | Số lượng tồn kho                                               |
| Image       | VARCHAR(255)  | Đường dẫn ảnh                                                  |
| Description | TEXT          | Mô tả                                                          |
| IsActive    | BOOLEAN       | Trạng thái hoạt động (true: hoạt động, false: không hoạt động) |

#### 2.3. Bảng Agency (Đại lý)

| Cột         | Kiểu dữ liệu | Mô tả                                                          |
| ----------- | ------------ | -------------------------------------------------------------- |
| AgencyID    | INT          | Mã đại lý (khóa chính)                                         |
| AgencyName  | VARCHAR(255) | Tên đại lý                                                     |
| Address     | TEXT         | Địa chỉ                                                        |
| PhoneNumber | VARCHAR(15)  | Số điện thoại                                                  |
| Email       | VARCHAR(255) | Địa chỉ email                                                  |
| IsActive    | BOOLEAN      | Trạng thái hoạt động (true: hoạt động, false: không hoạt động) |

#### 2.4. Bảng Transaction (Giao dịch)

| Cột             | Kiểu dữ liệu                                         | Mô tả                      |
| --------------- | ---------------------------------------------------- | -------------------------- |
| TransactionID   | INT                                                  | Mã giao dịch (khóa chính)  |
| CustomerID      | INT                                                  | Mã khách hàng (khóa ngoại) |
| CarID           | INT                                                  | Mã xe (khóa ngoại)         |
| AgencyID        | INT                                                  | Mã đại lý (khóa ngoại)     |
| TransactionDate | DATE                                                 | Ngày giao dịch             |
| TotalPrice      | DECIMAL(10,2)                                        | Tổng giá trị giao dịch     |
| Status          | ENUM('PENDING', 'APPROVED', 'COMPLETED', 'CANCELED') | Trạng thái giao dịch       |

#### 2.5. Bảng Promotion (Ưu đãi)

| Cột           | Kiểu dữ liệu | Mô tả                  |
| ------------- | ------------ | ---------------------- |
| PromotionID   | INT          | Mã ưu đãi (khóa chính) |
| PromotionName | VARCHAR(255) | Tên ưu đãi             |
| Description   | TEXT         | Mô tả                  |
| Discount      | DECIMAL(5,2) | Mức giảm giá (%)       |
| StartDate     | DATE         | Ngày bắt đầu           |
| EndDate       | DATE         | Ngày kết thúc          |

#### 2.6. Bảng Employee (Nhân viên)

| Cột          | Kiểu dữ liệu                    | Mô tả                     |
| ------------ | ------------------------------- | ------------------------- |
| EmployeeID   | INT                             | Mã nhân viên (khóa chính) |
| EmployeeName | VARCHAR(255)                    | Tên nhân viên             |
| PhoneNumber  | VARCHAR(15)                     | Số điện thoại             |
| Email        | VARCHAR(255)                    | Địa chỉ email             |
| AgencyID     | INT                             | Mã đại lý (khóa ngoại)    |
| Role         | ENUM('ADMIN', 'SALES', 'STAFF') | Vai trò                   |

#### 2.7. Bảng Deposit (Đặt cọc)

| Cột           | Kiểu dữ liệu                            | Mô tả                      |
| ------------- | --------------------------------------- | -------------------------- |
| DepositID     | INT                                     | Mã đặt cọc (khóa chính)    |
| CustomerID    | INT                                     | Mã khách hàng (khóa ngoại) |
| CarID         | INT                                     | Mã xe (khóa ngoại)         |
| DepositAmount | DECIMAL(10,2)                           | Số tiền đặt cọc            |
| DepositDate   | DATE                                    | Ngày đặt cọc               |
| Status        | ENUM('PENDING', 'APPROVED', 'CANCELED') | Trạng thái đặt cọc         |

### 3. Mô hình sử dụng (Use Case Diagram)

#### 3.1. Use Case Quản lý khách hàng

- **Thêm khách hàng**: Người dùng nhập thông tin khách hàng mới vào hệ thống.
- **Sửa thông tin khách hàng**: Người dùng sửa thông tin khách hàng đã tồn tại.
- **Xóa khách hàng**: Người dùng xóa thông tin khách hàng khỏi hệ thống.
- **Xem thông tin khách hàng**: Người dùng xem thông tin chi tiết của một khách hàng.
- **Tìm kiếm khách hàng**: Người dùng tìm kiếm khách hàng theo nhiều tiêu chí.
- **Quản lý lịch sử mua xe**: Người dùng xem lịch sử mua xe của khách hàng.
- **Quản lý đặt cọc**: Người dùng quản lý các đơn đặt cọc của khách hàng.
- **Quản lý ưu đãi**: Người dùng quản lý các ưu đãi áp dụng cho khách hàng.

#### 3.2. Use Case Quản lý xe

- **Thêm xe**: Người dùng nhập thông tin xe mới vào hệ thống.
- **Sửa thông tin xe**: Người dùng sửa thông tin xe đã tồn tại.
- **Xóa xe**: Người dùng xóa thông tin xe khỏi hệ thống.
- **Xem thông tin xe**: Người dùng xem thông tin chi tiết của một xe.
- **Tìm kiếm xe**: Người dùng tìm kiếm xe theo nhiều tiêu chí.
- **Quản lý tồn kho**: Người dùng quản lý số lượng xe tồn kho.
- **Nhập kho**: Người dùng ghi nhận việc nhập xe vào kho.
- **Xuất kho**: Người dùng ghi nhận việc xuất xe khỏi kho.

#### 3.3. Use Case Quản lý đại lý

- **Thêm đại lý**: Người dùng nhập thông tin đại lý mới vào hệ thống.
- **Sửa thông tin đại lý**: Người dùng sửa thông tin đại lý đã tồn tại.
- **Xóa đại lý**: Người dùng xóa thông tin đại lý khỏi hệ thống.
- **Xem thông tin đại lý**: Người dùng xem thông tin chi tiết của một đại lý.
- **Tìm kiếm đại lý**: Người dùng tìm kiếm đại lý theo nhiều tiêu chí.
- **Quản lý nhân viên**: Người dùng quản lý thông tin nhân viên của đại lý.

#### 3.4. Use Case Quản lý giao dịch

- **Tạo giao dịch**: Người dùng tạo một giao dịch mua bán xe mới.
- **Xác nhận giao dịch**: Người dùng xác nhận giao dịch đã tạo.
- **Hoàn thành giao dịch**: Người dùng hoàn thành giao dịch sau khi xe được giao.
- **Hủy giao dịch**: Người dùng hủy giao dịch đã tạo.
- **Theo dõi trạng thái giao dịch**: Người dùng xem trạng thái của các giao dịch.

#### 3.5. Use Case Quản lý doanh thu và lợi nhuận

- **Xem báo cáo doanh thu**: Người dùng xem báo cáo doanh thu theo các khoảng thời gian khác nhau.
- **Xem báo cáo lợi nhuận**: Người dùng xem báo cáo lợi nhuận theo các khoảng thời gian khác nhau.
- **Xem báo cáo chi phí**: Người dùng xem báo cáo chi phí theo các khoảng thời gian khác nhau.
- **Xuất báo cáo**: Người dùng xuất báo cáo doanh thu, lợi nhuận, chi phí ra các định dạng file khác nhau (Excel, PDF).

### 4. Kiến trúc hệ thống

#### 4.1. Kiến trúc 3 lớp (3-Tier Architecture)

- **Lớp trình bày (Presentation Layer):** Giao diện người dùng (UI) được xây dựng bằng HTML, CSS và JavaScript.
- **Lớp logic nghiệp vụ (Business Logic Layer):** Chứa các lớp xử lý logic nghiệp vụ của hệ thống, sử dụng framework Laravel.
- **Lớp truy cập dữ liệu (Data Access Layer):** Truy cập và quản lý cơ sở dữ liệu MySQL.

#### 4.2. Sơ đồ kiến trúc

![Sơ đồ kiến trúc hệ thống](https://i.imgur.com/0wU31zM.png)

### 5. Quy trình hoạt động

#### 5.1. Quy trình thêm khách hàng

1. Người dùng truy cập vào trang quản lý khách hàng.
2. Người dùng nhấp vào nút "Thêm khách hàng".
3. Hệ thống hiển thị form nhập thông tin khách hàng.
4. Người dùng nhập đầy đủ thông tin khách hàng vào form.
5. Người dùng nhấp vào nút "Lưu".
6. Hệ thống lưu thông tin khách hàng vào cơ sở dữ liệu.
7. Hệ thống thông báo cho người dùng về kết quả thêm khách hàng.

#### 5.2. Quy trình tạo giao dịch

1. Người dùng truy cập vào trang quản lý giao dịch.
2. Người dùng nhấp vào nút "Tạo giao dịch".
3. Hệ thống hiển thị form tạo giao dịch.
4. Người dùng chọn thông tin khách hàng, thông tin xe và đại lý.
5. Người dùng nhập đầy đủ thông tin giao dịch vào form.
6. Người dùng nhấp vào nút "Lưu".
7. Hệ thống lưu thông tin giao dịch vào cơ sở dữ liệu.
8. Hệ thống thông báo cho người dùng về kết quả tạo giao dịch.

#### 5.3. Quy trình đặt cọc

1. Người dùng truy cập vào trang quản lý đặt cọc.
2. Người dùng nhấp vào nút "Đặt cọc".
3. Hệ thống hiển thị form đặt cọc.
4. Người dùng chọn thông tin khách hàng, thông tin xe và nhập số tiền đặt cọc.
5. Người dùng nhấp vào nút "Lưu".
6. Hệ thống lưu thông tin đặt cọc vào cơ sở dữ liệu.
7. Hệ thống thông báo cho người dùng về kết quả đặt cọc.

### 6. Bảo mật

- **Xác thực người dùng:** Hệ thống sử dụng cơ chế xác thực người dùng để đảm bảo an toàn cho dữ liệu.
- **Mã hóa dữ liệu:** Hệ thống sử dụng mã hóa để bảo mật các thông tin nhạy cảm như mật khẩu, số điện thoại, địa chỉ email.
- **Kiểm tra quyền truy cập:** Hệ thống kiểm tra quyền truy cập của người dùng để đảm bảo chỉ những người có quyền truy cập được phép xem và sửa đổi dữ liệu.
- **Kiểm tra lỗi SQL Injection:** Hệ thống được thiết kế để phòng chống các cuộc tấn công SQL Injection.

### 7. Lưu ý

- Tài liệu này chỉ là tài liệu thiết kế chi tiết cho hệ thống. Các chi tiết kỹ thuật cụ thể sẽ được nêu rõ trong tài liệu mã nguồn.
- Hệ thống sẽ được phát triển và cập nhật liên tục theo nhu cầu của người dùng và tình hình thực tế.

### 8. Kết luận

Hệ thống quản lý đại lý xe VinFast được thiết kế để hỗ trợ các đại lý VinFast trong việc quản lý hoạt động kinh doanh. Hệ thống giúp tối ưu hóa quy trình quản lý, nâng cao hiệu quả kinh doanh và mang lại sự hài lòng cho khách hàng.
