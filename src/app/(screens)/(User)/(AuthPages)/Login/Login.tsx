"use client";
import BladeLoader from "@/app/utils/Loaders/BladeLoader";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import useHelper from "../../../../../../Helper/helper";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState({ isError: false, Message: "" });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const helper = useHelper();
  const [obj, setObj] = useState({ email: "", password: "" });

  function Submit() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = { email: "", password: "" };

    if (!obj.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(obj.email)) {
      newErrors.email = "Email is not valid";
    }

    if (!obj.password.trim()) {
      newErrors.password = "Password is required";
    }

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    setErrors({ email: "", password: "" });
    setLoading(true);
    helper.xhr
      .Post(
        "/Auth/Login",
        helper.ConvertToFormData({ email: obj.email, password: obj.password })
      )
      .then((res) => {
        console.log(res);
        helper.storeData("token", res.token);
        const fullName = res.user.FirstName+" "+res.user.LastName
        helper.storeData("email", res.user.email);
        helper.storeData("userName",fullName);
        helper.storeData("UserId", res.user.Id);
        helper.storeData("RoleId", res.user.RoleId);
        helper.storeData("ProfilePhoto",res.user.ProfilePic)
        router.push("/Home");
      })
      .catch((err) => {
        console.log(err);
        setErrors((prev) => ({ ...prev, password: "User not found!" }));
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="min-h-screen bg-white shadow sm:rounded-lg flex justify-center flex-1">
      <div
        className="flex-1 text-center hidden lg:flex items-center justify-center"
        style={{ background: " radial-gradient(#6cb6eb, #2734c5)" }}
      >
        <div
          className="w-[60%] bg-contain bg-center bg-no-repeat h-[80%]"
          style={{ backgroundImage: "url('/assets/LoginPagePhoto.png')" }}
        />
      </div>

      <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 flex items-center justify-center">
        <div className="flex flex-col items-center w-full">
          <h4 className="text-4xl xl:text-2xl font-medium">Login</h4>

          <div className="w-full flex-1 mt-8">
            <div className="mx-auto">
              <div className="relative mt-6">
                <label className="text-sm text-gray-800">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={obj.email}
                  onChange={(e) => setObj({ ...obj, email: e.target.value })}
                  className={`peer w-full mt-2 bg-[#f7f7f7] p-3 rounded-md border ${
                    errors.email && "border-red-500"
                  } focus:outline-none`}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              <div className="relative mt-6">
                <label className="text-sm text-gray-800">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={obj.password}
                  onChange={(e) => setObj({ ...obj, password: e.target.value })}
                  className={`peer w-full mt-2 bg-[#f7f7f7] p-3 rounded-md border ${
                    errors.password && "border-red-500"
                  } focus:outline-none`}
                />
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                )}

                {/* Forgot Password Link */}
                <div className="flex justify-end mt-1">
                  <p className="text-sm text-blue-500 hover:cursor-pointer" onClick={()=>{router.push("/ForgotPassword")}}>
                    Forgot Password?
                  </p>
                </div>
              </div>

              <div className="items-center flex-col mt-8 flex">
                <button
                  className={`relative inline-flex items-center w-1/2 justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300`}
                >
                  <span
                    className={`relative px-8 py-2 rounded-md w-full transition-all ease-in duration-75 ${
                      loading
                        ? "bg-transparent text-white"
                        : "bg-white text-black group-hover:bg-transparent group-hover:text-white"
                    }`}
                    onClick={Submit}
                  >
                    {loading ? <BladeLoader /> : "Login"}
                  </span>
                </button>

                <p
                  className="text-sm text-gray-500 hover:cursor-pointer hover:text-blue-700 mt-2"
                  onClick={() => {
                    router.push("/Signup");
                  }}
                >
                  Didn’t have an account? Register here
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
