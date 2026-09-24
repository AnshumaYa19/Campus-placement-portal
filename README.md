# AI Based Campus Placement Portal
A full-stack AI-powered Campus Placement Portal designed to simplify the campus recruitment process by connecting students and recruiters through a single platform.
The platform allows students to create profiles, upload resumes, browse job opportunities, apply for jobs, and receive AI-powered resume analysis. Recruiters can create and manage job postings and review applicants.

## Features:

- Student & Recruiter authentication.
- JWT + HTTP-only cookie authentication.
- Student profile & resume upload.
- Browse and apply for jobs.
- Recruiters can create and manage jobs.
- View and manage applicants.
- AI-powered resume analysis.
- Resume score, skills, missing skills, strengths & suggestions.

## Tech Stack:

- Frontend: React.js, Vite, Axios, CSS
- Backend: Node.js, Express.js, REST API
- Database: MongoDB Atlas, Mongoose
- Authentication: JWT, bcrypt, HTTP-only cookies
- Storage: Supabase Storage, Multer
- AI: Google Gemini API, pdf-parse
- Deployment: Vercel, Render

## AI Flow:

Resume → PDF Text Extraction → Gemini API → AI Analysis → React Dashboard

## Resume Flow

React → Express → Multer → Supabase Storage → MongoDB

## Security:

- JWT authentication
- HTTP-only cookies
- Password hashing with bcrypt
- Role-based authorization
- Protected API routes
- Secure environment variables
