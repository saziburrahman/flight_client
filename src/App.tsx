import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import HomePage from "./pages/users/home-page";
import LoginPage from "./pages/users/login-page";
import RegisterPage from "./pages/users/register-page";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Add other routes as needed */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}
