import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLoginMutation } from "../../features/auth/authSlide";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router"; // 
import { FaRegEyeSlash } from "react-icons/fa";
import { PiEye } from "react-icons/pi";
import { useState } from "react";

export default function App() {
  const [login, { isLoading }] = useLoginMutation();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();

  const schema = z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().nonempty("Email is required").email("Invalid email format"),
    password: z.string().nonempty("Password is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const result = await login(data).unwrap();
      if (result) {
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Login failed");
      console.error("Login error:", error);
    } finally {
      reset();
    }
  };

  return (
    <section className="min-h-screen flex flex-col md:flex-row">
      {/* ✅ Left Image Section */}
      <div className="md:w-1/2 hidden md:flex items-center justify-center bg-teal-100 p-10">
        <img
          src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg?w=826"
          alt="Login illustration"
          className="max-w-md w-full"
        />
      </div>

      {/* ✅ Right Form Section */}
      <div className="md:w-1/2 w-full flex items-center justify-center bg-white p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md bg-white shadow-xl rounded-xl p-8"
        >
          <h1 className="text-3xl font-bold text-center text-teal-600 mb-8">Login to QuickShop</h1>

          {/* Name */}
          <div className="mb-4">
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
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
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
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-700">
              Password
            </label>
            <input
              id="password"
              {...register("password")}
              type={isShowPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
            <div
              onClick={() => setIsShowPassword(!isShowPassword)}
              className="absolute top-[38px] right-4 cursor-pointer text-gray-600"
            >
              {isShowPassword ? <PiEye size={20} /> : <FaRegEyeSlash size={20} />}
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md font-semibold transition"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <ToastContainer />
        </form>
      </div>
    </section>
  );
}
