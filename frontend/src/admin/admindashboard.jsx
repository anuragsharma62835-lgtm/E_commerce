import { useEffect, useState } from "react";
import API from "../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('token');
      const { data } = await API.get("/admin/everything",{
        headers:{
          Authorization:token,
        }
      });
      setStats(data.details);
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 shadow rounded">total Users: {stats.users}</div>
        <div className="bg-white p-6 shadow rounded">total Products: {stats.products}</div>
        <div className="bg-white p-6 shadow rounded">total Orders: {stats.orders}</div>
      </div>
    </div>
  );
};

export default Dashboard;
