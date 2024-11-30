import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Add User-specific headers, footers, etc. */}
      <header className="bg-blue-600 p-4 text-white">
        <h1>User Portal</h1>
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
