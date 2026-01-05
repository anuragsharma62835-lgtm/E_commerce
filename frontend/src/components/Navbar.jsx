import { Link, useNavigate } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const admin = localStorage.getItem("admin"); 

  const isAdmin = token && admin === "true";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link to="/home">Ecommerce</Link>
      </h1>

      <div className="space-x-4 flex items-center">
        {!token ? (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/signup" className="hover:underline">
              Signup
            </Link>
          </>
        ) : (
          <>
            <Link to="/profile" className="hover:underline">
              profile
            </Link>
            <Link to="/orders" className="hover:underline">
              my orders
            </Link>
            <Link to="/home" className="hover:underline">
              Home
            </Link>

            {isAdmin && (
              <button
                onClick={() => navigate("/admin/dashboard")}
                title="Admin Panel"
                className="text-white hover:text-yellow-400 transition"
              >
                <FaUserShield size={20} />
              </button>
            )}

            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
