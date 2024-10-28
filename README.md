# FileUploader App 📂

FileUploader is a web application that allows users to securely upload, manage, and share files organized in folders. This project serves as a practice for backend development using **Node.js**, **Express**, **Prisma ORM**, and **Supabase** for storage.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [License](#license)

## About

The **FileUploader** app is a multi-page web application designed to provide users with secure file storage and management capabilities. With user authentication, users can create folders, upload files, and organize their data efficiently. This app does not use single-page architecture (SPA), opting for server-side rendering instead for page navigation and data display.

## Features

- **User Authentication**: Users can register and log in.
- **File Management**: Upload, view, and delete files.
- **Folder Management**: Organize files within custom folders.
- **Download Links**: Generate public URLs for file downloads.
- **Error Handling**: Centralized error handling and custom error pages.

## Tech Stack

- **Node.js & Express**: Backend server and routing
- **Prisma ORM**: Database management and querying
- **PostgreSQL**: Database for storing user data, file info, and folder structure
- **Supabase**: File storage and public URL generation for file downloads
- **Pug**: Template engine for server-side rendering (multi-page application)
- **Passport.js**: User authentication and session management
- **Multer**: Middleware for handling file uploads
- **Bootstrap**: Basic styling for a clean, responsive UI

## Installation

### Prerequisites

- **Node.js** and **npm** installed.
- A **PostgreSQL** database.
- Supabase account and bucket for file storage.

### Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/FileUploader.git
   cd FileUploader
   ```
2. **Install dependencies**:
    ```bash
      npm install
    ```
3. Configure Environment Variables: Create a .env file in the root directory and add the following:

  ```env
    PORT=3000
    DATABASE_URL="postgresql://username:password@hostname:5432/database"
    SESSION_SECRET="your_session_secret"
    SUPABASE_URL="https://your-supabase-instance.supabase.co"
    SUPABASE_KEY="your-supabase-key"
  ```
4. Set Up Prisma: Initialize Prisma and generate client:

  ```bash
   npx prisma generate
   npx prisma migrate dev
  ```

5. Set Up Prisma: Initialize Prisma and generate client:

  ```bash
   npm start
  ```
  The application should now be running on http://localhost:3000.

## Usage

- **Register**: Create a new user account.
- **Login**: Access your personal dashboard.
- **Upload Files**: Use the upload form to add files to specific folders.
- **Manage Folders**: Create, view, and delete folders to organize files.
- **Download Files**: Generate public URLs for sharing and downloading files.

## API Endpoints

### Authentication Routes

- **POST /register**: Register a new user.
- **POST /login**: Login with an existing account.
- **GET /logout**: Log out from the current session.

### File Routes

- **GET /files**: List all uploaded files.
- **POST /files**: Upload a new file.
- **DELETE /files/:id**: Delete a specific file.
- **GET /files/:id/download**: Generate a download link.

### Folder Routes

- **GET /folders**: List all folders for the current user.
- **POST /folders**: Create a new folder.
- **GET /folders/:id**: View folder contents.
- **PUT /folders/:id**: Update folder details.
- **DELETE /folders/:id**: Delete a folder and its contents.

---

## Folder Structure

```plaintext
FileUploader
│
├── prisma                   # Prisma schema and migrations
│   ├── schema.prisma
│   └── migrations
│
├── public                   # Public assets (CSS, images, etc.)
│
├── views                    # Pug templates for server-side rendering
│   ├── layout.pug
│   ├── main.pug
│   └── error.pug
│
├── routes                   # Express routes
│   ├── auth.js
│   ├── files.js
│   └── folders.js
│
├── controllers              # Route handlers
│   ├── authController.js
│   ├── fileController.js
│   └── folderController.js
│
├── middleware               # Custom middleware
│   ├── errorHandler.js
│   └── isAuthenticated.js
│
├── config                   # Configuration (Passport, database)
│
├── .env                     # Environment variables
├── app.js                   # Main Express app setup
└── package.json
```

## License

Distributed under the [MIT](https://opensource.org/license/mit) License. See LICENSE for more information.
