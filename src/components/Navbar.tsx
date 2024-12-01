import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-8 space-y-4 sm:space-y-0">
      <div className="flex text-2xl font-bold text-red-600 items-center space-x-2">
        <img src="/logo.png" alt="logo" className="w-10 h-10" />
        <div>
          <span className="inline-block">Booking Expert</span>
          <p className="text-gray-500 text-sm">all about your journey</p>
        </div>
      </div>
      {auth ? (
        <div className="flex items-center space-x-4">
          <span className="text-sm sm:text-base">{auth.username}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 text-sm sm:text-base rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="space-x-1">
          <Link
            to={"/login"}
            className="bg-red-500 text-white px-4 py-2 text-sm sm:text-base rounded-lg hover:bg-red-600"
          >
            Login
          </Link>
          <Link
            to={"/register"}
            className="px-4 py-2 text-sm sm:text-base rounded-lg hover:bg-blue-600 hover:text-white"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
}
