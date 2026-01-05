import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/order/allorder", {
          headers: {
            Authorization: token,
          },
        });
        setOrders(res.data.orders || []);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;

  if (!orders || orders.length === 0) return <p>No orders placed yet.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      {orders.map((order) => (
        <div key={order._id} className="border rounded-lg p-4 mb-4 shadow">
          <p>
            <b>Order ID:</b> {order._id}
          </p>
          <p>
            <b>Total:</b> ₹{order.totalAmount}
          </p>
          <p>
            <b>Payment mode:</b> {order.paymentMethod}
          </p>
          <p>
            <b>Status:</b> {order.status}
          </p>

          <div className="mt-4">
            {order.products?.map((item) => (
              <div key={item._id} className="flex items-center gap-4 mb-3">
                <img
                  src={item.product?.image}
                  alt={item.product?.name || "Product"}
                  className="w-20 h-20 object-cover rounded"
                />

                <div>
                  <p>
                    <b>Name:</b> {item.product?.name || "Product removed"}
                  </p>
                  <p>
                    <b>Quantity:</b> {item.quantity}
                  </p>
                  <p>
                    <b>Price:</b> ₹{item.product?.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
