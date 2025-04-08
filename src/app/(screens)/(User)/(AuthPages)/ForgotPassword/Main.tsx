"use client";
import React, { useState } from "react";
import InitialView from "./InitialView";
import ApprovedView from "./ApprovedView";

const Main = () => {
  const [verified, setVerified] = useState(false);
  const [userId, setUserId] = useState(0);

  function fetchedData(flag: boolean, user: number) {
    setVerified(flag);
    console.log(user)
    setUserId(user);
  }

  return (
    <div className="h-screen loginBg">
      {/* <Header /> */}
      <div className="h-full my-5 w-full flex flex-col">
        <div className="font-poppins flex-1 flex flex-col">
          <div className="flex-1 flex flex-col items-center justify-center">
            {!verified ? (
              <>
                <InitialView moveForward={fetchedData} />
              </>
            ) : (
              <>
                <ApprovedView userId={userId} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
