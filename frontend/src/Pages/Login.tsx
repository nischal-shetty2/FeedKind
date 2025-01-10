import React, { useState } from "react";
import { Eye, EyeOff, Building2, Heart } from "lucide-react";
import axiosFetch from "../lib/axiosFetch";

const LoginPage = () => {
  const [userType, setUserType] = useState<"vendor" | "foodbank">("vendor");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosFetch.post("/auth/login", {
          email,
          password,
      });
      const { error, message, jwt_token, userId } = response.data;
      if (error) {
        throw new Error(message || "An error occurred");
      }
      localStorage.setItem("token", jwt_token);
      localStorage.setItem("userId", userId);
      window.location.href = "/discount";
    } catch (error) {
      console.error("Error logging in", error);
      // Optionally show a toast or an error message to the user
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl shadow-green-100/50 w-full max-w-md p-6 sm:p-8 md:p-10 border border-green-100">
        {/* Toggle Switch */}
        <div className="flex bg-gray-50/80 rounded-2xl p-1.5 mb-10 border border-gray-100">
          <button
            onClick={() => setUserType("vendor")}
            className={`flex-1 flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl transition-all duration-300 ${
              userType === "vendor"
                ? "bg-white text-green-600 shadow-sm ring-1 ring-green-100"
                : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
            }`}
          >
            <Building2 className="h-4 w-4" />
            <span className="font-medium">Vendor</span>
          </button>
          <button
            onClick={() => setUserType("foodbank")}
            className={`flex-1 flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl transition-all duration-300 ${
              userType === "foodbank"
                ? "bg-white text-green-600 shadow-sm ring-1 ring-green-100"
                : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
            }`}
          >
            <Heart className="h-4 w-4" />
            <span className="font-medium">Food Bank</span>
          </button>
        </div>

        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Welcome back
          </h1>
          <p className="text-gray-600 mt-3">
            {userType === "vendor"
              ? "Sign in to manage your food donations"
              : "Sign in to find available donations"}
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a
              href="#"
              className="text-sm text-green-600 hover:text-green-700 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 rounded"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
            Sign In
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-green-600 hover:text-green-700 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 rounded"
          >
            Sign up now
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;