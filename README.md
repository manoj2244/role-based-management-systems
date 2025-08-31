# User Management Dashboard


A **role-based user management dashboard** built with **React, TypeScript, Tailwind CSS, Zustand, and React Query**. Supports **role-based permissions**, **CRUD operations**, and dynamic modals for user management.

---

## Features

- **Responsive UI**
  - Tailwind CSS design
  - Role based UI Rendering

- **API Integration**
  - React Query for fetching and caching
  - Zustand for auth state


### Role-based UI Rendering
- **Admins** can only view users.
- **Super Admins** can view both users and admins.
- **Delete button** is visible only for super_admins.

### Dynamic Search & Filtering
- Search users by **name** or **email**.
- Filter users by **role** (`user`, `admin`, `super_admin`).

### Optimistic UI Updates
- Uses **React Query** for instant feedback after create, update, or delete operations.
- Ensures a smooth user experience without waiting for API responses.

### Reusable Modal Component
- Handles both **Add** and **Edit** operations.
- **Pre-fills values** when editing an existing user.
- Form validation and loading state handling built-in.

### Responsive & Styled UI
- Fully responsive layout using **Tailwind CSS**.
- Role and status badges dynamically styled.
- Clean and intuitive user interface.


---

## Demo Credentials

| Role          | Email                  | Password  |
| ------------- | --------------------  | --------- |
| Super Admin   | superadmin@example.com | password123 |
| Admin         | admin@example.com      | password123 |
| User          | user@example.com       | password123 |

---



## Getting Started


### Installation

```bash
# Clone the repo
git clone https://github.com/manoj2244/role-based-management-system.git
cd role-based-management-system
cd client

yarn install
# start app
yarn start

# Start Server

cd server

yarn install
# start server
yarn nodemon server.js
