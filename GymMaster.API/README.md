# GymMaster API

A RESTful API for managing a gym membership system built with ASP.NET Core and SQL Server.

## Features

- User authentication and authorization
- Membership plan management
- Subscription handling
- Contact form
- Feedback system
- Role-based access control

## Prerequisites

- .NET 7.0 SDK or later
- SQL Server (LocalDB or full version)
- Visual Studio 2022 or Visual Studio Code

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/GymMaster.git
   cd GymMaster/GymMaster.API
   ```

2. Install required NuGet packages:
   ```bash
   dotnet restore
   ```

3. Update the connection string in `appsettings.json` to match your SQL Server instance.

4. Update the JWT secret key in `appsettings.json` with a secure key.

5. Run the database migrations:
   ```bash
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```

6. Run the application:
   ```bash
   dotnet run
   ```

The API will be available at `https://localhost:7001` and `http://localhost:5001`.

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login and get JWT token
- GET `/api/auth/profile` - Get user profile (requires authentication)
- PUT `/api/auth/profile` - Update user profile (requires authentication)

### Plans
- GET `/api/plan` - Get all plans
- GET `/api/plan/{id}` - Get plan by ID
- POST `/api/plan` - Create new plan (requires admin role)
- PUT `/api/plan/{id}` - Update plan (requires admin role)
- DELETE `/api/plan/{id}` - Delete plan (requires admin role)
- PATCH `/api/plan/{id}/toggle` - Toggle plan status (requires admin role)

### Subscriptions
- GET `/api/subscription` - Get all subscriptions (requires admin role)
- GET `/api/subscription/{id}` - Get subscription by ID
- GET `/api/subscription/my-subscriptions` - Get user's subscriptions
- POST `/api/subscription` - Create new subscription
- PUT `/api/subscription/{id}` - Update subscription (requires admin role)
- POST `/api/subscription/{id}/cancel` - Cancel subscription
- POST `/api/subscription/{id}/renew` - Renew subscription

### Contact
- GET `/api/contact` - Get all contact messages (requires admin role)
- GET `/api/contact/{id}` - Get contact message by ID (requires admin role)
- POST `/api/contact` - Create new contact message
- PATCH `/api/contact/{id}/mark-as-read` - Mark contact as read (requires admin role)
- DELETE `/api/contact/{id}` - Delete contact message (requires admin role)

### Feedback
- GET `/api/feedback` - Get all feedback
- GET `/api/feedback/{id}` - Get feedback by ID
- GET `/api/feedback/my-feedbacks` - Get user's feedback
- POST `/api/feedback` - Create new feedback (requires authentication)
- PUT `/api/feedback/{id}` - Update feedback
- DELETE `/api/feedback/{id}` - Delete feedback

## Security

- JWT-based authentication
- Password hashing using BCrypt
- Role-based authorization
- HTTPS enabled by default

## Development

To run the application in development mode:

```bash
dotnet run --environment Development
```

This will enable Swagger UI at `/swagger` for API documentation and testing.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 