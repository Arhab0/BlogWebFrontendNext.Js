// "use client";
// import InputTag from "@/app/utils/components/InputTag/InputTag";
// import BladeLoader from "@/app/utils/Loaders/BladeLoader";
// import React, { useEffect, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import PhoneInput from "react-phone-number-input";
// import "react-phone-number-input/style.css";
// import { useRouter } from "next/navigation";
// import useHelper from "../../../../../../Helper/helper";
// import DateInputTag from "@/app/utils/components/DateInputTag/DateInputTag";
// import Checkbox from "@/app/utils/components/Checkbox/Checkbox";
// import { Divide } from "lucide-react";

// const page = () => {
//   const router = useRouter();
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const [loading, setLoading] = useState(false);
//   const [dataLoading, setDataLoading] = useState(false);
//   const helper = useHelper();
//   const [user, setUser] = useState({
//     Id: 0,
//     FirstName: "",
//     LastName: "",
//     Email: "",
//     Password: "",
//     Gender: "",
//     PhoneNo: "",
//     Country: "",
//     State: "",
//     City: "",
//     Dob: "",
//     ProfilePic: "",
//     Age: 0,
//     CanSeeMyFollowers: true,
//   });
//   const [file, setFile] = useState(null);
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [error, setError] = useState({ isError: false, Message: "" });
//   const [emailError, setEmailError] = useState({ isError: false, Message: "" });
//   const [fieldErrors, setFieldErrors] = useState<{
//     [key: string]: string;
//   }>({});

//   const handleImageChange = (e: any) => {
//     const file = e.target.files[0];
//     setFile(file);
//     if (file) {
//       setSelectedImage(URL.createObjectURL(file));
//     }
//   };

//   function handlePersonalInfoChange(n: string, v: number | string) {
//     setUser({ ...user, [n]: v });
//   }

//   function validate() {
//     const newErrors: { [key: string]: string } = {};

//     if (!user.FirstName.trim()) newErrors.FirstName = "First name is required";
//     if (!user.Email.trim()) newErrors.Email = "Email is required";
//     else if (!emailRegex.test(user.Email))
//       newErrors.Email = "Email is not valid";
//     if (!user.Gender.trim()) newErrors.Gender = "Gender is required";
//     if (!user.PhoneNo.trim()) newErrors.PhoneNo = "Phone number is required";
//     if (!user.Country.trim()) newErrors.Country = "Country is required";
//     if (!user.State.trim()) newErrors.State = "State is required";
//     if (!user.City.trim()) newErrors.City = "City is required";
//     if (!user.Dob.trim()) newErrors.Dob = "Date of birth is required";

//     setFieldErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   }

//   const fetchData = async () => {
//     setDataLoading(true);
//     helper.xhr
//       .Get(
//         "/Profile/GetUserInfo",
//         helper
//           .GetURLParamString({ id: parseInt(helper.getData("UserId")) })
//           .toString()
//       )
//       .then((res) => {
//         //console.log(res);
//         setUser({ ...res, Dob: res.Dob.split("T")[0], Password: "" });
//         setSelectedImage(res.ProfilePic);
//       })
//       .catch((err) => {})
//       .finally(() => {
//         setDataLoading(false);
//       });
//   };
//   useEffect(() => {
//     fetchData();
//   }, []);

