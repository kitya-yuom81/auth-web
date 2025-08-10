// src/pages/LoginAuth.jsx
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router"; 
import { FaRegEyeSlash, FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import { PiEye } from "react-icons/pi";

import {useLoginWithOAuth}  from "../../hook/useLoginWithOAuth";
import { useLoginMutation } from "../../features/auth/authSlide";

export default function LoginAuth() {
  // ✅ Hooks
  const { login: oauthLogin, logout, user, error: oauthError, isPending } = useLoginWithOAuth();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  // ✅ Local state
  const [isShowPassword, setIsShowPassword] = useState(false);

  // ✅ Zod schema
  const schema = z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().nonempty("Email is required").email("Invalid email format"),
    password: z.string().nonempty("Password is required"),
  });

  // ✅ React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", email: "", password: "" },
    resolver: zodResolver(schema),
  });

  // ✅ Email/Password login via your API
  const onSubmit = async (data) => {
    try {
      const result = await login(data).unwrap();
      if (result) {
        navigate("/");
      }
    } catch (err) {
      toast.error(err?.data?.message || "Login failed");
      console.error("Login error:", err);
    } finally {
      reset();
    }
  };

  // ✅ Detect provider for the logged-in user (Firebase)
  const getProvider = () => {
    const providerId = user?.providerData?.[0]?.providerId;
    if (providerId?.includes("google")) return "Google";
    if (providerId?.includes("github")) return "GitHub";
    if (providerId?.includes("facebook")) return "Facebook";
    return "Unknown";
  };

  return (
    <section className="min-h-screen flex flex-col md:flex-row">
      {/* Left Illustration */}
      <div className="md:w-1/2 hidden md:flex items-center justify-center bg-teal-100 p-10">
        <img
          src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg?w=826"
          alt="Login illustration"
          className="max-w-md w-full"
        />
      </div>

      {/* Right Content */}
      <div className="md:w-1/2 w-full flex items-center justify-center bg-white p-6">
        <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
          <h1 className="text-3xl font-bold text-center text-teal-600 mb-8">
            Login to QuickShop
          </h1>

          {/* If logged in via OAuth, show profile + logout */}
          {user ? (
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">
                Welcome, {user.displayName || user.email}!
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                You are logged in with{" "}
                <span className="font-medium">{getProvider()}</span>
              </p>

              <div className="flex justify-center mb-4">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-16 h-16 rounded-full border-2 border-gray-300"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}

                <div
                  className="w-16 h-16 rounded-full bg-blue-500 text-white font-bold text-xl flex items-center justify-center"
                  style={{ display: user.photoURL ? "none" : "flex" }}
                >
                  {user.displayName?.[0] || "U"}
                </div>
              </div>

              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition w-full"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              {/* Email/Password form (your API) */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-700">
                    Name
                  </label>
                  <input
                    id="name"
                    {...register("name")}
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700">
                    Email
                  </label>
                  <input
                    id="email"
                    {...register("email")}
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Password */}
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium mb-1 text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    {...register("password")}
                    type={isShowPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setIsShowPassword((s) => !s)}
                    className="absolute top-[38px] right-3 text-gray-600"
                    aria-label={isShowPassword ? "Hide password" : "Show password"}
                  >
                    {isShowPassword ? <PiEye size={20} /> : <FaRegEyeSlash size={20} />}
                  </button>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md font-semibold transition disabled:opacity-60"
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center my-6">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="px-3 text-gray-500 text-sm">or continue with</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* OAuth Buttons with logos */}
              <div className="space-y-3">
                <button
                  onClick={() => oauthLogin("google")}
                  disabled={isPending}
                  className="w-full border border-gray-300 hover:bg-gray-50 text-gray-800 py-2 rounded-md font-medium transition flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <FaGoogle size={18} />
                  {isPending ? "Loading..." : "Sign in with Google"}
                </button>

                <button
                  onClick={() => oauthLogin("github")}
                  disabled={isPending}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-md font-medium transition flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <FaGithub size={18} />
                  {isPending ? "Loading..." : "Sign in with GitHub"}
                </button>

                <button
                  onClick={() => oauthLogin("facebook")}
                  disabled={isPending}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <FaFacebook size={18} />
                  {isPending ? "Loading..." : "Sign in with Facebook"}
                </button>
              </div>

              {/* Errors */}
              {oauthError && (
                <p className="text-sm text-red-500 mt-4 text-center">Error: {oauthError}</p>
              )}
            </>
          )}

          <ToastContainer />
        </div>
      </div>
    </section>
  );
}
