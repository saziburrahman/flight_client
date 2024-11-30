import { useState } from 'react';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const AdminHeader = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { auth, logout } = useAuth();

  // Toggle Sidebar function for small screens
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Toggle Dropdown menu for logout
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 text-white z-40 flex items-center justify-between px-4 py-2 shadow-md">
      {/* Hamburger menu for small screens */}
      <button
        className="lg:hidden p-2"
        onClick={toggleSidebar}
      >
        <FaBars size={24} />
      </button>

      {/* Admin Panel Title (visible only on larger screens) */}
      <div className="text-lg font-bold hidden lg:block">
        Admin Panel
      </div>

      {/* Profile Name and Icon */}
      <div className="flex items-center space-x-2">
        <span className="hidden lg:block">{auth?.username}</span>
        <div className="relative">
          <FaUserCircle
            size={30}
            onClick={toggleDropdown}
            className="cursor-pointer"
          />
          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-700 text-white rounded-md shadow-lg">
              <ul>
                <li>
                  <Link
                    to="/login" // Adjust this path based on your logout route
                    className="block px-4 py-2 text-sm hover:bg-gray-600"
                    onClick={logout} // Call the logout function when clicked
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
