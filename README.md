# Veda Technology — MERN Business & Technology Platform

A professional full-stack business and technology platform developed for Veda Technology as part of my web development internship.

The platform combines a modern public-facing website with a secure admin dashboard for managing services, programs, FAQs, and customer inquiries.

---

## 🚀 Live Project

### Frontend
https://veda-technology-mern-platform.vercel.app/

### Backend API
https://veda-technology-api.onrender.com/

---

## 📌 Project Overview
Veda Technology is a full-stack web platform designed to provide a professional digital presence for a technology-focused organization while also providing an administrative system for managing website content.

1. The application follows a modern MERN architecture:
```text
React + Vite
     ↓
Axios REST API
     ↓
Express.js
     ↓
MongoDB / Mongoose
```

2. The production architecture is:
                    ┌───────────────────┐
                    │     End Users     │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │      Vercel       │
                    │ React + Vite App  │
                    └─────────┬─────────┘
                              │ HTTPS
                              ▼
                    ┌───────────────────┐
                    │      Render       │
                    │  Express REST API │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │   MongoDB Atlas   │
                    │ Production Data   │
                    └───────────────────┘


## ✨ Features
### Public Website
1. Professional responsive landing page
2. Services section
3. Programs section
4. FAQ section
5. Contact/inquiry form
6. Service detail pages
7. Program detail pages
8. Responsive navigation
9. Mobile-friendly interface
10. API-driven dynamic content
11. SEO-ready structure

### 🔐 Admin Dashboard
- The application includes a protected administration system.

1. Authentication
- Admin login
- JWT-based authentication
- Protected API routes
- Token-based authorization
- Automatic session cleanup on unauthorized responses

2. Dashboard
The admin dashboard provides an overview of:
- Services
- Programs
- FAQs
- Customer inquiries

### 🛠 Service Management
- Administrators can:
1. View services
2. Create services
3. Edit services
4. Delete services
5. Enable/disable services
6. Mark services as featured
7. Manage technology lists
8. Manage service slugs


### 🎓 Program Management
- Administrators can:
1. View programs
2. Create programs
3. Edit programs
4. Delete programs
5. Enable/disable programs
6. Manage program duration
7. Manage technologies
8. Manage categories

### ❓ FAQ Management
- Administrators can:
1. Create FAQs
2. Edit FAQs
3. Delete FAQs
4. Activate/deactivate FAQs
5. Control FAQ display order

### 📩 Inquiry Management
1. Visitors can submit inquiries through the public website.

2. Administrators can:
- View inquiries
- Review inquiry details
- Update inquiry status
- Track inquiry progress

3. Inquiry statuses include:
- NEW
- IN_PROGRESS
- RESOLVED
- ARCHIVED

### 🧱 Technology Stack
1. Frontend
- React
- Vite
- React Router
- Axios
- React Hot Toast
- React Helmet Async
- CSS

2. Backend
- Node.js
- Express.js
- Mongoose
- MongoDB
- JSON Web Token
- Express Validator
- Helmet
- CORS
- Express Rate Limit

3. Database
- MongoDB Atlas
- Mongoose ODM

4. Authentication
- JWT
- Protected admin routes
- Password hashing

5. Deployment
- Vercel — frontend
- Render — backend
- MongoDB Atlas — database


## 📂 Project Structure
veda-technology-mern-platform/
│
├── client/
│   ├── src/
│   │   ├── admin/
│   │   │   ├── components/
│   │   │   ├── context/
│   │   │   ├── layouts/
│   │   │   └── pages/
│   │   │
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   │   └── api.js
│   │   └── App.jsx
│   │
│   ├── public/
│   ├── .env.example
│   ├── vercel.json
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── faqController.js
│   │   ├── inquiryController.js
│   │   ├── programController.js
│   │   └── serviceController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── validateMiddleware.js
│   │
│   ├── models/
│   │   ├── FAQ.js
│   │   ├── Inquiry.js
│   │   ├── Program.js
│   │   ├── Service.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── faqRoutes.js
│   │   ├── inquiryRoutes.js
│   │   ├── programRoutes.js
│   │   └── serviceRoutes.js
│   │
│   ├── seed/
│   │   ├── createAdmin.js
│   │   └── seed.js
│   │
│   ├── utils/
│   │   └── generateToken.js
│   │
│   ├── app.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md


## 🔌 API Architecture
- The backend follows a RESTful API structure.

### Health
1. GET /
- Returns the API status.

2. GET /api/health
- Returns the health status of the backend.

### Authentication
- POST /api/auth/login

- Authenticates an administrator and returns an authentication token.

### Services
1. Public
- GET /api/services
- GET /api/services/:slug

2. Admin
- GET /api/services/admin/all
- POST /api/services
- PUT /api/services/:id
- DELETE /api/services/:id

### Programs
1. Public
- GET /api/programs
- GET /api/programs/:slug

2. Admin
- GET /api/programs/admin/all
- POST /api/programs
- PUT /api/programs/:id
- DELETE /api/programs/:id

### FAQs
1. Public
- GET /api/faqs

2. Admin
- GET /api/faqs/admin/all
- POST /api/faqs
- PUT /api/faqs/:id
- DELETE /api/faqs/:id

### Inquiries
- POST /api/inquiries

- Public inquiry submission endpoint.

- Protected administrative endpoints allow administrators to retrieve and update inquiries.


## 🗄 Database Models
### Service
1. title
2. slug
3. description
4. category
5. technologies[]
6. featured
7. active
8. createdAt
9. updatedAt

### Program
1. title
2. slug
3. description
4. category
5. technologies[]
6. duration
7. active
8. createdAt
9. updatedAt

