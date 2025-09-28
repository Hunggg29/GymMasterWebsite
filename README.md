# GymMasterWebsite

GymMasterWebsite là một nền tảng quản lý phòng tập gym hiện đại, cung cấp các công cụ quản lý toàn diện cho cả chủ phòng tập và người dùng.

## Tính năng chính

### Cho người dùng
- Đăng ký và đăng nhập tài khoản
- Xem thông tin phòng tập và các gói tập
- Đặt lịch tập và quản lý lịch tập cá nhân
- Đăng ký gói tập và thanh toán trực tuyến
- Gửi phản hồi và đánh giá về dịch vụ
- Xem lịch sử tập luyện và thanh toán
- Liên hệ với phòng tập
- Xem thông tin huấn luyện viên và thiết bị

### Cho quản trị viên
- Quản lý thông tin phòng tập và thiết bị
- Quản lý gói tập và giá cả
- Quản lý lịch tập và huấn luyện viên
- Xử lý đơn đăng ký và thanh toán
- Quản lý phản hồi từ người dùng
- Thống kê và báo cáo doanh thu
- Quản lý người dùng và quyền truy cập
- Xử lý liên hệ từ khách hàng

## Công nghệ sử dụng

### Frontend
- React.js với Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Icons & FontAwesome
- React Toastify & React Hot Toast
- React Hook Form
- React DatePicker
- Chart.js & React Chart.js 2
- Framer Motion & Anime.js
- AOS (Animate On Scroll)
- React Scroll Parallax
- Swiper
- Headless UI

### Backend
- ASP.NET Core 7.0
- Entity Framework Core
- SQL Server
- AutoMapper
- JWT Authentication
- Swagger/OpenAPI
- CORS
- Dependency Injection
- Email Service

## Cài đặt và Chạy dự án

### Yêu cầu hệ thống
- .NET 8.0 SDK
- SQL Server
- Node.js (phiên bản 14.0.0 trở lên)
- npm hoặc yarn

### Cài đặt Backend

1. Di chuyển vào thư mục backend:
```bash
cd GymMasterWebsite/GymMaster.API
```

2. Khôi phục các package NuGet:
```bash
dotnet restore
```

3. Cập nhật connection string trong file `appsettings.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=GymMaster;Trusted_Connection=True;MultipleActiveResultSets=true"
  },
  "Jwt": {
    "Key": "your_jwt_secret_key",
    "Issuer": "your_issuer",
    "Audience": "your_audience"
  }
}
```

4. Tạo và cập nhật database:
```bash
dotnet ef database update
```

5. Khởi chạy server:
```bash
dotnet run
```

### Cài đặt Frontend

1. Di chuyển vào thư mục client:
```bash
cd GymMasterWebsite/client
```

2. Cài đặt các dependencies:
```bash
npm install
```

3. Tạo file .env trong thư mục client với các biến môi trường sau:
```
VITE_API_URL=http://localhost:5000/api
```

4. Khởi chạy ứng dụng:
```bash
npm run dev
```

## Cấu trúc thư mục

```
GymMasterWebsite/
├── client/                 # Frontend React application
│   ├── public/            # Static files
│   └── src/               # Source code
│       ├── components/    # React components
│       ├── pages/         # Page components
│       ├── context/       # Context providers
│       ├── hooks/         # Custom hooks
│       ├── utils/         # Utility functions
│       └── assets/        # Images and other assets
│
└── GymMaster.API/         # Backend ASP.NET Core application
    ├── Controllers/       # API Controllers
    │   ├── AdminController.cs
    │   ├── AuthController.cs
    │   ├── ContactController.cs
    │   ├── EquipmentController.cs
    │   ├── FeedbackController.cs
    │   ├── GymRoomController.cs
    │   ├── PaymentController.cs
    │   ├── PlanController.cs
    │   ├── SubscriptionController.cs
    │   ├── TrainerController.cs
    │   ├── TrainingSessionController.cs
    │   └── UsersController.cs
    ├── Models/           # Entity models
    ├── Services/         # Business logic services
    │   ├── Interfaces/   # Service interfaces
    │   └── Implementations/ # Service implementations
    ├── Data/             # Database context and configurations
    ├── Mappings/         # AutoMapper profiles
    └── Migrations/       # Entity Framework migrations
```

## API Endpoints

### Authentication
- POST /api/auth/register - Đăng ký tài khoản
- POST /api/auth/login - Đăng nhập
- GET /api/auth/me - Lấy thông tin người dùng hiện tại

### Users
- GET /api/users - Lấy danh sách người dùng
- GET /api/users/{id} - Lấy thông tin người dùng
- PUT /api/users/{id} - Cập nhật thông tin người dùng
- DELETE /api/users/{id} - Xóa người dùng

### Plans & Subscriptions
- GET /api/plans - Lấy danh sách gói tập
- POST /api/plans - Tạo gói tập mới
- PUT /api/plans/{id} - Cập nhật gói tập
- DELETE /api/plans/{id} - Xóa gói tập
- GET /api/subscriptions - Lấy danh sách đăng ký
- POST /api/subscriptions - Tạo đăng ký mới
- PUT /api/subscriptions/{id} - Cập nhật đăng ký

### Training Sessions
- GET /api/training-sessions - Lấy danh sách buổi tập
- POST /api/training-sessions - Tạo buổi tập mới
- PUT /api/training-sessions/{id} - Cập nhật buổi tập
- DELETE /api/training-sessions/{id} - Xóa buổi tập

### Trainers
- GET /api/trainers - Lấy danh sách huấn luyện viên
- POST /api/trainers - Thêm huấn luyện viên mới
- PUT /api/trainers/{id} - Cập nhật thông tin huấn luyện viên
- DELETE /api/trainers/{id} - Xóa huấn luyện viên

### Equipment & Gym Rooms
- GET /api/equipment - Lấy danh sách thiết bị
- POST /api/equipment - Thêm thiết bị mới
- PUT /api/equipment/{id} - Cập nhật thiết bị
- DELETE /api/equipment/{id} - Xóa thiết bị
- GET /api/gym-rooms - Lấy danh sách phòng tập
- POST /api/gym-rooms - Thêm phòng tập mới
- PUT /api/gym-rooms/{id} - Cập nhật phòng tập
- DELETE /api/gym-rooms/{id} - Xóa phòng tập

### Feedback & Contact
- GET /api/feedback - Lấy danh sách phản hồi
- POST /api/feedback - Gửi phản hồi mới
- PUT /api/feedback/{id} - Cập nhật phản hồi
- DELETE /api/feedback/{id} - Xóa phản hồi
- GET /api/contact - Lấy danh sách liên hệ
- POST /api/contact - Gửi liên hệ mới
- PUT /api/contact/{id} - Cập nhật trạng thái liên hệ

### Payments
- GET /api/payments - Lấy danh sách thanh toán
- POST /api/payments - Tạo thanh toán mới
- PUT /api/payments/{id} - Cập nhật trạng thái thanh toán

## Đóng góp

Mọi đóng góp đều được hoan nghênh! Vui lòng tạo issue hoặc pull request để đóng góp vào dự án.

## Giấy phép

Dự án này được cấp phép theo giấy phép MIT.

