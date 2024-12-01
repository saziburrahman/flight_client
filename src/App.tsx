import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AdminLayout from "./pages/AdminLayouts.js";
import ProtectedRoute from "./pages/ProtectedRoute.js";
import UserLayout from "./pages/UserLayout.js";
import BookingPage from "./pages/admin/booking-page.js";
import DashboardPage from "./pages/admin/dashboard-page.js";
import FlightRegistrationPage from "./pages/admin/flight-registration.js";
import FlightPage from "./pages/admin/flights-page.js";
import FlightSearchPage from "./pages/users/flight-search-page";
import HomePage from "./pages/users/home-page";
import LoginPage from "./pages/users/login-page";
import RegisterPage from "./pages/users/register-page";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="flight-search" element={<FlightSearchPage />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute requiredRole="Admin" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="flights" element={<FlightPage />} />
            <Route path="flight-registration" element={<FlightRegistrationPage />} />
            <Route path="bookings" element={<BookingPage />} />
          </Route>
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/unauthorized" element={<h1>UnAuthorized</h1>} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}
