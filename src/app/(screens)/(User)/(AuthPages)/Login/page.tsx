"use client";
import BladeLoader from "@/app/utils/Loaders/BladeLoader";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import useHelper from "../../../../../../Helper/helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { GoogleLogin } from "@react-oauth/google";
// import jwt_decode from "jwt-decode";

const page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [deActivationReason, setDeActivationReason] = useState("");
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
        helper.ConvertToFormData({
          email: obj.email.trim(),
          password: obj.password,
        })
      )
      .then((res) => {
        console.log(res);
        if (res.message) {
          setDeActivationReason(res.message);
          setShowRejectModal(true);
        } else {
          helper.storeData("token", res.token);
          const fullName =
            (res.user.FirstName || "") + " " + (res.user.LastName || "");
          helper.storeData("email", res.user.Email);
          helper.storeData("userName", fullName);
          helper.storeData("UserId", res.user.Id);
          helper.storeData("RoleId", res.user.RoleId);
          helper.storeData("ProfilePhoto", res.user.ProfilePic);
          helper.storeData("isGoogle", res.isGoogle);
          if (res.user.RoleId === 1) {
            router.push("/DashBoard");
          } else {
            router.push("/Home");
          }
        }
      })
      .catch((err) => {
        console.log(err.status + " " + err.message);
        // if()
        // console.log(err.response.status)
        if (err.status === 404) {
          // alert("herll")
          toast.error(err.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (err.status === 403) {
          toast.error(err.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error(err.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        setLoading(false);
      });
    // .finally(() => {
    //   setLoading(false);
    // });
  }

  if (helper.getData("token") && helper.getData("RoleId") === "2") {
    router.push("/Home");
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 99999 }}
      />
      {/* Left Hero Section */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 text-white flex-col justify-center items-center p-12">
        <h1 className="text-5xl font-bold mb-6">Welcome Back 👋</h1>
        <p className="text-lg text-blue-100 text-center max-w-md">
          Login to your account and continue exploring our platform with ease.
        </p>
        <div
          className="mt-10 w-[70%] h-[60%] bg-center bg-contain bg-no-repeat"
          style={{ backgroundImage: "url('/assets/LoginPagePhoto.png')" }}
        />
      </div>

      {/* Right Login Section */}
      <div className="flex flex-1 justify-center items-center px-6 sm:px-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            Login
          </h2>

          {/* Email Input */}
          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative mt-2">
              <input
                type="email"
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="you@example.com"
                value={obj.email}
                onChange={(e) => setObj({ ...obj, email: e.target.value })}
              />
              <span className="absolute left-3 top-3 text-gray-400">
                <i className="fas fa-envelope"></i>
              </span>
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-2">
              <input
                type="password"
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="••••••••"
                value={obj.password}
                onChange={(e) => setObj({ ...obj, password: e.target.value })}
                onKeyUp={(e) => e.key === "Enter" && Submit()}
              />
              <span className="absolute left-3 top-3 text-gray-400">
                <i className="fas fa-lock"></i>
              </span>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password}</p>
            )}

            <div className="flex justify-end mt-2">
              <p
                className="text-sm text-blue-600 hover:underline cursor-pointer"
                onClick={() => router.push("/ForgotPassword")}
              >
                Forgot Password?
              </p>
            </div>
          </div>

          {/* Login Button */}
          <div className="flex flex-col items-center mt-2">
            <button
              onClick={Submit}
              disabled={loading}
              className="relative inline-flex items-center w-full justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300 ease-in-out"
            >
              <span
                className={`relative px-4 py-3 rounded-md w-full transition-all ease-in duration-75 ${
                  loading
                    ? "bg-transparent text-white"
                    : "bg-white text-black group-hover:bg-transparent group-hover:text-white"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <BladeLoader />
                    <span className="ml-2">Processing...</span>
                  </div>
                ) : (
                  "Login"
                )}
              </span>
            </button>
          </div>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500 text-sm">or login with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="mt-4">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                const idToken = credentialResponse.credential;

                const res = await helper.xhr.Post(
                  "/Auth/GoogleLogin",
                  helper.ConvertToFormData({ idToken })
                );

                helper.storeData("token", res.token);
                helper.storeData(
                  "userName",
                  res.user.FirstName + " " + res.user.LastName
                );
                helper.storeData("email", res.user.Email);
                helper.storeData("UserId", res.user.Id);
                helper.storeData("RoleId", res.user.RoleId);
                helper.storeData("ProfilePhoto", res.user.ProfilePic);
                helper.storeData("isGoogle", res.isGoogle);

                if (res.user.RoleId === 1) {
                  router.push("/DashBoard");
                } else {
                  router.push("/Home");
                }
              }}
              onError={() => {
                toast.error("Google Authentication Failed!");
              }}
            />
          </div>
          {/* Register Link */}
          <p className="text-sm text-gray-500 text-center mt-6">
            Don’t have an account?{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => router.push("/Signup")}
            >
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
