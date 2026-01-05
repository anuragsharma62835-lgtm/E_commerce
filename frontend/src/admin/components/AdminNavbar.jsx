import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Admin logged out successfully");
    navigate("/login");
  };
  return (
    <nav className="bg-gray-900 text-white p-4 flex gap-6">
      <NavLink to="/admin/dashboard">Dashboard</NavLink>
      <NavLink to="/admin/users">Users</NavLink>
      <NavLink to="/admin/allorders">Orders</NavLink>
      <NavLink to="/admin/products"> Product</NavLink>
      <NavLink to="/admin/newproduct">New Product</NavLink>
      <button
        onClick={handleLogout}
        className="ml-auto bg-red-600 px-4 py-1 rounded hover:bg-red-700"
      >
        logout
      </button>
    </nav>
  );
};

export default AdminNavbar;
