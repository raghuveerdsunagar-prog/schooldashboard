# Savra Teacher Insights Dashboard

A role-based **Admin Dashboard** for visualizing teacher activities such as lesson plans, quizzes, and question papers.  
Built with **React**, **Node.js/Express**, and **MySQL**, secured with **JWT authentication** and **bcrypt** password hashing.

---

## ✨ Features

- Admin-only access with secure login (JWT + bcrypt)
- Teacher summary cards (total lessons, quizzes, assessments, activities)
- Teacher selector to filter data per teacher
- Weekly trends line/bar chart for activities
- Activities distribution pie chart
- Protected API routes (only accessible with valid admin token)
- Logout and route guard for dashboard access

---

## 🛠 Tech Stack

**Frontend**
- React
- React Router
- Axios
- Chart library (e.g. Recharts / Chart.js – whichever you used)

**Backend**
- Node.js
- Express.js
- JWT (jsonwebtoken)
- bcrypt (for password hashing)
- MySQL (via a db connection module)

---

## 📂 Project Structure 

```bash
savradash/
├── backend/
│   ├── index.js          # Express server, routes, admin login, JWT middleware
│   ├── db.js             # MySQL connection
│   └── package.json
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── components/
    │   │   ├── Admin.jsx            # Admin login page
    │   │   ├── Dashboard.jsx        # Protected dashboard
    │   │   ├── Dashboardheader.jsx
    │   │   ├── Summary.jsx
    │   │   ├── TeacherSelector.jsx
    │   │   ├── Weeklycharts.jsx
    │   │   └── ActivitiesPie.jsx
    │   └── index.jsx
    └── package.json
