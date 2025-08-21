"use client";
import InputTag from "@/app/utils/components/InputTag/InputTag";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import React, { useState } from "react";
import DateInputTag from "@/app/utils/components/DateInputTag/DateInputTag";
import BladeLoader from "@/app/utils/Loaders/BladeLoader";
import useHelper from "../../../../../../Helper/helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [loading, setLoading] = useState(false);
  const helper = useHelper();
  const [user, setUser] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    Gender: "",
    PhoneNo: "",
    Country: "",
    State: "",
    City: "",
    Dob: "",
    Age: 0,
  });
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [error, setError] = useState({ isError: false, Message: "" });
  const [emailError, setEmailError] = useState({ isError: false, Message: "" });
  const [fieldErrors, setFieldErrors] = useState<{
    [key: string]: string;
  }>({});

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  function handlePersonalInfoChange(n: string, v: number | string) {
    setUser({ ...user, [n]: v });
  }

  function validate() {
    const newErrors: { [key: string]: string } = {};

    if (!user.FirstName.trim()) newErrors.FirstName = "First name is required";
    if (!user.Email.trim()) newErrors.Email = "Email is required";
    else if (!emailRegex.test(user.Email))
      newErrors.Email = "Email is not valid";
    if (!user.Password.trim()) newErrors.Password = "Password is required";
    if (!user.Gender.trim()) newErrors.Gender = "Gender is required";
    if (!user.PhoneNo.trim()) newErrors.PhoneNo = "Phone number is required";
    if (!user.Country.trim()) newErrors.Country = "Country is required";
    if (!user.State.trim()) newErrors.State = "State is required";
    if (!user.City.trim()) newErrors.City = "City is required";
    if (!user.Dob.trim()) newErrors.Dob = "Date of birth is required";

    setFieldErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function Submit() {
    if (validate()) {
      setLoading(true);
      setEmailError({ isError: false, Message: "" });
      setError({ isError: false, Message: "" });

      helper.xhr
        .Post("/Auth/CreateUser", helper.ConvertToFormData({ user, file }))
        .then((res) => {
          // console.log(res);
          // router.push("/Login");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Unable to create the user", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          // setError({ isError: true, Message: "User not found!" });
        })
        .finally(() => {
          setLoading(false);
          toast.success("User has been created", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
        setTimeout(() => {
          router.push("/Login")
        }, 3000);
      //console.log(user, file);
    }
  }

  const isValidPhoneNumber = (phone: string): boolean => {
    // Basic international phone validation
    const phoneRegex = /^\+[1-9]{1}[0-9]{3,14}$/;
    return phoneRegex.test(phone);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
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

      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="md:flex">
          <div className="hidden md:block md:w-2/5 bg-gradient-to-b from-indigo-600 to-purple-700 p-8 text-white">
            <div className="flex flex-col justify-center h-full">
              <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
              <p className="mb-6 opacity-90">
                Create an account to access exclusive features and personalized
                content.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center">
                  <div className="bg-white text-indigo-600 rounded-full p-2 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span>Personalized experience</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-white text-indigo-600 rounded-full p-2 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span>Secure data protection</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-3/5 py-8 px-6 md:px-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                Create Account
              </h1>
              <p className="text-gray-600 mt-2">
                Fill in your details to get started
              </p>
            </div>

            <div className="flex flex-col items-center mb-8">
              <div className="relative group">
                <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-200 shadow-lg transition-all duration-500">
                  <img
                    src={selectedImage || "/default-avatar.png"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Rounded hover effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                </div>

                <label className="absolute -bottom-2 -right-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white p-2 rounded-full cursor-pointer shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl group-hover:from-purple-700 group-hover:to-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                  />
                </label>
              </div>

              {!selectedImage ? (
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600 font-medium">
                    Profile Photo
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Click to upload
                  </p>
                  <p className="text-xs text-gray-400">
                    SVG, PNG, JPG (max. 5MB)
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center mt-4">
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="text-sm text-white bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 py-1.5 px-4 rounded-full transition-all duration-300 flex items-center shadow-md hover:shadow-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Remove Photo
                  </button>
                  <p className="text-xs text-green-600 mt-2 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Successfully uploaded!
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex flex-col">
                <InputTag
                  name="FirstName"
                  label="First Name"
                  isRequired={true}
                  value={user.FirstName}
                  disabled={false}
                  setter={handlePersonalInfoChange}
                  range={50}
                  placeHolder="Enter your first name"
                />
                {fieldErrors["FirstName"] && (
                  <p className="text-xs text-red-600 mt-1">
                    {fieldErrors["FirstName"]}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <InputTag
                  name="LastName"
                  label="Last Name"
                  value={user.LastName}
                  disabled={false}
                  setter={handlePersonalInfoChange}
                  range={50}
                  placeHolder="Enter your last name"
                />
                {fieldErrors["LastName"] && (
                  <p className="text-xs text-red-600 mt-1">
                    {fieldErrors["LastName"]}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex flex-col">
                <InputTag
                  name="Email"
                  label="Email Address"
                  value={user.Email}
                  isRequired={true}
                  disabled={false}
                  setter={handlePersonalInfoChange}
                  range={50}
                  placeHolder="your.email@example.com"
                />
                {fieldErrors["Email"] && (
                  <p className="text-xs text-red-600 mt-1">
                    {fieldErrors["Email"]}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex flex-col">
                <InputTag
                  type="password"
                  name="Password"
                  label="Password"
                  isRequired={true}
                  value={user.Password}
                  disabled={false}
                  setter={handlePersonalInfoChange}
                  range={50}
                  placeHolder="Create a strong password"
                />
                {fieldErrors["Password"] && (
                  <p className="text-xs text-red-600 mt-1">
                    {fieldErrors["Password"]}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex flex-col">
                <InputTag
                  name="Gender"
                  label="Gender"
                  value={user.Gender}
                  isRequired={true}
                  disabled={false}
                  setter={handlePersonalInfoChange}
                  range={50}
                  placeHolder="Select your gender"
                />
                {fieldErrors["Gender"] && (
                  <p className="text-xs text-red-600 mt-1">
                    {fieldErrors["Gender"]}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-normal text-gray-700 mb-1">
                  Phone Number <span className="text-red-600">*</span>
                </label>
                <div className="border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all">
                  <PhoneInput
                    international
                    defaultCountry="PK"
                    value={user.PhoneNo}
                    onChange={(value: string | undefined) => {
                      // Check if the value is too long before updating
                      if (value && value.length > 20) {
                        // Optionally show an error message
                        setFieldErrors({
                          ...fieldErrors,
                          PhoneNo: "Phone number cannot exceed 20 characters",
                        });
                        return; // Don't update the state with invalid value
                      }

                      // Clear any previous errors
                      if (fieldErrors.PhoneNo) {
                        const newErrors = { ...fieldErrors };
                        delete newErrors.PhoneNo;
                        setFieldErrors(newErrors);
                      }

                      setUser({ ...user, PhoneNo: value || "" });
                    }}
                    className="px-3 py-[6px]"
                  />
                </div>
                {fieldErrors["PhoneNo"] && (
                  <p className="text-xs text-red-600 mt-1">
                    {fieldErrors["PhoneNo"]}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col">
                <InputTag
                  name="Country"
                  label="Country"
                  value={user.Country}
                  isRequired={true}
                  disabled={false}
                  setter={handlePersonalInfoChange}
                  range={50}
                  placeHolder="Your country"
                />
                {fieldErrors["Country"] && (
                  <p className="text-xs text-red-600 mt-1">
                    {fieldErrors["Country"]}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <InputTag
                  name="State"
                  label="State"
                  value={user.State}
                  isRequired={true}
                  disabled={false}
                  setter={handlePersonalInfoChange}
                  range={50}
                  placeHolder="Your state"
                />
                {fieldErrors["State"] && (
                  <p className="text-xs text-red-600 mt-1">
                    {fieldErrors["State"]}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <InputTag
                  name="City"
                  label="City"
                  value={user.City}
                  isRequired={true}
                  disabled={false}
                  setter={handlePersonalInfoChange}
                  range={50}
                  placeHolder="Your city"
                />
                {fieldErrors["City"] && (
                  <p className="text-xs text-red-600 mt-1">
                    {fieldErrors["City"]}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-8">
              <div className="flex flex-col">
                <DateInputTag
                  name="Dob"
                  label="Date of Birth"
                  value={user.Dob}
                  isRequired={true}
                  disabled={false}
                  setter={handlePersonalInfoChange}
                  placeHolder="Select your date of birth"
                />
                {fieldErrors["Dob"] && (
                  <p className="text-xs text-red-600 mt-1">
                    {fieldErrors["Dob"]}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center">
             <div className="flex flex-col items-center mt-2 w-full">
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
                  "Create Account"
                )}
              </span>
            </button>
          </div>

              <p className="text-sm text-gray-600 mt-4 inline-flex gap-2">
                Already have an account?{" "}
                <p
                  // href="/Login"
                  onClick={()=>{router.push('/Login')}}
                  className="text-indigo-600 cursor-pointer hover:text-indigo-800 font-medium transition-colors"
                >
                  Sign in
                </p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
