import { useState } from "react";
import { useNavigate } from "react-router";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!email) {
      setError("Email is required");
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:3001/api/users?email=${encodeURIComponent(email)}`
      );
      const users = await res.json();
      if (res.ok && users.length > 0) {
        setSuccess("Signed in successfully!");
        localStorage.setItem("user", JSON.stringify(users[0]));
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setError("No user found with this email");
      }
    } catch {
      setError("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 to-blue-200 flex flex-col items-center justify-center">
      <div className="bg-white shadow-md rounded-xl px-8 py-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Sign In
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Sign In
          </button>
        </form>
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        {success && (
          <p className="text-green-500 mt-2 text-center">{success}</p>
        )}
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
