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
    // helper.xhr
    //   .Get(
    //     `/Users/ForgotPassword`,
    //     helper.GetURLParamString({ emailAddress: email }).toString()
    //   )
    //   .then((res: any) => {
    //     if (!isNaN(Number(res.code))) {
    //       setRestoredPin(String(res.code));
    //       setUserId(res.userid);
    //       setCodeSentTime(Date.now() + 10 * 60 * 1000);
    //       setTimer(10 * 60);
    //       setCodeSent(true);
    //     } else {
    //       setError(res.code);
    //     }
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     // setError(e);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
    fetch(
      `${helper.GetUrl}/Auth/ForgotPassword?emailAddress=${email}`,
      {
        method: "GET",
        // headers: { Authorization: "Bearer " + helper.getData("token") },
      }
    )
      .then(async (response: any) => {
        var res = await response.json();
        // console.log(res)
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
        // setError(e);
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
            onClick={forgetPassword}
            disabled={loading || email == ""}
            className={`btn rounded text-sm flex justify-center items-center text-black bg-themeColor w-full leading-4 font-alata tex p-3 ${
              !loading ? "cursor-pointer" : "cursor-progress"
            }`}
          >
            {loading ? <BladeLoader /> : "Send Verification Code"}
          </button>
        ) : (
          <button
            onClick={Submit}
            disabled={loading || email == ""}
            className={`btn rounded text-sm flex justify-center items-center text-black bg-themeColor w-full leading-4 font-alata tex p-3 ${
              !loading ? "cursor-pointer" : "cursor-progress"
            }`}
          >
            {loading ? <BladeLoader /> : "Submit"}
          </button>
        )}
      </div>
      <p className="text-xs text-red-900 text-center mt-2">{error}</p>
    </div>
  );
};

export default InitialView;
