"use client";
import BladeLoader from "@/app/utils/Loaders/BladeLoader";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import useHelper from "../../../../../../Helper/helper";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ isError: false, Message: "" });
  const helper = useHelper();
  const [obj, setObj] = useState({ email: "", password: "" });

  function Submit() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!obj.email.trim() || !obj.password.trim()) {
      setError({ isError: true, Message: "All fields are required" });
      return;
    }

    if (!emailRegex.test(obj.email)) {
      setError({ isError: true, Message: "Email is not valid" });
      return;
    }
    setLoading(true);
    helper.xhr
      .Post(
        "/Auth/Login",
        helper.ConvertToFormData({ email: obj.email, password: obj.password })
      )
      .then((res) => {
        // helper.storeData("token", res.token);
        // helper.storeData("UserName", res.UserName);
        // helper.storeData("FullName", res.FullName);
        // helper.storeData("RoleName", res.RoleName);
        // router.push("/Home");
      })
      .catch((err) => {
        console.log(err);
        setError({ isError: true, Message: "User not found!" });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="min-h-screen bg-white shadow sm:rounded-lg flex justify-center flex-1">
      <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
        <div
          className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("/assets/loginPageImage.webp")`,
          }}
        ></div>
      </div>
      <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center w-full">
          <h1 className="text-5xl xl:text-4xl font-medium">Login</h1>
          <div className="w-full flex-1 mt-8">
            <div className="mx-auto max-w-xs">
              <div className="relative mt-6">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={obj.email}
                  onChange={(e) => {
                    setObj({ ...obj, email: e.target.value });
                  }}
                  placeholder="Email Address"
                  className="peer mt-2 w-full bg-transparent border-b-2  border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                />
                <label
                  htmlFor="email"
                  className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 bg-transparent transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                >
                  Email Address
                </label>
              </div>
              <div className="relative mt-6">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={obj.password}
                  onChange={(e) => {
                    setObj({ ...obj, password: e.target.value });
                  }}
                  placeholder="Password"
                  className="peer peer mt-2 w-full bg-transparent border-b-2  border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                />
                <label
                  htmlFor="password"
                  className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                >
                  Password
                </label>
              </div>
              {error.isError && (
                <p className="text-xs text-red-900 text-start">
                  {error.Message}
                </p>
              )}
              <p className="font-normal text-red-500 text-end text-sm mt-1">
                <span className="hover:cursor-pointer">Forgot Password?</span>
              </p>
              <div className="flex items-center justify-center flex-col mt-8">
                <button
                  className={`relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300`}
                >
                  <span
                    className={`relative px-8 py-2 rounded-md transition-all items-center ease-in duration-75 ${
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
                  className="text-sm text-gray-500 hover:cursor-pointer hover:text-blue-700"
                  onClick={() => {
                    router.push("/Signup");
                  }}
                >
                  Didn't have account? Register here
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
