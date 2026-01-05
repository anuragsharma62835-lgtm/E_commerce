import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function Register() {
  document.title = "register";
  const nav = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const { data } = await API.post("/user/create", {
        name,
        email,
        password,
      });
      toast.success("Signup successful , Please login");
      nav('/login')
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white text-gray-500 max-w-96 w-full p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Create Account
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="text"
            placeholder="Enter your name"
            required
          />
          <input
            name="email"
            className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="email"
            placeholder="Enter your email"
            required
          />
          <input
            name="password"
            className="w-full bg-transparent border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="password"
            placeholder="Enter your password"
            required
          />

          <button
            type="submit"
            className="w-full mt-4 bg-indigo-500 py-2.5 rounded-full text-white"
          >
            Sign up
          </button>
        </form>
        <button
          type="button"
          onClick={() =>
            (window.location.href = "http://localhost:5000/api/auth/google")
          }
          className="w-full flex items-center gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5 rounded-full text-gray-800"
        >
          <img
            className="h-4 w-4"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png"
            alt="google"
          />
          Sign up with Google
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <a href="/" className="text-blue-500 underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
