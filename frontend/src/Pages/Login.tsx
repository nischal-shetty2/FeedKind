import React, { useState } from "react";
import { Eye, EyeOff, Building2, Heart } from "lucide-react";

const LoginPage = () => {
  const [userType, setUserType] = useState<"vendor" | "foodbank">("vendor");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Logging in as:", userType, { email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        {/* Toggle Switch */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
          <button
            onClick={() => setUserType("vendor")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-all ${
              userType === "vendor"
                ? "bg-white text-green-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}>
            <Building2 className="h-4 w-4" />
            <span>Vendor</span>
          </button>
          <button
            onClick={() => setUserType("foodbank")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-all ${
              userType === "foodbank"
                ? "bg-white text-green-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}>
            <Heart className="h-4 w-4" />
            <span>Food Bank</span>
          </button>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-600 mt-2">
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
              className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="ml-2 text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-green-600 hover:text-green-700">
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
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-green-600 hover:text-green-700 font-medium">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
