"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import ScreenLoader from "../Loaders/ScreenLoader";
import useHelper from "../../../../Helper/helper";

export default function ClientLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const helper = useHelper();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const parsedToken = helper.GetToken();
    const isAuthenticated = !(new Date() > new Date(parsedToken?.exp * 1000));
    console.log(isAuthenticated, new Date(parsedToken?.exp * 1000));
    if (
      !isAuthenticated &&
      !["/", "/Signup", "/ForgotPassword"].includes(pathname)
    ) {
      router.push("/");
    }

    setLoading(false); // Hide loader when authentication check is done
  }, [pathname]);

  return (
    <>
      {loading && <ScreenLoader />}
      <Toaster
        toastOptions={{
          position: "top-right",
          style: {
            animation:
              "slide-in-right 0.5s ease-in-out, fade-in 0.5s ease-in-out",
            opacity: "0.8",
          },
        }}
      />
      {children}
    </>
  );
}
