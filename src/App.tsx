import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import UserLayout from "./layouts/UserLayout";
// import ProtectedRoute from "./layouts/ProtectedRoute.jsx";

import AdminLayout from "./pages/AdminLayouts.js";
import ProtectedRoute from "./pages/ProtectedRoute.js";
import UserLayout from "./pages/UserLayout.js";
import DashboardPage from "./pages/admin/dashboard-page.js";
import FlightSearchPage from "./pages/users/flight-search-page";
import HomePage from "./pages/users/home-page";
import LoginPage from "./pages/users/login-page";
import RegisterPage from "./pages/users/register-page";
// import DashboardPage from "./pages/admin/dashboard-page";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="flight-search" element={<FlightSearchPage />} />
        </Route>
        {/* <Route element={<ProtectedRoute />}>
        </Route> */}

        {/* Admin Routes */}
        <Route element={<ProtectedRoute requiredRole="Admin" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            {/* Add more admin routes here */}
          </Route>
        </Route>

        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Fallback */}
        <Route path="/unauthorized" element={<h1>UnAuthorized</h1>} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}
