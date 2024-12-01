import { useState } from "react";
import {
  FaBars,
  FaCalendarCheck,
  FaHome,
  FaPlane,
  FaUsers,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menus = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaHome /> },
    { name: "Flights", path: "/admin/flights", icon: <FaPlane /> },
    { name: "Booking", path: "/admin/bookings", icon: <FaCalendarCheck /> },
    { name: "Users", path: "/users", icon: <FaUsers /> },
    // { name: 'Settings', path: '/settings', icon: <FaCogs /> },
  ];

  return (
    <div>
      {/* Sidebar (with responsive classes) */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:translate-x-0 lg:w-64 w-full md:w-64 md:block`}
      >
        {/* Sidebar Header */}
        <div className="p-4 text-2xl font-bold border-b border-gray-700 flex items-center space-x-2">
          <span className="hidden lg:block">Admin Panel</span>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2 p-4">
            {menus.map((menu, index) => (
              <li key={index}>
                <NavLink
                  to={menu.path}
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-md text-sm font-medium ${
                      isActive
                        ? "bg-gray-700 text-blue-400"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`
                  }
                >
                  <span className="mr-3 text-lg">{menu.icon}</span>
                  <span>{menu.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Overlay for small screens */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Toggle Button: Visible only on small screens */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-md lg:hidden"
      >
        <FaBars />
      </button>
    </div>
  );
};

export default AdminSidebar;
