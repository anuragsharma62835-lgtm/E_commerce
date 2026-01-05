import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Register";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Orders from "./pages/orders";
import Profile from "./pages/Profile";
import OAuthSuccess from "./pages/oauth-success";

import AdminDashboard from "./admin/admindashboard";
import AdminProducts from "./admin/products";
import Users from "./admin/users";
import AllOrders from "./admin/orders";
import NewProduct from "./admin/newproduct";

import ProtectedRoute from "./components/protectedRoute";
import AdminProtectedRoute from "./routes/adminprotectedroutes";

import AdminLayout from "./admin/components/adminlayout";

function App() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      <ToastContainer />
      {!isAdmin && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
               <AdminLayout>
              <AdminDashboard />
               </AdminLayout>
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminProducts />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <Users />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/allorders"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AllOrders />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/newproduct"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <NewProduct />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />
      </Routes>

      {!isAdmin && <Footer />}
    </>
  );
}

export default App;
