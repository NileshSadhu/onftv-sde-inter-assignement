# AI-Powered Email Campaign Management Platform (Frontend)

A responsive frontend built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS** for managing email campaigns, generating AI-powered email content, and building simple marketing journeys.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React hot toast
- Zod

---

## Features

### Authentication

- User Registration
- User Login
- JWT-based Authentication
- Protected Routes

---

### Dashboard

- Campaign Overview
- Search Campaigns
- Quick Navigation
- Responsive Layout

---

### Campaign Management

- Create Campaign
- View Campaigns
- Edit Campaign
- Delete Campaign

Each campaign contains:

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

Generate marketing email content by providing:

- Campaign Objective
- Target Audience
- CTA

The generated content includes:

- Subject Line
- Preview Text
- Email Content
- CTA Suggestion

---

### Journey Builder

Create simple marketing journeys using:

**Triggers**

- User Registered
- Subscription Purchased
- Webinar Registered
- Video Completed

**Actions**

- Send Email
- Wait

Supports complete CRUD functionality.

---

## Project Structure

```text
Directory structure:
└── src/
    ├── api/
    │   ├── ai.api.ts
    │   ├── api.ts
    │   ├── apiClient.ts
    │   ├── apiConfig.ts
    │   ├── campaign.api.ts
    │   └── journey.api.ts
    ├── App.css
    ├── App.tsx
    ├── assets/
    │   ├── hero.png
    │   ├── react.svg
    │   └── vite.svg
    ├── components/
    │   ├── CampaignForm.tsx
    │   ├── Custombutton.tsx
    │   ├── CustomInput.tsx
    │   ├── JourneyForm.tsx
    │   └── ProtectedRoute.tsx
    ├── index.css
    ├── main.tsx
    ├── pages/
    │   ├── auth/
    │   │   ├── Login.tsx
    │   │   └── Register.tsx
    │   ├── campaign/
    │   │   ├── CreateCampaign.tsx
    │   │   └── EditCampaign.tsx
    │   ├── Dashboard.tsx
    │   ├── journey/
    │   │   ├── CreateJourney.tsx
    │   │   ├── EditJourney.tsx
    │   │   └── Journeys.tsx
    │   ├── Landing.tsx
    │   └── Notfound.tsx
    └── types/
        ├── campaign.ts
        └── journey.ts
```

---

## Environment Variables

Create a `.env` file in the project root.

```env
VITE_SERVER_URL=http://localhost:8000/api
```

Update the URL if your backend is running on a different port.

---

## Installation

Clone the repository

```bash
git clone <repository-url>
```

Navigate to the frontend directory

```bash
cd client
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

Preview the production build

```bash
npm run preview
```

---

## Application Flow

```text
Login / Register
        │
        ▼
   Dashboard
        │
        ├───────────────┐
        ▼               ▼
 Campaigns        Journey Builder
        │
        ▼
AI Email Generator
```

---

## API Communication

The frontend communicates with the Express backend using **Axios**.

Authentication is handled using JWT tokens stored in local storage. An Axios request interceptor automatically attaches the access token to authenticated API requests.

---

## Future Improvements

- Global state management (Redux Toolkit or Context API)
- Skeleton loading components
- Dark mode
- Pagination and server-side search
- Better form validation UX
- Unit and integration testing
- Drag-and-drop Journey Builder

---

## Author

**Nilesh Sadhu**
