import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { ToastContainer, toast } from "react-toastify";

function ProductDetails() {
  document.title='ProductDetails'
  const { id } = useParams(); 
  const nav = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/product/getbyid/${id}`); 
        setProduct(data.details);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);
  const handlebuynow = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("please login first");
      } else {
        const res = await API.post(
          "/order/create",
          {
            products: [{ product: product._id, quantity: 1 }],
            paymentMethod: "COD",
          },
          {
            headers: {
              authorization: token,
            },
          }
        );
        toast.success(`order placed successfully:${product.name},
          pay ₹${product.price} at the time of delivery`);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (loading) return <p className="p-6">Loading product...</p>;
  if (!product) return <p className="p-6">Product not found</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button onClick={() => nav(-1)} className="mb-4 text-blue-600 underline">
        &larr; Back
      </button>

      <div className="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto">
        <img
          src={product.image || "https://via.placeholder.com/400"}
          alt={product.name}
          className="w-full h-80 object-cover rounded-lg"
        />
        <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <p className="text-xl font-semibold mt-3">₹{product.price}</p>

        <button
          onClick={handlebuynow}
          className="mt-4 bg-indigo-500 text-white px-6 py-2 rounded-full"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
