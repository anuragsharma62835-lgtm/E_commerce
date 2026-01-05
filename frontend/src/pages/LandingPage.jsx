import { Link } from "react-router-dom";

function LandingPage() {
  document.title = "home page ";

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to ShopEase 🛒
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Your one-stop destination for quality products at the best prices
          </p>

          <Link
            to="/products"
            className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:scale-105 transition inline-block"
          >
            Shop Now
          </Link>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3 text-center">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">🚚 Fast Delivery</h3>
            <p className="text-gray-600">
              Get your orders delivered quickly and safely.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">🔒 Secure Payments</h3>
            <p className="text-gray-600">
              100% secure payment options including COD.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">⭐ Quality Products</h3>
            <p className="text-gray-600">
              Carefully curated products with trusted quality.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-gray-600 leading-relaxed">
            ShopEase is a modern e-commerce platform built using the MERN stack.
            Our goal is to provide a smooth shopping experience with reliable
            service and affordable pricing.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-6">
            Have questions or need help? Reach out to us anytime.
          </p>

          <div className="space-y-2 text-gray-700">
            <p>📧 support@shopease.com</p>
            <p>📞 +91 98765 43210</p>
            <p>📍 India</p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default LandingPage;
