import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

export default function Users() {
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem('token');
  const fetchUsers = async () => {
    try {
      const { data } = await API.get("/admin/users",{
        headers:{
            Authorization:token
        }
      });
      setUsers(data.details);
    } catch (err) {
      toast.error(err);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await API.delete(`/admin/deleteuser/${id}`,{
        headers:{
            Authorization:token
        }
      });
      fetchUsers();
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      {users.map((user) => (
        <div
          key={user._id}
          className="p-4 border mb-2 rounded flex justify-between"
        >
          <div>name:{user.name} email: ({user.email})</div>
          <p>joined on: {new Date(user.createdAt).toLocaleString()}</p>

          <button
            onClick={() => deleteUser(user._id)}
            className="text-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