### FAQ
1. question
2. answer
3. order
4. active
5. createdAt
6. updatedAt

### Inquiry
1. name
2. email
3. subject
4. message
5. status
6. createdAt
7. updatedAt

### User
1. name
2. email
3. password
4. role
5. createdAt
6. updatedAt

- The password field is protected from normal query results using Mongoose's field selection configuration.


## 🔐 Security
- Several security measures have been implemented.

### Helmet
- HTTP security headers are configured using Helmet.

### CORS
- The API uses controlled allowed origins.

### Rate Limiting
- API requests are rate-limited using express-rate-limit.

### JWT Authentication
- Administrative endpoints are protected using JSON Web Tokens.

### Request Validation
- API input validation is implemented using Express Validator.

### Environment Variables
- Sensitive values such as:
1. MongoDB connection strings
2. JWT secrets
3. administrator credentials

- are stored in environment variables rather than source code.

### Error Handling
- Centralized Express error handling is implemented to provide consistent API responses.


## ⚙️ Environment Variables
### Server

1. Create:
- server/.env

2. Example:
- PORT=5000
- NODE_ENV=development
- MONGODB_URI=your_mongodb_connection_string
- JWT_SECRET=your_secure_jwt_secret
- JWT_EXPIRES_IN=7d
- CLIENT_URL=http://localhost:5173
- ADMIN_NAME=Veda Technology Admin
- ADMIN_EMAIL=admin@example.com
- ADMIN_PASSWORD=your_secure_password

### Client
1. Create:
- client/.env

2. Example:
- VITE_API_URL=http://localhost:5000/api

3. For production:
- VITE_API_URL=https://your-render-domain.onrender.com/api


## 🚀 Local Development
1. Clone the repository
- git clone https://github.com/Abhinav1574k/veda-technology-mern-platform.git
- cd veda-technology-mern-platform

2. Install backend dependencies
- cd server
- npm install

3. Configure backend environment variables
- Create:
server/.env
- and configure the required variables.

4. Start backend
- Development:
npm run dev

- Production-style local execution:
npm start

- Backend:
http://localhost:5000

5. Install frontend dependencies
- Open another terminal:

- cd client
- npm install

6. Configure frontend
- Create:
client/.env

- with:
VITE_API_URL=http://localhost:5000/api

7. Start frontend
- npm run dev
- Frontend:
http://localhost:5173


## 🌱 Database Seeding
- The backend includes seed scripts for development/setup.
- Run:
cd server
npm run seed

- To create an administrator:
npm run create-admin

- Only run seed operations when appropriate for the target database.

## 📦 Production Deployment
- The project is designed for deployment using:

1. Frontend → Vercel
2. Backend  → Render
3. Database → MongoDB Atlas

### Frontend
- Build:
cd client
npm run build

- Output:
client/dist

### Backend
- Start:
cd server
npm start


## 🔄 Application Flow
### Public Content
User
 ↓
React
 ↓
Axios
 ↓
Express API
 ↓
Mongoose
 ↓
MongoDB Atlas
 ↓
JSON response
 ↓
React UI

### Admin Authentication
Admin
 ↓
Login form
 ↓
POST /api/auth/login
 ↓
Express
 ↓
User verification
 ↓
JWT generated
 ↓
React stores token
 ↓
Protected requests
 ↓
Authorization: Bearer <token>

### Inquiry Flow
Visitor
 ↓
Contact Form
 ↓
POST /api/inquiries
 ↓
Express validation
 ↓
MongoDB
 ↓
Inquiry created
 ↓
Admin Dashboard
 ↓
Status management


## 🧪 Testing Checklist
### Frontend
 Home page
 Navigation
 Services
 Programs
 FAQs
 Contact form
 Responsive layout

### Backend
 API health endpoint
 MongoDB connection
 REST API
 Validation
 Error handling
 CORS
 Rate limiting

### Admin
 Admin login
 JWT authentication
 Dashboard
 Service CRUD
 Program CRUD
 FAQ CRUD
 Inquiry management

### Deployment
 GitHub repository
 MongoDB Atlas
 Render backend
 Vercel frontend
 Production API connection


## 🎯 Project Objectives
- The major objectives of the project were:
1. Build a professional full-stack business website.
2. Implement a scalable MERN architecture.
3. Create a secure administrative dashboard.
4. Implement RESTful API development.
5. Connect the application to MongoDB Atlas.
6. Implement JWT-based authentication.
7. Implement CRUD functionality.
8. Handle customer inquiries.
9. Apply backend security practices.
10. Deploy the application to production.


## 📚 Learning Outcomes
- Through this project, I gained practical experience in:

1. React application development
2. Vite-based frontend development
3. REST API design
4. Express.js backend development
5. MongoDB and Mongoose
6. JWT authentication
7. API validation
8. Middleware architecture
9. Error handling
10. CORS configuration
11. Rate limiting
12. Environment configuration
13. Git and GitHub
14. Vercel deployment
15. Render deployment
16. MongoDB Atlas
17. Full-stack application architecture


## 👨‍💻 Developer
Abhinav Upadhyay
- Full Stack Developer

- GitHub:
https://github.com/Abhinav1574k

- LinkedIn:
https://www.linkedin.com/in/abhinav-upadhyay-019b7029a

- LeetCode:
https://leetcode.com/u/Abhinav1574k/


## 📄 Internship Project
This project was developed as part of my Web Development Internship at:
- Veda Technology

- The project demonstrates practical implementation of modern full-stack web development concepts using the MERN stack.


## ⭐ Acknowledgement
I would like to thank Veda Technology for providing the opportunity to work on a practical full-stack web development project and gain hands-on experience with modern web technologies and production deployment workflows.