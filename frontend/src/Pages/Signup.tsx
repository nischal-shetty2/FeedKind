import React, { useState } from "react";
import { Eye, EyeOff, Building2, Heart } from "lucide-react";
import Map from "./Map";
import axiosFetch from "../lib/axiosFetch";

interface LocationState {
  lat: number;
  lng: number;
}

const SignUpPage = () => {
  const [userType, setUserType] = useState<"vendor" | "foodbank">("vendor");
  const [showPassword, setShowPassword] = useState(false);

  // Required fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState<LocationState>({
    lat: 12.862594773560176,
    lng: 74.8433286807267,
  });

  // Optional fields
  const [photoUrl, setPhotoUrl] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      password,
      address,
      phoneNumber,
      latitude: location.lat,
      longitude: location.lng,
      isADonor: userType === "vendor",
      photoUrl: photoUrl || undefined,
      description: description || undefined,
      registeredAt: new Date(),
    };

    try {
      const response = await axiosFetch.post("/auth/register", userData);
      const { error, message, jwt_token, user } = response.data;

      if (error) {
        throw new Error(message);
      }

      console.log("Registration successful", response.data);

      localStorage.setItem("token", jwt_token);
      localStorage.setItem("userId", user._id);
      localStorage.setItem("isDoner", user.isADonor);

      window.location.href = "/discount";
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-12 px-6 md:px-8">
      <div className="max-w-3xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Form Section */}
        <div className="flex-1 bg-white rounded-xl shadow-lg p-8 space-y-6">
          {/* Toggle Switch */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setUserType("vendor")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-full text-lg font-medium transition-all ${
                userType === "vendor"
                  ? "bg-green-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-900"
              }`}>
              <Building2 className="h-5 w-5" />
              <span>Vendor</span>
            </button>
            <button
              onClick={() => setUserType("foodbank")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-full text-lg font-medium transition-all ${
                userType === "foodbank"
                  ? "bg-green-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-900"
              }`}>
              <Heart className="h-5 w-5" />
              <span>Food Bank</span>
            </button>
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Create your account
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              {userType === "vendor"
                ? "Join as a food vendor to start donating"
                : "Register your food bank to receive donations"}
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Required Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
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
            </div>

            {/* Location Section */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                rows={2}
                required
              />
            </div>

            <div className="flex-1 bg-white rounded-xl shadow-lg overflow-hidden mt-6">
              <div className="p-6 bg-gray-50 border-b">
                <h3 className="text-lg font-medium text-gray-900">
                  Select Your Location
                </h3>
                <p className="text-sm text-gray-600">
                  Click on the map to set your location
                </p>
              </div>
              <div className="h-[400px]">
                <Map location={location} setLocation={setLocation} />
              </div>
            </div>

            {/* Optional Fields */}
            <div className="space-y-6 border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900">
                Additional Information
              </h3>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Profile Photo URL
                </label>
                <input
                  type="url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                  placeholder="Optional"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                  rows={3}
                  placeholder="Tell us about your organization (optional)"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 px-6 rounded-xl hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors text-lg font-medium">
              Create Account
            </button>
          </form>

          {/* Sign In Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="#"
              className="text-green-600 hover:text-green-700 font-medium">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
