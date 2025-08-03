import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRegisterMutation } from "../../features/auth/authSlide";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";
import { FaRegEyeSlash } from "react-icons/fa";
import { PiEye } from "react-icons/pi";
import { useState } from "react";

export default function Register() {
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();

  const schema = z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().nonempty("Email is required").email("Invalid email format"),
    password: z.string().nonempty("Password is required")
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      await registerUser(data).unwrap();
      toast.success("Registered successfully!");
      navigate("/"); 
    } catch (error) {
      toast.error(error?.data?.message || "Registration failed");
      console.error("Register error:", error);
    } finally {
      reset();
    }
  };

  return (
    <section className="bg-teal-600 w-full h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center text-teal-600 mb-6">Register</h1>

        {/* ✅ Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold mb-1">
            Name
          </label>
          <input
            id="name"
            {...register("name")}
            type="text"
            placeholder="Enter your name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* ✅ Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold mb-1">
            Email
          </label>
          <input
            id="email"
            {...register("email")}
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* ✅ Password */}
        <div className="mb-6 relative">
          <label htmlFor="password" className="block text-sm font-semibold mb-1">
            Password
          </label>
          <input
            id="password"
            {...register("password")}
            type={isShowPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <div
            onClick={() => setIsShowPassword(!isShowPassword)}
            className="absolute top-[38px] right-4 cursor-pointer text-gray-600"
          >
            {isShowPassword ? <PiEye size={20} /> : <FaRegEyeSlash size={20} />}
          </div>
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* ✅ Submit */}
        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-semibold transition duration-200"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>

        <ToastContainer />
      </form>
    </section>
  );
}
