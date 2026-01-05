import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const fetchOrders = async () => {
    try {
      const { data } = await API.get("/admin/orders", {
        headers: {
          Authorization: token,
        },
      });
      setOrders(data.details);
      setLoading(false);
    } catch (err) {
      toast.error("Error fetching orders:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <div>Loading orders...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>
      {orders.length === 0 && <p>No orders found.</p>}
      {orders.map((order) => (
        <div
          key={order._id}
          className="p-4 border mb-4 rounded shadow flex justify-between items-center"
        >
          <div>
            <p>
              <b>order created on: </b>
              {new Date(order.createdAt).toLocaleString()}
            </p>
            <p>
              <b>payment method: </b>
              {order.paymentMethod}
            </p>
            <p>
              <b>order quantity: </b>
              {order.products[0].quantity}
            </p>
            <p>
              <b>order status: </b>
              {order.status}
            </p>
            <p>
              <b>totalAmount: ₹</b> {order.totalAmount}
            </p>
            <p>
              <b>user id: </b>
              {order.user}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
