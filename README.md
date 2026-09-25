# ⚛️ React Applications Suite

A curated collection of 7 modern, production-grade React web applications built with **React**, **Vite**, and **Modern CSS**. Each project demonstrates core frontend engineering fundamentals ranging from component composition and state management to asynchronous data workflows, complex shopping carts, multi-page client-side routing, and JWT authentication guards.

---

## 🚀 Projects Overview

| # | Project | Focus & Core Concepts | Key Highlights |
|:---:|:---|:---|:---|
| **01** | [**DevPortfolio Pro**](./assignment1-portfolio/) | Component Architecture, Responsive Design, CSS Flex/Grid | Sleek personal developer portfolio with dynamic project showcase, skill tags, and contact forms. |
| **02** | [**StudentInfo Portal**](./assignment2-students/) | Props Drilling, Data Mapping, Dynamic Sorting | High-performance student directory with CGPA filters, departmental categorizations, and modal views. |
| **03** | [**AgriWork Employee Directory**](./assignment3-employee/) | `useState`, Complex Form State, CRUD Operations | Interactive staff directory with instant live search, role-based filtering, and employee status toggles. |
| **04** | [**SkyCast Weather Dashboard**](./assignment4-weather/) | Asynchronous Data Fetching, `useEffect`, Error Boundaries | Real-time weather intelligence with metric/imperial toggle (°C/°F), humidity/wind metrics, and forecast cards. |
| **05** | [**ProKick FC Football Store**](./assignment5-cart/) | `useReducer`, Context API, Global Cart State | Full-featured football apparel store featuring authentic cleats, jerseys, animated slide-out cart, live discount coupons, and checkout calculations. |
| **06** | [**TaskFlow Pro (Task Manager)**](./assignment6-taskmanager/) | Client-Side Routing (`react-router-dom`), URL Params, Filtering | Productive task tracker with Academic/Personal categorization, priority matrix, lifecycle progression, and customizable target due dates. |
| **07** | [**AuthShield Enterprise Manager**](./assignment7-auth/) | Authentication Guards, JWT Simulation, Protected Routes | Enterprise-grade task system featuring simulated JWT tokens, session persistence, password strength analyzer, and secure route protection. |

---

## 🛠️ Tech Stack & Architecture

- **Core**: React 18+ / 19
- **Build Tooling**: Vite (lightning-fast HMR and optimized asset bundling)
- **State Management**: React Hooks (`useState`, `useEffect`, `useReducer`, `useMemo`, `useCallback`) & React Context API
- **Routing**: React Router (`createBrowserRouter` / `Routes`, dynamic `:id` params)
- **Styling**: Vanilla Modern CSS (CSS Variables, Glassmorphism, Responsive Grid/Flexbox, Dark Mode Palette)

---

## 💻 Getting Started

Each application is completely independent with its own isolated dependencies and build configuration.

### 1. Clone the repository
```bash
git clone https://github.com/biswajitdey22/react-assignment.git
cd react-assignment
```

### 2. Run any project
Navigate into any assignment directory, install its dependencies, and start the development server:

```bash
# Example: Run the ProKick FC Football Store (Assignment 5)
cd assignment5-cart
npm install
npm run dev

# Example: Run TaskFlow Pro (Assignment 6)
cd ../assignment6-taskmanager
npm install
npm run dev

# Example: Run AuthShield Task Manager (Assignment 7)
cd ../assignment7-auth
npm install
npm run dev
```

### 3. Build for Production
To create an optimized production build for any application:
```bash
npm run build
```

---

## 📂 Project Structure

```
react-assignment/
├── assignment1-portfolio/      # Personal Developer Portfolio
├── assignment2-students/       # Student Directory & Filtering
├── assignment3-employee/       # Employee Management Directory
├── assignment4-weather/        # Dynamic Weather & Forecast App
├── assignment5-cart/           # ProKick FC Football Gear E-Commerce
├── assignment6-taskmanager/    # Multi-page TaskFlow Pro System
├── assignment7-auth/           # AuthShield with JWT Protected Routes
├── .gitignore                  # Global exclusion for dependencies and build artifacts
└── README.md                   # Repository documentation
```