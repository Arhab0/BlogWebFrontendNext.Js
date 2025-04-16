"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputTag from "@/app/utils/components/InputTag/InputTag";
import BladeLoader from "@/app/utils/Loaders/BladeLoader";
import useHelper from "../../../../../../Helper/helper";
interface Props {
  userId: number;
}

const ApprovedView = ({ userId }: Props) => {
  console.log(userId);
  const router = useRouter();
  const [newPass, setNewPass] = useState("");
  const [renewPass, setReNewPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const helper = useHelper();

  function Submit() {
    router.push("/");
  }

  const newPassword = () => {
    if (newPass == renewPass) {
      setLoading(true);
      helper.xhr
        .Post(
          `/Auth/CreateNewPassword`,
          helper.ConvertToFormData({ password: newPass, userId: userId })
        )
        .then((res) => {
          setLoading(false);
          toast.success("Password updated!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            router.push("/");
          }, 3000);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setError("Password mismatch.");
    }
  };

  useEffect(() => {
    if (error != "") {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);

  return (
    <div className="bg-[#f7f7f7db] mx-auto rounded-xl p-11 sm:w-full md:w-1/2 flex-1 flex flex-col justify-center font-inter max-h-fit shadow-custom-shadow-div">
      <ToastContainer style={{ marginTop: "30px", zIndex: 99999 }} />
      <h2 className="font-inter font-light text-2xl">Reset Password</h2>
      <div className="grid space-y-5 mt-5">
        <InputTag
          name="newPass"
          value={newPass}
          range={50}
          setter={(n, v) => {
            setNewPass(v);
          }}
          placeHolder="Enter your password"
          label="New Password"
        />
        <InputTag
          name="renewPass"
          value={renewPass}
          range={50}
          setter={(n, v) => {
            setReNewPass(v);
          }}
          placeHolder="Enter your password"
          label="Re-Enter New Password"
        />
      </div>
      <div className="mt-5">
        {/* <button
          onClick={() => {
            newPassword();
          }}
          disabled={loading}
          className={`btn rounded text-sm flex justify-center items-center text-black bg-themeColor w-full p-3 ${
            !loading ? "cursor-pointer" : "cursor-progress"
          }`}
        >
          {loading ? <BladeLoader /> : "Confirm"}
        </button> */}
        <button
          className={`relative inline-flex cursor-pointer items-center w-full mt-2 justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300`}
          onClick={() => {
            newPassword();
          }}
          disabled={loading}
        >
          <span
            className={`relative px-8 py-2 rounded-md w-full transition-all ease-in duration-75 ${
              loading
                ? "bg-transparent text-white"
                : "bg-white text-black group-hover:bg-transparent group-hover:text-white"
            }`}
          >
            {loading ? <BladeLoader /> : "Confirm"}
          </span>
        </button>
      </div>
      <p className="text-xs text-red-900 text-center mt-2">{error}</p>
    </div>
  );
};

export default ApprovedView;
