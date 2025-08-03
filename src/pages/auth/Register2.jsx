// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRegisterMutation } from "../../features/auth/authSlide";
// import { toast, ToastContainer } from "react-toastify";
// import { FaRegEyeSlash } from "react-icons/fa";
// import { PiEye } from "react-icons/pi";
// import { useNavigate } from "react-router";

// const schema = z.object({
//   name: z.string().nonempty("Name is required"),
//   email: z.string().email("Invalid email"),
//   password: z.string().min(6, "Minimum 6 characters"),
//   avatar: z.any().optional(),
// });

// export default function Register() {
//   const [isShowPassword, setIsShowPassword] = useState(false);
//   const [registerUser, { isLoading }] = useRegisterMutation();
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(schema),
//   });

//   const onSubmit = async (data) => {
//     try {
//       const formData = new FormData();
//       formData.append("name", data.name);
//       formData.append("email", data.email);
//       formData.append("password", data.password);
//       if (data.avatar?.[0]) formData.append("avatar", data.avatar[0]);

//       const result = await registerUser(formData).unwrap();
//       toast.success("Registered successfully!");
//       navigate("/login");
//     } catch (error) {
//       toast.error(error?.data?.message || "Registration failed");
//     } finally {
//       reset();
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-teal-600 px-4">
//       <div className="bg-white max-w-4xl w-full rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden">
//         {/* Left Illustration */}
//         <div className="md:w-1/2 hidden md:flex items-center justify-center bg-white p-8">
//           <img
//             src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg?w=826"
//             alt="Illustration"
//             className="w-full max-w-xs"
//           />
//         </div>

//         {/* Right Form Section */}
//         <div className="md:w-1/2 w-full p-8">
//           <h2 className="text-3xl font-bold text-center text-teal-600 mb-6">Register</h2>

//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="space-y-4"
//             encType="multipart/form-data"
//           >
//             {/* Avatar Upload - Circle + Preview */}
//             <div className="flex justify-center mb-4">
//               <div
//                 onDrop={(e) => {
//                   e.preventDefault();
//                   const file = e.dataTransfer.files[0];
//                   setValue("avatar", [file]);
//                 }}
//                 onDragOver={(e) => e.preventDefault()}
//                 className="w-28 h-28 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center relative overflow-hidden hover:border-teal-500 cursor-pointer"
//               >
//                 {/* Image Preview */}
//                 {watch("avatar")?.[0] && (
//                   <img
//                     src={URL.createObjectURL(watch("avatar")[0])}
//                     alt="Avatar Preview"
//                     className="absolute w-full h-full object-cover rounded-full z-0"
//                   />
//                 )}

//                 {/* Upload Text */}
//                 {!watch("avatar")?.[0] && (
//                   <label
//                     htmlFor="avatar"
//                     className="absolute inset-0 z-10 flex items-center justify-center text-center text-sm text-gray-500 px-2"
//                   >
//                     <span className="text-xs leading-4">
//                       Drag & drop or <span className="text-teal-600 underline">upload a file</span>
//                     </span>
//                   </label>
//                 )}

//                 {/* File Input */}
//                 <input
//                   type="file"
//                   id="avatar"
//                   accept="image/*"
//                   className="hidden"
//                   {...register("avatar")}
//                   onChange={(e) => {
//                     const file = e.target.files[0];
//                     if (file) {
//                       setValue("avatar", [file]);
//                     }
//                   }}
//                 />
//               </div>
//             </div>

//             {/* Name */}
//             <input
//               type="text"
//               placeholder="Enter name"
//               {...register("name")}
//               className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 outline-none"
//             />
//             {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

//             {/* Email */}
//             <input
//               type="email"
//               placeholder="Enter email"
//               {...register("email")}
//               className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 outline-none"
//             />
//             {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

//             {/* Password */}
//             <div className="relative">
//               <input
//                 type={isShowPassword ? "text" : "password"}
//                 placeholder="Enter Password"
//                 {...register("password")}
//                 className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 outline-none"
//               />
//               <div
//                 onClick={() => setIsShowPassword(!isShowPassword)}
//                 className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
//               >
//                 {isShowPassword ? <PiEye size={20} /> : <FaRegEyeSlash size={20} />}
//               </div>
//             </div>
//             {errors.password && (
//               <p className="text-red-500 text-sm">{errors.password.message}</p>
//             )}

//             {/* Submit */}
//             <button
//               type="submit"
//               className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-md transition"
//             >
//               {isLoading ? "Registering..." : "Register"}
//             </button>

//             <p className="text-sm text-center mt-3">
//               Already have an account?{" "}
//               <a href="/login" className="text-teal-600 underline">
//                 Login here
//               </a>
//             </p>
//           </form>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// }


import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "../../features/auth/authSlide";
import { toast, ToastContainer } from "react-toastify";
import { FaRegEyeSlash } from "react-icons/fa";
import { PiEye } from "react-icons/pi";
import { useNavigate } from "react-router";

const schema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
  avatar: z.any().optional(),
});

export default function Register() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [registerUser, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleAvatarChange = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result); // Show preview only
      setValue("avatar", [file]);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        // 👇 Avatar is not sent
      };

      const result = await registerUser(payload).unwrap();
      toast.success("Registered successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.message || "Registration failed");
    } finally {
      reset();
      setAvatarPreview(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-600 px-4">
      <div className="bg-white max-w-4xl w-full rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden">
        {/* Left Illustration */}
        <div className="md:w-1/2 hidden md:flex items-center justify-center bg-white p-8">
          <img
            src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg?w=826"
            alt="Illustration"
            className="w-full max-w-xs"
          />
        </div>

        {/* Right Form Section */}
        <div className="md:w-1/2 w-full p-8">
          <h2 className="text-3xl font-bold text-center text-teal-600 mb-6">Register</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Avatar Preview Only */}
            <div className="flex justify-center mb-4">
              <div
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  handleAvatarChange(file);
                }}
                onDragOver={(e) => e.preventDefault()}
                className="w-28 h-28 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center relative overflow-hidden hover:border-teal-500 cursor-pointer"
              >
                {/* Preview */}
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    className="absolute w-full h-full object-cover rounded-full z-0"
                  />
                ) : (
                  <label
                    htmlFor="avatar"
                    className="absolute inset-0 z-10 flex items-center justify-center text-center text-sm text-gray-500 px-2"
                  >
                    <span className="text-xs leading-4">
                      Drag & drop or <span className="text-teal-600 underline">upload</span>
                    </span>
                  </label>
                )}

                {/* Hidden File Input */}
                <input
                  type="file"
                  id="avatar"
                  accept="image/*"
                  className="hidden"
                  {...register("avatar")}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) handleAvatarChange(file);
                  }}
                />
              </div>
            </div>

            {/* Name */}
            <input
              type="text"
              placeholder="Enter name"
              {...register("name")}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 outline-none"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

            {/* Email */}
            <input
              type="email"
              placeholder="Enter email"
              {...register("email")}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 outline-none"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

            {/* Password */}
            <div className="relative">
              <input
                type={isShowPassword ? "text" : "password"}
                placeholder="Enter Password"
                {...register("password")}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 outline-none"
              />
              <div
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
              >
                {isShowPassword ? <PiEye size={20} /> : <FaRegEyeSlash size={20} />}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-md transition"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>

            <p className="text-sm text-center mt-3">
              Already have an account?{" "}
              <a href="/login" className="text-teal-600 underline">
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
