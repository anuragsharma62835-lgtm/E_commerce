import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Home() {
  document.title = "home";
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);
  const [input, setinput] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get(`/product/get?page=${page}&limit=10`);
        setProducts((prev) =>
          page === 1 ? data.details : [...prev, ...data.details]
        );
        if (data.details.length < 10) {
          setHasMore(false);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page]);
  const handlebuynow = async (product) => {
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
      toast.error(error.message);
    }
  };

  const displayedProducts = [...products]
    .filter((product) =>
      product.name.toLowerCase().includes(input.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "price_asc") return a.price - b.price;
      if (sort === "price_desc") return b.price - a.price;
      return 0;
    });

  if (loading && page === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="items-center text-3xl font-bold mb-6 text-gray-800">
       Products
      </h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        <select
          className="border p-2 rounded mb-4"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="" disabled>
            Sort by Price
          </option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>

        <input
          type="text"
          placeholder="search here"
          value={input}
          onChange={(e) => setinput(e.target.value)}
          className="border p-2 rounded mb-4 w-full sm:w-1/2"
        />
      </div>

      {displayedProducts.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {displayedProducts.map((product) => (
            <Link key={product._id} to={`/products/${product._id}`}>
              <div key={product._id} className="bg-white rounded-xl shadow p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg"
                />

                <h2 className="text-lg font-semibold mt-3">{product.name}</h2>

                <p className="text-gray-500 text-sm mt-1">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-xl font-bold">₹{product.price}</span>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handlebuynow(product);
                    }}
                    className="bg-indigo-500 text-white px-4 py-2 rounded-full"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            disabled={loading}
            onClick={() => setPage((prev) => prev + 1)}
            className="bg-black text-white px-6 py-2 rounded disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
