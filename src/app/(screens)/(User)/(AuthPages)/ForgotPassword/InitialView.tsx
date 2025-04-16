import React, { useContext, use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ApprovedView from "./ApprovedView";
import PinInput from "@/app/utils/components/PinCode/PinCode";
import InputTag from "@/app/utils/components/InputTag/InputTag";
import BladeLoader from "@/app/utils/Loaders/BladeLoader";
import useHelper from "../../../../../../Helper/helper";

interface Props {
  moveForward: (move: boolean, userId: number) => void;
}

const InitialView = ({ moveForward }: Props) => {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(0);
  const [restoredPin, setRestoredPin] = useState<string>("");
  const [codeSent, setCodeSent] = useState(false);
  const [codeSentTime, setCodeSentTime] = useState(0);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState<string>("");
  const [timer, setTimer] = useState(0);
  const [requestedAgain, setRequestedAgain] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const helper = useHelper();

  function SendCode() {
    setCodeSent(true);
    setTimer(10);
  }
  function Submit() {
    // console.log(userId);
    if (Date.now() < codeSentTime) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
      if (restoredPin == code) {
        moveForward(true, userId);
      } else {
        setError("Code does not match.");
      }
    } else {
      setError("OTP Expired.");
    }
  }

  function ResendCode() {
    setRequestedAgain(true);
    if (timer == 0) {
      forgetPassword();
    }
  }

  useEffect(() => {
    if (timer <= -1) {
      setRequestedAgain(false);
      return;
    }

    const time = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(time);
  }, [timer]);

  const formatTime = (): string => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const forgetPassword = () => {
    setLoading(true);

    fetch(`https://localhost:44385/Auth/ForgotPassword?emailAddress=${email}`, {
      method: "GET",
    })
      .then(async (response: any) => {
        var res = await response.json();
        if (!isNaN(Number(res.code))) {
          setRestoredPin(String(res.code));
          setUserId(res.userid);
          setCodeSentTime(Date.now() + 10 * 60 * 1000);
          setTimer(10 * 60);
          setCodeSent(true);
        } else {
          setError(res.code);
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (error != "") {
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  }, [error]);

  return (
    <div className="bg-[#f7f7f7db] shadow-md mx-auto rounded-xl p-11 sm:w-full md:w-1/2 flex-1 flex flex-col justify-center font-inter max-h-fit shadow-custom-shadow-div">
      <h2 className="font-inter font-light text-2xl mb-5">Forgot Password</h2>
      {codeSent && (
        <div className="rounded-[10px] border-dashed border-2 border-[#0F427B54] mb-5 font-light font-inter text-xs text-center bg-[#E2EFFF82] py-[10px] px-6">
          Verification code sent to{" "}
          <span className="font-semibold">{email}</span> your email. If you have
          not received the verification code, click Resend Code.
        </div>
      )}
      <InputTag
        setter={(n, v) => {
          setEmail(v);
        }}
        name="email"
        range={50}
        label="Email Address"
        placeHolder="Enter Your Email Address"
        value={email}
        disabled={codeSent}
      />
      {codeSent && (
        <div className="flex space-x-3 items-end mt-7">
          <PinInput
            name="code"
            setter={(n, v) => {
              setCode((v as string[]).join(""));
            }}
            label="Enter Code"
            onEnterPress={forgetPassword}
          />
          {timer > 0 && requestedAgain == true ? (
            <p className="font-alata font-light text-xs leading-3">
              Resend Code Request in {formatTime()}
            </p>
          ) : (
            <p
              onClick={ResendCode}
              className="text-sm font-medium cursor-pointer hover:underline flex justify-center text-themeColor"
            >
              Resend Code
            </p>
          )}
        </div>
      )}
      <div className="mt-5">
        {!codeSent ? (
          <button
            className={`relative inline-flex cursor-pointer items-center w-full mt-2 justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300`}
            onClick={forgetPassword}
            disabled={loading || email == ""}
          >
            <span
              className={`relative px-8 py-2 rounded-md w-full transition-all ease-in duration-75 ${
                loading
                  ? "bg-transparent text-white"
                  : "bg-white text-black group-hover:bg-transparent group-hover:text-white"
              }`}
            >
              {loading ? <BladeLoader /> : "Send Verification Code"}
            </span>
          </button>
        ) : (
          <button
            className={`relative inline-flex cursor-pointer items-center w-full mt-2 justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300`}
            onClick={Submit}
            disabled={loading || email == ""}
          >
            <span
              className={`relative px-8 py-2 rounded-md w-full transition-all ease-in duration-75 ${
                loading
                  ? "bg-transparent text-white"
                  : "bg-white text-black group-hover:bg-transparent group-hover:text-white"
              }`}
            >
              {loading ? <BladeLoader /> : "Submit"}
            </span>
          </button>
        )}
      </div>
      <p className="text-xs text-red-900 text-center mt-2">{error}</p>
    </div>
  );
};

export default InitialView;
