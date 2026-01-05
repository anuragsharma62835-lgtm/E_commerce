import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("invaild user");
          return;
        }
        const res = await API.get("/user/profile", {
          headers: { Authorization: token },
        });
        setUser(res.data.user);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>No user data found</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <p>
        <b>Welcome</b> {user.name}
      </p>
      <p>
        <b>Email:</b> {user.email}
      </p>
      <p>
        <b>Joined On:</b> {new Date(user.createdAt).toLocaleDateString()}
      </p>
      <Link to="/orders" className="hover:underline color-blue-500">
              my orders
            </Link>
    </div>
  );
};

export default Profile;
