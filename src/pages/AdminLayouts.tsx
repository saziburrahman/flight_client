import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex bg-gray-200">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main
          className="flex-1 p-4 overflow-x-auto"
          style={{
            paddingTop: "64px",
            marginLeft: "256px",
            maxWidth: "calc(100vw - 256px)", // Fix width based on sidebar size
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
