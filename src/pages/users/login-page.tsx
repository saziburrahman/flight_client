import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function LoginPage() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const { login, auth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {
      email,
      password,
    };
    await login(body);
    // console.log(email, password);
  };

  useEffect(() => {
    // console.log(auth);

    if (auth) {
      if (auth?.role === "Admin") {
        navigate("/admin");
      }
      if (auth?.role === "User") {
        navigate("/");
      }
    }
  }, [auth, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="py-8 px-10">
            <div className="text-center">
              <Link to="/">
                <img
                  src="/logo.png"
                  alt="logo"
                  className="w-16 h-16 mx-auto mb-4"
                />
              </Link>
              <h1 className="text-2xl font-bold text-red-600">Welcome Back</h1>
              <p className="text-sm text-gray-500 mt-2">
                Log in to your account to continue.
              </p>
            </div>
            <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  autoComplete="off"
                  id="email"
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer placeholder-transparent h-12 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-red-500"
                  placeholder="Email address"
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
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer placeholder-transparent h-12 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-red-500"
                  placeholder="Password"
                />
                <label
                  htmlFor="password"
                  className="absolute left-0 -top-3 text-gray-500 text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all peer-focus:-top-3 peer-focus:text-red-600 peer-focus:text-sm"
                >
                  Password
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white text-lg font-semibold py-3 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
              >
                Login
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-red-600 font-medium hover:underline"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
