# AI-Powered Email Campaign Management Platform (Backend)

A RESTful backend built with **Node.js**, **Express**, **TypeScript**, and **MongoDB** for managing email campaigns, generating AI-powered email content using **Google Gemini**, and creating simple marketing journeys.

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- Zod Validation
- Google Gemini API

---

## Features

### Authentication

- User Registration
- User Login
- JWT-based Authentication
- Protected Routes

### Campaign Management

- Create Campaign
- Get All Campaigns
- Get Campaign by ID
- Update Campaign
- Delete Campaign

Each campaign stores:

- Campaign Name
- Objective
- Subject Line
- Preview Text
- Email Content
- CTA Text
- CTA URL
- Audience
- Status

---

### AI Email Generator

Generate professional marketing emails using **Google Gemini**.

Input:

- Campaign Objective
- Target Audience
- CTA

AI generates:

- Subject Line
- Preview Text
- Email Content
- CTA Suggestion

---

### Journey Builder

Basic journey management supporting:

Triggers:

- User Registered
- Subscription Purchased
- Webinar Registered
- Video Completed

Actions:

- Send Email
- Wait

Supports full CRUD operations.

---

## Project Structure

```text
Directory structure:
└── src/
    ├── app.ts
    ├── config/
    │   └── db.ts
    ├── constant/
    │   ├── campaign.ts
    │   ├── httpStatus.ts
    │   └── journey.ts
    ├── controllers/
    │   ├── ai.controller.ts
    │   ├── auth.controller.ts
    │   ├── campaign.controller.ts
    │   └── journey.controller.ts
    ├── middleware/
    │   ├── auth.middleware.ts
    │   └── error.middleware.ts
    ├── models/
    │   ├── campaign.model.ts
    │   ├── journey.model.ts
    │   └── user.model.ts
    ├── routes/
    │   ├── ai.route.ts
    │   ├── auth.route.ts
    │   ├── campaign.route.ts
    │   ├── index.route.ts
    │   └── journey.route.ts
    ├── server.ts
    ├── services/
    │   └── ai.service.ts
    ├── types/
    │   └── express.d.ts
    ├── utils/
    │   ├── ApiError.ts
    │   ├── asyncHandler.ts
    │   └── generateToken.ts
    └── validators/
        ├── ai.validator.ts
        ├── auth.validator.ts
        ├── campaign.validator.ts
        └── journey.validator.ts
```

---

## Environment Variables

Create a `.env` file inside the server directory.

```env
PORT=3000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key
```

---

## Installation

Clone the repository

```bash
git clone <repository-url>
```

Navigate to the backend folder

```bash
cd server
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Build the project

```bash
npm run build
```

Run the production build

```bash
npm start
```

---

## API Endpoints

### Authentication

| Method | Endpoint             |
| ------ | -------------------- |
| POST   | `/api/auth/register` |
| POST   | `/api/auth/login`    |

---

### Campaign

| Method | Endpoint            |
| ------ | ------------------- |
| POST   | `/api/campaign`     |
| GET    | `/api/campaign`     |
| GET    | `/api/campaign/:id` |
| PUT    | `/api/campaign/:id` |
| DELETE | `/api/campaign/:id` |

---

### AI

| Method | Endpoint                 |
| ------ | ------------------------ |
| POST   | `/api/ai/generate-email` |

---

### Journey

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | `/api/journey`     |
| GET    | `/api/journey`     |
| GET    | `/api/journey/:id` |
| PUT    | `/api/journey/:id` |
| DELETE | `/api/journey/:id` |

---

## Error Handling

The project includes:

- Global error handling middleware
- Custom `ApiError` class
- `asyncHandler` utility
- Zod request validation
- Consistent JSON error responses

---

## Authentication

Protected endpoints require a JWT token.

Example:

```http
Authorization: Bearer <your_token>
```

---

## Future Improvements

- Refresh Token Authentication
- Pagination and Filtering
- Email Sending Integration
- Campaign Analytics
- Scheduled Campaigns
- Unit & Integration Tests
- Docker Support
- CI/CD Pipeline

---

## Author

**Nilesh Sadhu**
