"use client";
import { useEffect, useState } from "react";
import { createConnection } from "../utils/Signalr";

export const useNotifications = (accessToken: string) => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (!accessToken) return;

    const connection = createConnection(accessToken);

    connection.on("ReceiveNotification", (msg: string) => {
      const parsed = typeof msg === "string" ? JSON.parse(msg) : msg;
      setNotifications((prev) => [...prev, parsed]);
    });

    connection
      .start()
      .then(() => console.log("SignalR connected"))
      .catch((error) => console.error("SignalR connection error", error));

    return () => {
      connection.stop();
    };
  }, [accessToken]);

  return notifications;
};