//   function Submit() {
//     if (validate()) {
//       setLoading(true);
//       setEmailError({ isError: false, Message: "" });
//       setError({ isError: false, Message: "" });
//       const updatedUser = { ...user };
//       helper.xhr
//         .Post(
//           "/Profile/UpdateUser",
//           helper.ConvertToFormData({ updatedUser, file })
//         )
//         .then((res) => {
//           // //console.log(res);
//           // router.push("/Home");
//         })
//         .catch((err) => {
//           // //console.log(err);
//           toast.error("Unable to update the user", {
//             position: "top-right",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "light",
//           });
//         })
//         .finally(() => {
//           setLoading(false);
//           toast.success("User has been updated", {
//             position: "top-right",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "light",
//           });
//           // fetchData();
//           router.back();
//         });
//     }
//   }
//   return (
//     <div>
//       <div>
//          <ToastContainer style={{ zIndex: 99999 }} />
//         {dataLoading ? (
//           <div className="loader"></div>
//         ) : (
//           <div className="min-h-screen flex items-center justify-center px-4">
//             <div className="w-full max-w-5xl rounded-2xl p-8 md:p-12">
//               <div className="flex flex-col items-center mb-10">
//                 <div className="relative w-28 h-28 mb-3">
//                   {user.ProfilePic !== "" ? (
//                     <img
//                       src={`${helper.GetUrl()}/${user.ProfilePic}`}
//                       className="w-full h-full rounded-full object-cover border border-gray-300"
//                     />
//                   ) : (
//                     <img
//                       src={selectedImage || "/default-avatar.png"}
//                       className="w-full h-full rounded-full object-cover border border-gray-300"
//                     />
//                   )}
//                   <input
//                     type="file"
//                     accept="image/*"
//                     className="absolute inset-0 opacity-0 cursor-pointer"
//                     onChange={handleImageChange}
//                   />
//                 </div>
//                 {!selectedImage && (
//                   <p className="text-sm text-gray-500">
//                     Click on the image to upload
//                   </p>
//                 )}
//                 {selectedImage && (
//                   <button
//                     onClick={() => {
//                       setSelectedImage(null);
//                       setUser({ ...user, ProfilePic: "" });
//                     }}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     Discard Image
//                   </button>
//                 )}
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
//                 <div className="flex flex-col">
//                   <InputTag
//                     name="FirstName"
//                     label="First Name"
//                     isRequired={true}
//                     value={user.FirstName}
//                     disabled={false}
//                     setter={handlePersonalInfoChange}
//                     range={50}
//                     placeHolder="Enter Your First Name"
//                   />
//                   {fieldErrors["FirstName"] && (
//                     <p className="text-xs text-red-900 text-start">
//                       {fieldErrors["FirstName"]}
//                     </p>
//                   )}
//                 </div>
//                 <InputTag
//                   name="LastName"
//                   label="Last Name"
//                   value={user.LastName}
//                   disabled={false}
//                   setter={handlePersonalInfoChange}
//                   range={50}
//                   placeHolder="Enter Your Last Name"
//                 />
//                 <div className="flex flex-col">
//                   <InputTag
//                     name="Email"
//                     label="Email"
//                     value={user.Email}
//                     isRequired={true}
//                     disabled={false}
//                     setter={handlePersonalInfoChange}
//                     range={50}
//                     placeHolder="Enter Your Email"
//                   />
//                   {fieldErrors["Email"] && (
//                     <p className="text-xs text-red-900 text-start">
//                       {fieldErrors["Email"]}
//                     </p>
//                   )}
//                 </div>
//                 <div className="flex flex-col">
//                   <InputTag
//                     type="password"
//                     name="Password"
//                     label="Password"
//                     isRequired={true}
//                     value={user.Password}
//                     disabled={false}
//                     setter={handlePersonalInfoChange}
//                     range={50}
//                     placeHolder="Enter Your Password"
//                   />
//                 </div>
//                 <div className="flex flex-col">
//                   <InputTag
//                     name="Gender"
//                     label="Gender"
//                     value={user.Gender}
//                     isRequired={true}
//                     disabled={false}
//                     setter={handlePersonalInfoChange}
//                     range={50}
//                     placeHolder="Enter Your Gender"
//                   />
//                   {fieldErrors["Gender"] && (
//                     <p className="text-xs text-red-900 text-start">
//                       {fieldErrors["Gender"]}
//                     </p>
//                   )}
//                 </div>
//                 <div className="flex flex-col">
//                   <label className="text-xs">
//                     Phone No <span className="text-red-900">*</span>
//                   </label>
//                   <PhoneInput
//                     defaultCountry="PK"
//                     value={user.PhoneNo}
//                     onChange={(value: string | undefined) => {
//                       setUser({ ...user, PhoneNo: value || "" });
//                     }}
//                     className="w-full mt-2 p-2 border rounded-md focus:outline-none"
//                   />
//                   {fieldErrors["PhoneNo"] && (
//                     <p className="text-xs text-red-900 text-start">
//                       {fieldErrors["PhoneNo"]}
//                     </p>
//                   )}
//                 </div>
//                 <div className="flex flex-col">
//                   <InputTag
//                     name="Country"
//                     label="Country"
//                     value={user.Country}
//                     isRequired={true}
//                     disabled={false}
//                     setter={handlePersonalInfoChange}
//                     range={50}
//                     placeHolder="Enter Your Country"
//                   />
//                   {fieldErrors["Country"] && (
//                     <p className="text-xs text-red-900 text-start">
//                       {fieldErrors["Country"]}
//                     </p>
//                   )}
//                 </div>
//                 <div className="flex flex-col">
//                   <InputTag
//                     name="State"
//                     label="State"
//                     value={user.State}
//                     isRequired={true}
//                     disabled={false}
//                     setter={handlePersonalInfoChange}
//                     range={50}
//                     placeHolder="Enter Your State"
//                   />
//                   {fieldErrors["State"] && (
//                     <p className="text-xs text-red-900 text-start">
//                       {fieldErrors["State"]}
//                     </p>
//                   )}
//                 </div>
//                 <div className="flex flex-col">
//                   <InputTag
//                     name="City"
//                     label="City"
//                     value={user.City}
//                     isRequired={true}
//                     disabled={false}
//                     setter={handlePersonalInfoChange}
//                     range={50}
//                     placeHolder="Enter Your City"
//                   />
//                   {fieldErrors["City"] && (
//                     <p className="text-xs text-red-900 text-start">
//                       {fieldErrors["City"]}
//                     </p>
//                   )}
//                 </div>
//                 <div className="flex flex-col">
//                   <DateInputTag
//                     name="Dob"
//                     label="Date Of Birth"
//                     value={user.Dob}
//                     isRequired={true}
//                     disabled={false}
//                     setter={handlePersonalInfoChange}
//                     placeHolder=""
//                   />
//                   {fieldErrors["Dob"] && (
//                     <p className="text-xs text-red-900 text-start">
//                       {fieldErrors["Dob"]}
//                     </p>
//                   )}
//                 </div>
//                 <InputTag
//                   name="Age"
//                   label="Age"
//                   // isRequired={true}
//                   value={user.Age}
//                   disabled={true}
//                   setter={() => {}}
//                   range={50}
//                   placeHolder="Age"
//                 />
//                 <Checkbox
//                   name="CanSeeMyFollowers"
//                   value={user?.CanSeeMyFollowers}
//                   label="Can others see your followers"
//                   setter={() => {
//                     setUser({
//                       ...user,
//                       CanSeeMyFollowers: !user.CanSeeMyFollowers,
//                     });
//                   }}
//                 />
//               </div>
//               <div className="w-full flex justify-end mt-4">
//                 <button
//                   className={`relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300`}
//                 >
//                   <span
//                     className={`relative px-8 py-2 rounded-md transition-all items-center ease-in duration-75 ${
//                       loading
//                         ? "bg-transparent text-white"
//                         : "bg-white text-black group-hover:bg-transparent group-hover:text-white"
//                     }`}
//                     onClick={Submit}
//                   >
//                     {loading ? <BladeLoader /> : "Update"}
//                   </span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default page;

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
import Checkbox from "@/app/utils/components/Checkbox/Checkbox";
import { ArrowLeft, Camera, Upload, X } from "lucide-react";

