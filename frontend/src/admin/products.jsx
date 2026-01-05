import { useEffect, useState } from "react";
import API from "../services/api";

const Products = () => {
  const [products, setProducts] = useState([]);

  const token = localStorage.getItem('token');
  const fetchProducts = async () => {
    const { data } = await API.get("/admin/products",{
      headers:{
        Authorization:token
      }
    });
    setProducts(data.details);
  };

  const deleteProduct = async (id) => {
    await API.delete(`/admin/deleteproduct/${id}`,{
      headers:{
        Authorization:token
      }
    });
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Products</h1>

      {products.map((p) => (
        <div key={p._id} className="bg-white p-4 mb-2 flex justify-between">
          <span>{p.name}</span>
          <button
            onClick={() => deleteProduct(p._id)}
            className="text-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;
