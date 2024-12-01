import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AUTH_API } from "../../api";

export default function RegisterPage() {
  // State to store input values
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      await AUTH_API.registration(formData)
      toast.success(" Successfully registered ")
      navigate("/login")
    } catch (error) {
      console.log(error);
      
    }
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-50 to-gray-100 flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="py-8 px-10">
            <div className="text-center">
              <Link to="/">
                <img src="/logo.png" alt="logo" className="w-16 h-16 mx-auto mb-4" />
              </Link>
              <h1 className="text-2xl font-bold text-red-600">Create an Account</h1>
              <p className="text-sm text-gray-500 mt-2">
                Join us and start booking your flights today!
              </p>
            </div>
            <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  autoComplete="off"
                  id="username"
                  name="username"
                  type="text"
                  className="peer placeholder-transparent h-12 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-red-500"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                />
                <label
                  htmlFor="username"
                  className="absolute left-0 -top-3 text-gray-500 text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all peer-focus:-top-3 peer-focus:text-red-600 peer-focus:text-sm"
                >
                  Username
                </label>
              </div>
              <div className="relative">
                <input
                  autoComplete="off"
                  id="email"
                  name="email"
                  type="email"
                  className="peer placeholder-transparent h-12 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-red-500"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
                <label
                  htmlFor="email"
                  className="absolute left-0 -top-3 text-gray-500 text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all peer-focus:-top-3 peer-focus:text-red-600 peer-focus:text-sm"
                >
                  Email Address
                </label>
              </div>
              <div className="relative">
                <input
                  autoComplete="off"
                  id="password"
                  name="password"
                  type="password"
                  className="peer placeholder-transparent h-12 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-red-500"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <label
                  htmlFor="password"
                  className="absolute left-0 -top-3 text-gray-500 text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all peer-focus:-top-3 peer-focus:text-red-600 peer-focus:text-sm"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  autoComplete="off"
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className="peer placeholder-transparent h-12 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-red-500"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <label
                  htmlFor="confirmPassword"
                  className="absolute left-0 -top-3 text-gray-500 text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all peer-focus:-top-3 peer-focus:text-red-600 peer-focus:text-sm"
                >
                  Confirm Password
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white text-lg font-semibold py-3 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
              >
                Register
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-red-600 font-medium hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
