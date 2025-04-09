"use client";
import InputTag from "@/app/utils/components/InputTag/InputTag";
import BladeLoader from "@/app/utils/Loaders/BladeLoader";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useRouter } from "next/navigation";
import useHelper from "../../../../../../Helper/helper";
import DateInputTag from "@/app/utils/components/DateInputTag/DateInputTag";

const UserProfile = () => {
  const router = useRouter();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [loading, setLoading] = useState(false);
  const helper = useHelper();
  const [user, setUser] = useState({
    Id: 0,
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
    ProfilePic: "",
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
    if (!user.Gender.trim()) newErrors.Gender = "Gender is required";
    if (!user.PhoneNo.trim()) newErrors.PhoneNo = "Phone number is required";
    if (!user.Country.trim()) newErrors.Country = "Country is required";
    if (!user.State.trim()) newErrors.State = "State is required";
    if (!user.City.trim()) newErrors.City = "City is required";
    if (!user.Dob.trim()) newErrors.Dob = "Date of birth is required";

    setFieldErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  const fetchData = async () => {
    // setLoading(true);
    helper.xhr
      .Get("/Profile/GetUserInfo")
      .then((res) => {
        console.log(res);
        setUser({ ...res, Dob: res.Dob.split("T")[0], Password: "" });
        setSelectedImage(res.ProfilePic);
      })
      .catch((err) => {})
      .finally(() => {
        // setLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  function Submit() {
    if (validate()) {
      setLoading(true);
      setEmailError({ isError: false, Message: "" });
      setError({ isError: false, Message: "" });

      const updatedUser = { ...user };

      helper.xhr
        .Post(
          "/Profile/UpdateUser",
          helper.ConvertToFormData({ updatedUser, file })
        )
        .then((res) => {
          // console.log(res);
          // router.push("/Home");
        })
        .catch((err) => {
          // console.log(err);
          toast.error("Unable to update the user", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .finally(() => {
          setLoading(false);
          toast.success("User has been updated", {
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
    }
  }
  return (
    <div>
      <div>
        <ToastContainer style={{ marginTop: "30px", zIndex: 99999 }} />
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="w-full max-w-5xl rounded-2xl p-8 md:p-12">
            <div className="flex flex-col items-center mb-10">
              <div className="relative w-28 h-28 mb-3">
                {user.ProfilePic !== "" ? (
                  <img
                    src={`https://localhost:44385/${user.ProfilePic}`}
                    className="w-full h-full rounded-full object-cover border border-gray-300"
                  />
                ) : (
                  <img
                    src={selectedImage || "/default-avatar.png"}
                    className="w-full h-full rounded-full object-cover border border-gray-300"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />
              </div>
              {!selectedImage && (
                <p className="text-sm text-gray-500">
                  Click on the image to upload
                </p>
              )}
              {selectedImage && (
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setUser({ ...user, ProfilePic: "" });
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  Discard Image
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
              <div className="flex flex-col">
                <InputTag
                  name="FirstName"
                  label="First Name"
                  isRequired={true}
                  value={user.FirstName}
                  disabled={false}
                  setter={handlePersonalInfoChange}
                  range={50}
                  placeHolder="Enter Your First Name"
                />
                {fieldErrors["FirstName"] && (
                  <p className="text-xs text-red-900 text-start">
                    {fieldErrors["FirstName"]}
                  </p>
                )}
              </div>
              <InputTag
                name="LastName"
                label="Last Name"
                value={user.LastName}
                disabled={false}
                setter={handlePersonalInfoChange}
                range={50}
                placeHolder="Enter Your Last Name"
              />
              <div className="flex flex-col">
                <InputTag
                  name="Email"
                  label="Email"
                  value={user.Email}
                  isRequired={true}
                  disabled={false}
                  setter={handlePersonalInfoChange}
                  range={50}
                  placeHolder="Enter Your Email"
                />
                {fieldErrors["Email"] && (
                  <p className="text-xs text-red-900 text-start">
                    {fieldErrors["Email"]}
                  </p>
                )}
              </div>
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
                  placeHolder="Enter Your Password"
                />
              </div>
              <div className="flex flex-col">
                <InputTag
                  name="Gender"
                  label="Gender"
                  value={user.Gender}
                  isRequired={true}
                  disabled={false}
                  setter={handlePersonalInfoChange}
                  range={50}
                  placeHolder="Enter Your Gender"
                />
                {fieldErrors["Gender"] && (
                  <p className="text-xs text-red-900 text-start">
                    {fieldErrors["Gender"]}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-xs">
                  Phone No <span className="text-red-900">*</span>
                </label>
                <PhoneInput
                  defaultCountry="PK"
                  value={user.PhoneNo}
                  onChange={(value: string | undefined) => {
                    setUser({ ...user, PhoneNo: value || "" });
                  }}
                  className="w-full mt-2 p-2 border rounded-md focus:outline-none"
                />
                {fieldErrors["PhoneNo"] && (
                  <p className="text-xs text-red-900 text-start">
                    {fieldErrors["PhoneNo"]}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <InputTag
                  name="Country"
                  label="Country"
                  value={user.Country}
                  isRequired={true}
                  disabled={false}
                  setter={handlePersonalInfoChange}
                  range={50}
                  placeHolder="Enter Your Country"
                />
                {fieldErrors["Country"] && (
                  <p className="text-xs text-red-900 text-start">
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
                  placeHolder="Enter Your State"
                />
                {fieldErrors["State"] && (
                  <p className="text-xs text-red-900 text-start">
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
                  placeHolder="Enter Your City"
                />
                {fieldErrors["City"] && (
                  <p className="text-xs text-red-900 text-start">
                    {fieldErrors["City"]}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <DateInputTag
                  name="Dob"
                  label="Date Of Birth"
                  value={user.Dob}
                  isRequired={true}
                  disabled={false}
                  setter={handlePersonalInfoChange}
                  placeHolder=""
                />
                {fieldErrors["Dob"] && (
                  <p className="text-xs text-red-900 text-start">
                    {fieldErrors["Dob"]}
                  </p>
                )}
              </div>
              <InputTag
                name="Age"
                label="Age"
                // isRequired={true}
                value={user.Age}
                disabled={true}
                setter={() => {}}
                range={50}
                placeHolder="Age"
              />
            </div>
            <div className="w-full flex justify-end mt-4">
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
                  {loading ? <BladeLoader /> : "Update"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