const Page = () => {
  const router = useRouter();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
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
    CanSeeMyFollowers: true,
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
    setDataLoading(true);
    helper.xhr
      .Get(
        "/Profile/GetUserInfo",
        helper
          .GetURLParamString({ id: parseInt(helper.getData("UserId")) })
          .toString()
      )
      .then((res) => {
        setUser({ ...res, Dob: res.Dob.split("T")[0], Password: "" });
        setSelectedImage(res.ProfilePic);
      })
      .catch((err) => {})
      .finally(() => {
        setDataLoading(false);
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
          // Success handling
          helper.removeData("ProfilePhoto");
          helper.removeData("userName");
          helper.storeData("ProfilePhoto", res.ProfilePic);
          helper.storeData(
            "userName",
            res.FirstName + " " + res.LastName
          );
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
        })
        .catch((err) => {
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
          router.back();
        });
    }
  }

  return (
    <div className="min-h-screen py-8">
      <ToastContainer style={{ zIndex: 99999 }} />

      {dataLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Profile Image Section */}
            <div className="border-b border-gray-200 px-8 py-6">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
                    {user.ProfilePic !== "" ? (
                      <>
                        {helper.getData("isGoogle") == "true" &&
                        helper.getData("ProfilePhoto").substring(0, 5) ==
                          "https" ? (
                          <img
                            src={helper.getData("ProfilePhoto")}
                            alt="profile"
                            className="w-32 h-32 rounded-full object-cover"
                          />
                        ) : (
                          <img
                            src={`${helper.GetUrl()}/${helper.getData(
                              "ProfilePhoto"
                            )}`}
                            alt="profile"
                            className="w-32 h-32 rounded-full object-cover"
                          />
                        )}
                      </>
                    ) : (
                      <img
                        src={selectedImage || "/default-avatar.png"}
                        className="w-full h-full rounded-full object-cover border border-gray-300"
                      />
                    )}
                  </div>

                  <label
                    htmlFor="profile-upload"
                    className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md cursor-pointer border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <Camera size={16} className="text-gray-700" />
                    <input
                      id="profile-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <label
                    htmlFor="profile-upload"
                    className="flex items-center text-sm text-purple-600 hover:text-purple-700 cursor-pointer font-medium"
                  >
                    <Upload size={14} className="mr-1" />
                    Upload new photo
                  </label>

                  {selectedImage && (
                    <button
                      onClick={() => {
                        setSelectedImage(null);
                        setUser({ ...user, ProfilePic: "" });
                      }}
                      className="flex items-center text-sm text-red-500 hover:text-red-700 font-medium"
                    >
                      <X size={14} className="mr-1" />
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="px-8 py-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
                </div>

                <div className="flex flex-col">
                  <InputTag
                    name="Email"
                    label="Email"
                    value={user.Email}
                    isRequired={true}
                    disabled={false}
                    setter={handlePersonalInfoChange}
                    range={50}
                    placeHolder="Enter your email"
                  />
                  {fieldErrors["Email"] && (
                    <p className="text-xs text-red-600 mt-1">
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
                    placeHolder="Enter your password"
                  />
                  <p className="text-[10px] font-bold text-gray-500 mt-1">
                    Leave blank to keep current password
                  </p>
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
                    placeHolder="Enter your gender"
                  />
                  {fieldErrors["Gender"] && (
                    <p className="text-xs text-red-600 mt-1">
                      {fieldErrors["Gender"]}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Phone No <span className="text-red-500">*</span>
                  </label>
                  <div className="border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500 transition-all">
                    <PhoneInput
                      defaultCountry="PK"
                      value={user.PhoneNo}
                      onChange={(value: string | undefined) => {
                        setUser({ ...user, PhoneNo: value || "" });
                      }}
                      className="p-3 w-full focus:outline-none"
                    />
                  </div>
                  {fieldErrors["PhoneNo"] && (
                    <p className="text-xs text-red-600 mt-1">
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
                    placeHolder="Enter your country"
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
                    placeHolder="Enter your state"
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
                    placeHolder="Enter your city"
                  />
                  {fieldErrors["City"] && (
                    <p className="text-xs text-red-600 mt-1">
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
                    <p className="text-xs text-red-600 mt-1">
                      {fieldErrors["Dob"]}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <InputTag
                    name="Age"
                    label="Age"
                    value={user.Age}
                    disabled={true}
                    setter={() => {}}
                    range={50}
                    placeHolder="Age"
                  />
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 mb-6">
                <Checkbox
                  name="CanSeeMyFollowers"
                  value={user?.CanSeeMyFollowers}
                  label="Allow others to see your followers"
                  setter={() => {
                    setUser({
                      ...user,
                      CanSeeMyFollowers: !user.CanSeeMyFollowers,
                    });
                  }}
                />
              </div>

              <div className="flex justify-end gap-4">
                <div className="flex flex-col items-center mt-2">
                  <button
                    onClick={() => router.back()}
                    className="relative inline-flex items-center w-full justify-center mb-2 overflow-hidden text-sm font-medium text-white rounded-lg group transition-all duration-300 ease-in-out"
                  >
                    <span className="relative px-4 py-3 rounded-md w-full transition-all ease-in duration-75 bg-gradient-to-br from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600">
                      Cancel
                    </span>
                  </button>
                </div>

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
                        "Save Changes"
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
