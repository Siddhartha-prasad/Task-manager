import { useState } from "react";
import API from "../api/api";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {

      const res = await API.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);

      window.location.href = "/dashboard";

    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white-500 to-indigo-600">

      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Task Manager
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Sign in to manage your tasks
        </p>

        <div className="space-y-4">

          <input
            type="email"
            placeholder="Email address"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-200"
          >
            Login
          </button>

        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 font-semibold hover:underline">
            Sign up
          </a>
        </p>

      </div>

    </div>
  );
}

export default Login;